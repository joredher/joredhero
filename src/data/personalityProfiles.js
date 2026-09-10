// Narrative content for the profile photo carousel's detail panel. Kept separate from
// profilePhotos.js (which only owns image assets/positioning for the parallax carousel)
// so the two can change independently — entries are joined at render time by `id`.
export const personalityProfiles = [
  {
    id: 'front',
    title: { en: 'The Curious Mind' },
    tagline: { en: 'Always learning. Always adapting.' },
    description: {
      en: "Technology taught me that plans change—and I've learned to change with them. I'm naturally observant and curious, always reading, exploring, and learning something new. Whether it's a new technology, a different approach to a problem, or simply understanding how something works, I enjoy staying mentally active and turning curiosity into growth.",
    },
    keywords: [{ en: 'Technology' }, { en: 'Curiosity' }, { en: 'Learning' }, { en: 'Adaptability' }, { en: 'Problem Solving' }],
  },
  {
    id: 'relaxed',
    title: { en: 'The Active Life' },
    tagline: { en: 'Movement keeps me grounded.' },
    description: {
      en: "Staying active is an important part of how I take care of myself and continue growing. You'll often find me running, cycling, at the gym, jumping rope, traveling, enjoying the outdoors, or spending active moments with friends. For me, movement isn't only about exercise—it's also about discipline, discovering new places, enjoying simple moments, and continuing my personal growth.",
    },
    keywords: [{ en: 'Running' }, { en: 'Cycling' }, { en: 'Gym' }, { en: 'Travel' }, { en: 'Outdoors' }, { en: 'Personal Growth' }],
  },
  {
    id: 'playful',
    title: { en: 'The Social Side' },
    tagline: { en: 'Serious about my work. Not serious all the time.' },
    description: {
      en: "I'm naturally sociable, and I enjoy connecting with people. Maybe it's my friendly energy, kindness, or simply the way I approach others, but building genuine connections has always come naturally to me. I can be focused and serious when the job requires it, but outside of that, I enjoy laughing, sharing experiences, and bringing positive energy to the people around me.",
    },
    keywords: [{ en: 'Sociable' }, { en: 'Friendly' }, { en: 'Kindness' }, { en: 'Teamwork' }, { en: 'Good Energy' }],
  },
];
