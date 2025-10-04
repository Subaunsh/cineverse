'use client';

import type { Movie } from '@/lib/types';
import { Card, CardContent, CardFooter } from './ui/card';
import { Star } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card className="group/card w-full h-full overflow-hidden rounded-xl border-border bg-card transition-all duration-300 ease-in-out hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 flex flex-col">
      <CardContent className="p-4 flex-grow flex flex-col justify-center">
        {/* Content can go here if needed */}
      </CardContent>
      <CardFooter className="p-3 flex-col items-start space-y-1 bg-card/80">
          <h3 className="font-headline text-base font-bold text-foreground truncate w-full">{movie.title}</h3>
          <div className="flex items-center justify-between text-xs text-muted-foreground w-full">
            <span className='uppercase'>{movie.genre}</span>
            <div className='flex items-center gap-1'>
                <Star className='w-3 h-3 text-primary fill-primary' />
                <span>{movie.rating}</span>
            </div>
          </div>
      </CardFooter>
    </Card>
  );
}
