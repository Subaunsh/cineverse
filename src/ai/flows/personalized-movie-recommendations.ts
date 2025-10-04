'use server';

/**
 * @fileOverview A personalized movie recommendation AI agent.
 *
 * - getPersonalizedRecommendations - A function that returns personalized movie recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  watchHistory: z.array(
    z.object({
      title: z.string(),
      genre: z.string(),
      rating: z.number().min(1).max(5),
    })
  ).describe('The user watch history including title, genre, and rating.'),
  selectedGenres: z.array(z.string()).describe('The user selected genres.'),
});
export type PersonalizedRecommendationsInput = z.infer<typeof PersonalizedRecommendationsInputSchema>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      title: z.string(),
      genre: z.string(),
      rating: z.number(),
      year: z.number(),
      description: z.string(),
      posterImageUrl: z.string(),
    })
  ).describe('A list of recommended movies.'),
});
export type PersonalizedRecommendationsOutput = z.infer<typeof PersonalizedRecommendationsOutputSchema>;

export async function getPersonalizedRecommendations(input: PersonalizedRecommendationsInput): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an expert movie recommender. Based on the user's watch history and selected genres, you will recommend movies that the user is likely to enjoy.

User Watch History:
{{#each watchHistory}}
- Title: {{this.title}}, Genre: {{this.genre}}, Rating: {{this.rating}}
{{/each}}

User Selected Genres: {{selectedGenres}}

Recommend movies with title, genre, rating, year, description, and posterImageUrl.

Ensure that the recommendations are diverse and cover a range of movies that the user might find interesting. Do not include the same movies that the user has already watched in their watch history.`,,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
