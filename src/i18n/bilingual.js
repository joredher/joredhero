// Reads a { en, es, ... } bilingual value in the given language, falling back to English.
// Plain strings (content that was never migrated to the bilingual shape) pass through unchanged.
export function resolveBilingual(value, lang = 'en') {
  if (value && typeof value === 'object') return value[lang] ?? value.en ?? '';
  return value ?? '';
}
