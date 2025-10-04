import { movies as movieData } from '@/lib/data';
import { PlaceHolderImages } from './placeholder-images';
import type { Movie } from '@/lib/types';

const imageMap = new Map(PlaceHolderImages.map(img => [img.id, img.imageUrl]));

// Combine movie data with poster URLs
export const allMovies: Movie[] = movieData.map(movie => ({
  ...movie,
  posterUrl: imageMap.get(movie.id) || `https://picsum.photos/seed/${movie.id}/500/750`,
}));

// Sort movies by rating to get "trending"
const sortedMovies = [...allMovies].sort((a, b) => b.rating - a.rating);

export function getTrendingMovies(limit?: number): Movie[] {
  return limit ? sortedMovies.slice(0, limit) : sortedMovies;
}

export function getMoviesByGenre(genre: string, limit?: number): Movie[] {
  const filtered = allMovies.filter(movie => movie.genre === genre);
  return limit ? filtered.slice(0, limit) : filtered;
}

export function getMovieById(id: string): Movie | undefined {
  return allMovies.find(movie => movie.id === id);
}

export function searchMovies(query: string): Movie[] {
    if (!query) return [];
    return allMovies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()));
}
