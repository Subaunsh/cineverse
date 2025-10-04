"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Mic, Loader2, Bot } from "lucide-react";
import {
  performNaturalLanguageSearch,
  performVoiceSearch,
} from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "./ui/scroll-area";
import { allMovies, searchMovies } from "@/lib/movies";
import { MovieCard } from "./movie-card";

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isListening, setIsListening] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const { toast } = useToast();
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Hide default search icon inside input
    const style = document.createElement("style");
    style.textContent = `input[type="search"]::-webkit-search-decoration,
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-results-button,
    input[type="search"]::-webkit-search-results-decoration {
      -webkit-appearance:none;
    }`;
    document.head.appendChild(style);

    // Initialize speech recognition
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setQuery(transcript);
          handleSearch(transcript, true);
        };
        recognition.onend = () => setIsListening(false);
        recognition.onerror = (event) => {
          toast({
            variant: "destructive",
            title: "Voice search error",
            description: event.error,
          });
          setIsListening(false);
        };
        recognitionRef.current = recognition;
      }
    }
  }, [toast]);
  
  const handleVoiceClick = () => {
    if (!recognitionRef.current) {
      toast({
        variant: "destructive",
        title: "Browser not supported",
        description: "Voice search is not available on this browser.",
      });
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSearch = (searchQuery: string, isVoiceSearch = false) => {
    if (!searchQuery.trim()) return;

    startTransition(async () => {
      setAiSuggestions([]);
      const searchFn = isVoiceSearch
        ? performVoiceSearch
        : performNaturalLanguageSearch;
      const result = await searchFn(searchQuery);
      if (result.suggestions && result.suggestions.length > 0) {
        setAiSuggestions(result.suggestions);
      } else {
        toast({
          title: "No AI suggestions found",
          description: "Try a different search query.",
        });
      }
    });
  };
  
  const manualSearchResults = searchMovies(query);
  const aiResultMovies = allMovies.filter(m => aiSuggestions.includes(m.title));

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="font-headline">Search CineVerse</DialogTitle>
            <DialogDescription>
              Find movies by title or ask our AI for recommendations.
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search movies or ask 'sci-fi movies like Blade Runner'"
              className="pl-10 h-12 text-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
            />
            <Button
              size="icon"
              variant={isListening ? "destructive" : "ghost"}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9"
              onClick={handleVoiceClick}
            >
              {isListening ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>
          </div>
          <ScrollArea className="flex-1 -mx-6 px-6">
            <div className="my-4 space-y-6">
              {isPending && (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
              {aiResultMovies.length > 0 && (
                <div>
                  <h3 className="font-headline text-lg font-semibold mb-4 flex items-center gap-2"><Bot className="w-5 h-5 text-primary" /> AI Suggestions</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {aiResultMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
                  </div>
                </div>
              )}
              {manualSearchResults.length > 0 && query && (
                <div>
                  <h3 className="font-headline text-lg font-semibold my-4">Matching Titles</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {manualSearchResults.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
                  </div>
                </div>
              )}
               {!isPending && aiResultMovies.length === 0 && manualSearchResults.length === 0 && query && (
                <div className="text-center py-10">
                    <p className="text-muted-foreground">No results found for "{query}"</p>
                </div>
               )}
            </div>
          </ScrollArea>
          <DialogFooter>
             <Button type="button" onClick={() => handleSearch(query)} disabled={isPending}>
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                Search
             </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
