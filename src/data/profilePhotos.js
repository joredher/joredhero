import front from '../assets/images/profile-front.png';
import relaxed from '../assets/images/profile-relaxed.png';
import playful from '../assets/images/profile-playful.png';

// Original supplied PNGs, stored as ordinary image files without retouching.
// Only the selected photo renders. These IDs leave room for section-linked photos.
export const profilePhotos = [
  { id: 'front', src: front, alt: 'Eduardo Hernández facing the camera against a white background.', position: '50% 50%', width: 1254, height: 1254 },
  { id: 'relaxed', src: relaxed, alt: 'Eduardo Hernández smiling with one hand behind his head.', position: '50% 50%', width: 1254, height: 1254 },
  { id: 'playful', src: playful, alt: 'Eduardo Hernández pointing toward the camera.', position: '50% 50%', width: 1254, height: 1254 },
];

export const defaultProfilePhoto = profilePhotos[0];
