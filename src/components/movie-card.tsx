'use client';

import Image from 'next/image';
import type { Movie } from '@/lib/types';
import { Card, CardContent, CardFooter } from './ui/card';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card className="group/card w-full h-full overflow-hidden rounded-xl border-border bg-card transition-all duration-300 ease-in-out hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
      <CardContent className="p-0">
        <div className="w-full aspect-[2/3] relative rounded-t-xl overflow-hidden">
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover/card:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            data-ai-hint={movie.id}
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
        </div>
      </CardContent>
      <CardFooter className="p-3 flex-col items-start space-y-1">
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
