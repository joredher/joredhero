import { profilePhotos } from '../data/profilePhotos.js';

// Jorge's face for the chat: the smiling portrait, cropped to the head by CSS. It reuses the
// photo the hero carousel already loads, so it adds no extra download. Decorative: the
// message text and the panel title already say who is speaking.
const portrait = profilePhotos.find(photo => photo.id === 'relaxed');

export default function ChatAvatar({ className = '' }) {
  return <span className={`chat-avatar ${className}`} aria-hidden="true">
    <img src={portrait.src} alt="" width={portrait.width} height={portrait.height} decoding="async" />
  </span>;
}
