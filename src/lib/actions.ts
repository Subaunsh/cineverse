"use server";

import {
  naturalLanguageMovieSearch,
  type NaturalLanguageMovieSearchOutput,
} from "@/ai/flows/natural-language-movie-search";
import {
  voiceSearchForMovies,
  type VoiceSearchForMoviesOutput,
} from "@/ai/flows/voice-search-for-movies";

export async function performNaturalLanguageSearch(
  query: string
): Promise<NaturalLanguageMovieSearchOutput> {
  try {
    const result = await naturalLanguageMovieSearch({ query });
    return result;
  } catch (error) {
    console.error("Error in natural language search:", error);
    return { suggestions: [] };
  }
}

export async function performVoiceSearch(
  query: string
): Promise<VoiceSearchForMoviesOutput> {
  try {
    const result = await voiceSearchForMovies({ query });
    return result;
  } catch (error) {
    console.error("Error in voice search:", error);
    return { suggestions: [] };
  }
}

// In a real application, you would add server actions here to interact with Firestore
// For example, adding a movie to a user's watchlist:
/*
import { auth, db } from "./firebase"; // Assuming server-side firebase admin setup
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

export async function addToWatchlist(userId: string, movieId: string) {
  if (!userId) {
    return { error: "User not authenticated." };
  }
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      watchlist: arrayUnion(movieId),
    });
    return { success: true };
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    return { error: "Failed to add to watchlist." };
  }
}
*/
