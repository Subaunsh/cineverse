
'use client';

import type { Movie } from '@/lib/types';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Star, PlusCircle, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';
import { toggleWatchlist } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { useTransition } from 'react';

interface MovieCardProps {
  movie: Movie;
  isInWatchlist?: boolean;
}

export function MovieCard({ movie, isInWatchlist = false }: MovieCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleWatchlistToggle = async () => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Please sign in',
        description: 'You need to be signed in to add movies to your watchlist.',
      });
      return;
    }

    startTransition(async () => {
      const result = await toggleWatchlist(user.uid, movie.id);
      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Something went wrong',
          description: result.error,
        });
      } else {
        toast({
          title: result.added ? 'Added to Watchlist' : 'Removed from Watchlist',
          description: `${movie.title} has been ${
            result.added ? 'added to' : 'removed from'
          } your watchlist.`,
        });
      }
    });
  };

  return (
    <Card className="group/card w-full h-full overflow-hidden rounded-xl border-border bg-card transition-all duration-300 ease-in-out hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 flex flex-col">
      <CardContent className="p-0 relative aspect-[2/3]">
        <Image
          src={movie.posterUrl}
          alt={movie.title}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-0 right-0 p-2">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full h-9 w-9 bg-black/50 text-white hover:bg-primary"
            onClick={handleWatchlistToggle}
            disabled={isPending}
          >
            {isInWatchlist ? (
              <CheckCircle className="h-5 w-5 text-primary" />
            ) : (
              <PlusCircle className="h-5 w-5" />
            )}
            <span className="sr-only">Add to watchlist</span>
          </Button>
        </div>
      </CardContent>
      <CardFooter className="p-3 flex-col items-start space-y-1 bg-card/80">
        <h3 className="font-headline text-base font-bold text-foreground truncate w-full">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-muted-foreground w-full">
          <span className="uppercase">{movie.genre}</span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-primary fill-primary" />
            <span>{movie.rating}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
