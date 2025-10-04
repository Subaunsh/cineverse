'use server';

/**
 * @fileOverview A natural language movie search AI agent.
 *
 * - naturalLanguageMovieSearch - A function that handles the movie search process using natural language.
 * - NaturalLanguageMovieSearchInput - The input type for the naturalLanguageMovieSearch function.
 * - NaturalLanguageMovieSearchOutput - The return type for the naturalLanguageMovieSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NaturalLanguageMovieSearchInputSchema = z.object({
  query: z.string().describe('The natural language query for searching movies, e.g., \'Suggest me a sci-fi action movie like Inception\'.'),
});
export type NaturalLanguageMovieSearchInput = z.infer<typeof NaturalLanguageMovieSearchInputSchema>;

const NaturalLanguageMovieSearchOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('A list of movie suggestions based on the natural language query.'),
});
export type NaturalLanguageMovieSearchOutput = z.infer<typeof NaturalLanguageMovieSearchOutputSchema>;

export async function naturalLanguageMovieSearch(input: NaturalLanguageMovieSearchInput): Promise<NaturalLanguageMovieSearchOutput> {
  return naturalLanguageMovieSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'naturalLanguageMovieSearchPrompt',
  input: {schema: NaturalLanguageMovieSearchInputSchema},
  output: {schema: NaturalLanguageMovieSearchOutputSchema},
  prompt: `You are a movie expert. The user will provide a natural language query for searching movies.
  Your job is to suggest movies that match the query.
  Return a list of movie titles.
  
  Query: {{{query}}} `,
});

const naturalLanguageMovieSearchFlow = ai.defineFlow(
  {
    name: 'naturalLanguageMovieSearchFlow',
    inputSchema: NaturalLanguageMovieSearchInputSchema,
    outputSchema: NaturalLanguageMovieSearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
