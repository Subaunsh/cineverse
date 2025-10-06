
export type Movie = {
  id: string;
  title: string;
  description: string;
  genre: string;
  year: number;
  rating: number;
  posterUrl: string;
};

export type TVShow = {
  id: string;
  title: string;
  description: string;
  genre: string;
  year: number;
  rating: number;
  posterUrl:string;
};

export type UserProfile = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  watchlist?: string[];
  history?: string[];
  ratings?: { [movieId: string]: number };
};
