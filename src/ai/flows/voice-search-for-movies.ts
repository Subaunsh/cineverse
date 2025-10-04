'use server';

/**
 * @fileOverview A flow for handling voice search for movies using natural language queries.
 *
 * - voiceSearchForMovies - A function that takes a natural language query and returns movie suggestions.
 * - VoiceSearchForMoviesInput - The input type for the voiceSearchForMovies function.
 * - VoiceSearchForMoviesOutput - The return type for the voiceSearchForMovies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VoiceSearchForMoviesInputSchema = z.object({
  query: z
    .string()
    .describe("A natural language query for movie suggestions, e.g., 'Suggest me a sci-fi action movie like Inception'."),
});
export type VoiceSearchForMoviesInput = z.infer<typeof VoiceSearchForMoviesInputSchema>;

const VoiceSearchForMoviesOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('A list of movie suggestions based on the natural language query.'),
});
export type VoiceSearchForMoviesOutput = z.infer<typeof VoiceSearchForMoviesOutputSchema>;

export async function voiceSearchForMovies(input: VoiceSearchForMoviesInput): Promise<VoiceSearchForMoviesOutput> {
  return voiceSearchForMoviesFlow(input);
}

const voiceSearchPrompt = ai.definePrompt({
  name: 'voiceSearchPrompt',
  input: {schema: VoiceSearchForMoviesInputSchema},
  output: {schema: VoiceSearchForMoviesOutputSchema},
  prompt: `You are a movie recommendation expert. Based on the user's query, suggest a list of movies.

Query: {{{query}}}

Suggestions:`,
});

const voiceSearchForMoviesFlow = ai.defineFlow(
  {
    name: 'voiceSearchForMoviesFlow',
    inputSchema: VoiceSearchForMoviesInputSchema,
    outputSchema: VoiceSearchForMoviesOutputSchema,
  },
  async input => {
    const {output} = await voiceSearchPrompt(input);
    return output!;
  }
);
