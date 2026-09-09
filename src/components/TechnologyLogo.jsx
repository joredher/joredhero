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
  'Tailwind CSS': tailwind, Bootstrap: bootstrap, Laravel: laravel, MySQL: mysql, React: react, Vite: vite };
// Decorative: the adjacent text always provides the technology name.
export default function TechnologyLogo({ name }) {
  return logos[name] ? <img className="technology-logo" src={logos[name]} alt="" width="28" height="28" loading="lazy" /> : null;
}
