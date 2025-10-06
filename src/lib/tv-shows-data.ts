import type { TVShow } from './types';

export const tvShows: Omit<TVShow, 'posterUrl'>[] = [
  {
    id: 'stranger-things',
    title: 'Stranger Things',
    description: 'When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.',
    genre: 'Sci-Fi',
    rating: 8.7,
    year: 2016,
  },
  {
    id: 'the-crown',
    title: 'The Crown',
    description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.',
    genre: 'Drama',
    rating: 8.6,
    year: 2016,
  },
  {
    id: 'black-mirror',
    title: 'Black Mirror',
    description: 'An anthology series exploring a twisted, high-tech multiverse where humanity\'s greatest innovations and darkest instincts collide.',
    genre: 'Sci-Fi',
    rating: 8.8,
    year: 2011,
  },
    {
    id: 'breaking-bad',
    title: 'Breaking Bad',
    description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.',
    genre: 'Crime',
    rating: 9.5,
    year: 2008,
  },
  {
    id: 'game-of-thrones',
    title: 'Game of Thrones',
    description: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.',
    genre: 'Fantasy',
    rating: 9.2,
    year: 2011,
  },
  {
    id: 'the-mandalorian',
    title: 'The Mandalorian',
    description: 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.',
    genre: 'Sci-Fi',
    rating: 8.7,
    year: 2019,
  },
];
