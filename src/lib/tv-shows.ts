import { tvShows as tvShowData } from '@/lib/tv-shows-data';
import { PlaceHolderImages } from './placeholder-images';
import type { TVShow } from '@/lib/types';

const imageMap = new Map(PlaceHolderImages.map(img => [img.id, img.imageUrl]));

export const allTVShows: TVShow[] = tvShowData.map(show => ({
  ...show,
  posterUrl: imageMap.get(show.id) || `https://picsum.photos/seed/${show.id}/500/750`,
}));

export function getAllTVShows(limit?: number): TVShow[] {
  return limit ? allTVShows.slice(0, limit) : allTVShows;
}
