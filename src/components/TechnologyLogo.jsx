import php from '../assets/icons/php.svg';
import codeigniter from '../assets/icons/codeigniter.svg';
import javascript from '../assets/icons/javascript.svg';
import nodejs from '../assets/icons/nodejs.svg';
import python from '../assets/icons/python.svg';
import puppeteer from '../assets/icons/puppeteer.svg';
import postgresql from '../assets/icons/postgresql.svg';
import mongodb from '../assets/icons/mongodb.svg';
import sqlite from '../assets/icons/sqlite.svg';
import amazonwebservices from '../assets/icons/amazonwebservices.svg';
import docker from '../assets/icons/docker.svg';
import git from '../assets/icons/git.svg';
import linux from '../assets/icons/linux.svg';
import postman from '../assets/icons/postman.svg';
import jquery from '../assets/icons/jquery.svg';
import ionic from '../assets/icons/ionic.svg';
import openai from '../assets/icons/openai.svg';
import githubcopilot from '../assets/icons/githubcopilot.svg';
import html from '../assets/icons/html5.svg';
import css from '../assets/icons/css3.svg';
import vue from '../assets/icons/vuejs.svg';
import typescript from '../assets/icons/typescript.svg';
import tailwind from '../assets/icons/tailwindcss.svg';
import bootstrap from '../assets/icons/bootstrap.svg';
import laravel from '../assets/icons/laravel.svg';
import mysql from '../assets/icons/mysql.svg';
import react from '../assets/icons/react.svg';
import vite from '../assets/icons/vite.svg';

const logos = { HTML5: html, CSS3: css, CSS: css, 'Vue.js': vue, TypeScript: typescript,
  'Tailwind CSS': tailwind, Bootstrap: bootstrap, Laravel: laravel, MySQL: mysql, React: react, Vite: vite, PHP: php, CodeIgniter: codeigniter, JavaScript: javascript, 'Node.js': nodejs, Python: python, Puppeteer: puppeteer, PostgreSQL: postgresql, MongoDB: mongodb, SQLite: sqlite, AWS: amazonwebservices, 'Amazon S3': amazonwebservices, 'Amazon CloudFront': amazonwebservices, Docker: docker, 'Git Flow': git, Linux: linux, Postman: postman, jQuery: jquery, Ionic: ionic, Blade: laravel, ChatGPT: openai, 'GitHub Copilot': githubcopilot };
// Logos identify branded tools; concepts use neutral symbols rather than invented brands.
const symbols = {
  code: <path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18" />,
  database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" /></>,
  network: <><circle cx="5" cy="5" r="3" /><circle cx="19" cy="12" r="3" /><circle cx="5" cy="19" r="3" /><path d="m8 6 8 5m-8 7 8-5" /></>,
  video: <><rect x="2" y="5" width="13" height="14" rx="2" /><path d="m15 10 7-4v12l-7-4" /></>,
  cloud: <path d="M6 19a5 5 0 0 1-1-10 7 7 0 0 1 14-1 5.5 5.5 0 0 1-1 11Z" />,
  layers: <><path d="m12 2 10 6-10 6L2 8Zm-10 10 10 6 10-6M2 17l10 6 10-6" /></>,
  spark: <path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" />,
};
export default function TechnologyLogo({ name, symbol = 'code' }) {
  const light = ['ChatGPT', 'GitHub Copilot'].includes(name);
  const tile = ['AWS', 'Amazon S3', 'Amazon CloudFront'].includes(name);
  return logos[name]
    ? <img className={`technology-logo${light ? ' logo-monochrome' : ''}${tile ? ' logo-tile' : ''}`} src={logos[name]} alt="" width="28" height="28" loading="lazy" />
    : <svg className="technology-logo technology-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{symbols[symbol] || symbols.code}</svg>;
}
