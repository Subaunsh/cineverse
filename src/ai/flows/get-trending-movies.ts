'use server';

/**
 * @fileOverview A flow for fetching trending movies.
 *
 * - getTrendingMovies - A function that returns a list of trending movies.
 * - TrendingMoviesOutput - The return type for the getTrendingMovies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { allMovies } from '@/lib/movies';

const TrendingMoviesOutputSchema = z.object({
  movies: z.array(
    z.object({
      id: z.string().describe('A unique slug-like ID for the movie, e.g., "the-dark-knight".'),
      title: z.string().describe('The title of the movie.'),
      description: z.string().describe('A brief description of the movie.'),
      genre: z.string().describe('The primary genre of the movie.'),
      year: z.number().describe('The release year of the movie.'),
      rating: z.number().min(1).max(10).describe('The movie\'s rating, out of 10.'),
      posterUrl: z.string().url().describe("A placeholder image URL for the movie poster from 'https://picsum.photos'. For example: 'https://picsum.photos/seed/inception/500/750' where 'inception' is the movie ID."),
    })
  ),
});

export type TrendingMoviesOutput = z.infer<typeof TrendingMoviesOutputSchema>;

export async function getTrendingMovies(): Promise<TrendingMoviesOutput> {
  return trendingMoviesFlow();
}

const prompt = ai.definePrompt({
  name: 'trendingMoviesPrompt',
  output: {schema: TrendingMoviesOutputSchema},
  prompt: `You are a movie expert. Generate a list of 10 currently trending movies.
  
  Provide a diverse list of movies across different genres.
  
  For each movie, provide a unique slug-like id, title, description, genre, year, a rating out of 10, and a posterUrl.
  
  The posterUrl should be a placeholder image from 'https://picsum.photos'. The URL should follow this format: 'https://picsum.photos/seed/{movie-id}/500/750'. Replace {movie-id} with the slug-like ID you generated for the movie.`,
});

const trendingMoviesFlow = ai.defineFlow(
  {
    name: 'trendingMoviesFlow',
    outputSchema: TrendingMoviesOutputSchema,
  },
  async () => {
    try {
      const {output} = await prompt();
      if (!output?.movies) {
        throw new Error('No movies in output');
      }
      return output;
    } catch (error) {
      console.error('AI trending movies flow failed, returning static data:', error);
      return { movies: allMovies.slice(0, 10) };
    }
  }
);
