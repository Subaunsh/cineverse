
"use server";

import {
  naturalLanguageMovieSearch,
  type NaturalLanguageMovieSearchOutput,
} from "@/ai/flows/natural-language-movie-search";
import {
  voiceSearchForMovies,
  type VoiceSearchForMoviesOutput,
} from "@/ai/flows/voice-search-for-movies";
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase-server";
import { revalidatePath } from "next/cache";

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

export async function toggleWatchlist(userId: string, movieId: string) {
  if (!userId) {
    return { error: "User not authenticated." };
  }
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // If user document doesn't exist, create it.
      await setDoc(userDocRef, { watchlist: [movieId] });
      revalidatePath("/profile");
      revalidatePath("/movies");
      return { success: true, added: true };
    }

    const watchlist = userDoc.data()?.watchlist || [];
    const isInWatchlist = watchlist.includes(movieId);

    if (isInWatchlist) {
      await updateDoc(userDocRef, {
        watchlist: arrayRemove(movieId),
      });
      revalidatePath("/profile");
      revalidatePath("/movies");
      return { success: true, added: false };
    } else {
      await updateDoc(userDocRef, {
        watchlist: arrayUnion(movieId),
      });
      revalidatePath("/profile");
      revalidatePath("/movies");
      return { success: true, added: true };
    }
  } catch (error) {
    console.error("Error updating watchlist:", error);
    return { error: "Failed to update watchlist." };
  }
}
