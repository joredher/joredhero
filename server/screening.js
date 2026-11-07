// Screens a visitor's message BEFORE it can reach Jorge. Pure functions (no DOM, no network),
// so the same code can run in a Cloudflare Worker, a PHP-adjacent Node service or a test.
//
// Decision: 'block' (silently dropped), 'review' (held for a human look) or 'allow'.
// Each rule adds to a score; "hard" rules block on their own. Weights are a first draft:
// tune them against real traffic. Matching is done on accent-folded, lower-cased text so
// Spanish and English spam are caught alike.

const ZERO_WIDTH = /[​-‏‪-‮⁠-⁤﻿]/g;
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

// Strips invisible characters (a common way to dodge keyword filters) and folds look-alikes.
export function normalize(text) {
  return String(text ?? '').normalize('NFKC').replace(ZERO_WIDTH, '').replace(CONTROL, '').replace(/\s+/g, ' ').trim();
}
const fold = text => normalize(text).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export const limits = { minLength: 12, maxLength: 2000, minFillMs: 3000, reviewAt: 40, blockAt: 100 };

const rules = [
  { id: 'phishing', weight: 100, hard: true, re: /(verify your (account|identity)|account (has been )?(suspended|locked|compromised)|confirm your password|seed phrase|one[- ]time (code|password)|\botp\b|codigo de verificacion|verifica tu cuenta|cuenta (suspendida|bloqueada)|(tu|su) contrasena)/ },
  { id: 'lottery', weight: 100, hard: true, re: /(you(?:'ve| have) won|lottery winner|unclaimed (funds|prize)|felicidades,? ganaste|ganaste (la |el )?(loteria|premio|sorteo)|herencia millonaria)/ },
  { id: 'crypto', weight: 45, re: /\b(bitcoin|btc|usdt|crypto(currency|moneda)?s?|forex|binance|ethereum|trading signals?)\b/ },
  { id: 'guaranteed-profit', weight: 50, re: /((guaranteed|garantizad[oa]s?|100%) (profit|returns?|ganancias?|retorno)|double your|duplic(a|ar|amos) tu (dinero|inversion)|ganancias? (diarias|garantizadas))/ },
  { id: 'payment-method', weight: 60, re: /(western union|moneygram|gift ?cards?|tarjetas? de regalo)/ },
  { id: 'advance-fee', weight: 50, re: /(overpay|more than the (price|amount)|wire (back )?the (difference|rest)|advance fee|pago por adelantado)/ },
  { id: 'asks-for-id', weight: 70, re: /(send (me |us )?your (bank|passport|id\b|ssn|card)|envi(a|ar)(nos|me)? (tu|sus) (pasaporte|datos bancarios|cedula|tarjeta))/ },
  { id: 'adult-gambling', weight: 80, re: /\b(casino|betting|apuestas?|viagra|porn|xxx|escort)\b/ },
  { id: 'seo-spam', weight: 45, re: /(first page of google|rank your (website|site)|backlinks?|guest post|seo (services|package)|posicionamiento (web|seo)|primera pagina de google)/ },
  { id: 'vendor-pitch', weight: 45, re: /(outsourcing|offshore|cheap (developers?|programmers?)|our (agency|team|company) (can|offers?|provides?)|we are an? (agency|company)|ofrecemos (nuestros )?servicios|nuestra (agencia|empresa))/ },
  { id: 'urgency', weight: 15, re: /(urgent(ly)?|act now|limited time|last chance|immediately|urgente|ultima oportunidad|hoy mismo)/ },
  { id: 'off-platform', weight: 25, re: /(telegram|t\.me\/|wa\.me\/|whatsapp me|escribeme (a|al) (telegram|whatsapp)|contact me on (telegram|whatsapp))/ },
  { id: 'prompt-injection', weight: 60, injection: true, re: /(ignore (all )?(the )?(previous|prior|above) (instructions|prompts?)|ignora (todas )?(las )?instrucciones (anteriores|previas)|system prompt|prompt del sistema|you are now|developer mode|jailbreak|reveal your (instructions|prompt)|act as (an? )?(unrestricted|dan))/ },
];

// Words a real project inquiry tends to contain. They lower the score of weak signals only;
// strong signals, hard rules and the honeypot ignore them.
const projectWords = /(landing|website|web ?site|sitio web|pagina web|\bapi\b|backend|\bapp\b|aplicacion|e-?commerce|tienda|presupuesto|quote|proposal|propuesta|deadline|fecha limite|project|proyecto|launch|lanzamiento|integracion|integration|automati[sz]ation|automatizacion)/g;

const URL_RE = /\b(?:https?:\/\/|www\.)[^\s<>"']+/gi;
const SHORTENER = /\b(bit\.ly|tinyurl\.com|t\.co|cutt\.ly|goo\.gl|is\.gd|rb\.gy|shorturl\.at)\/\S+/i;
const IP_URL = /https?:\/\/\d{1,3}(\.\d{1,3}){3}/i;
const ABUSED_TLD = /\.(top|xyz|click|zip|gq|cf|tk|ml|ga|work|support)(\/|\s|$)/i;
const DISPOSABLE = new Set(['mailinator.com', 'guerrillamail.com', '10minutemail.com', 'tempmail.com', 'yopmail.com', 'trashmail.com', 'sharklasers.com']);

function checkContact(contact) {
  const value = normalize(contact);
  if (!value) return { id: 'contact-missing', weight: 30 };
  if (value.includes('@')) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return { id: 'contact-invalid', weight: 30 };
    if (DISPOSABLE.has(value.split('@')[1].toLowerCase())) return { id: 'disposable-email', weight: 50 };
    return null;
  }
  const digits = value.replace(/[\s().+-]/g, '');
  return /^\d{7,15}$/.test(digits) ? null : { id: 'contact-invalid', weight: 30 };
}

// Makes links unclickable in the copy sent to Jorge: hxxps://evil[.]com
export function defangUrls(text) {
  return text.replace(URL_RE, match => match.replace(/^http/i, 'hxxp').replace(/\./g, '[.]'));
}

export function screenMessage({ message = '', contact = '', honeypot = '', elapsedMs = Infinity } = {}) {
  const clean = normalize(message);
  const text = fold(message);
  const reasons = [];
  let score = 0;
  let hard = false;
  let injection = false;
  let strong = false; // any signal of 40+ points
  const add = (id, weight, isHard = false) => { reasons.push(id); score += weight; hard ||= isHard; strong ||= weight >= 40; };

  if (honeypot) add('honeypot-filled', 100, true);                  // a field only bots fill in
  if (elapsedMs < limits.minFillMs) add('submitted-too-fast', 50);   // humans take longer than 3 s
  if (clean.length < limits.minLength) add('too-short', 30);
  if (clean.length > limits.maxLength) add('too-long', 100, true);

  for (const rule of rules) if (rule.re.test(text)) { add(rule.id, rule.weight, rule.hard); injection ||= !!rule.injection; }

  const urls = clean.match(URL_RE) ?? [];
  if (urls.length === 1) add('link', 15);
  if (urls.length >= 2) add('many-links', 40);
  if (SHORTENER.test(text)) add('shortened-link', 50);
  if (IP_URL.test(text)) add('ip-link', 40);
  if (urls.some(url => ABUSED_TLD.test(url))) add('abused-tld', 30);

  const letters = clean.replace(/[^a-zA-Z]/g, '');
  if (letters.length > 20 && letters.replace(/[^A-Z]/g, '').length / letters.length > 0.6) add('shouting', 15);
  if (/(.)\1{7,}/.test(clean)) add('repeated-characters', 20);

  const contactIssue = checkContact(contact);
  if (contactIssue) add(contactIssue.id, contactIssue.weight);

  // Spammers sprinkle in words like "website", so the discount only softens weak signals.
  if (!strong) {
    const legit = new Set(text.match(projectWords) ?? []).size;
    score = Math.max(0, score - Math.min(legit, 3) * 10);
  }

  const decision = hard || score >= limits.blockAt ? 'block' : score >= limits.reviewAt ? 'review' : 'allow';
  return { decision, score, reasons, injection, clean };
}
