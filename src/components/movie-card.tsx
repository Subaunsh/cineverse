'use client';

import Image from 'next/image';
import type { Movie } from '@/lib/types';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card className="group/card w-full h-full overflow-visible rounded-lg border-none bg-transparent transition-all duration-300 ease-in-out">
      <CardContent className="p-0">
        <div className="w-full aspect-[2/3] relative rounded-lg overflow-hidden">
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            fill
            className="object-cover rounded-lg transition-transform duration-300 group-hover/card:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            data-ai-hint={movie.id}
          />
        </div>
        <div className={cn(
          "absolute inset-x-0 bottom-[-50%] z-20 w-full h-[150%]",
          "bg-zinc-900 rounded-lg shadow-xl",
          "transition-all duration-500 ease-in-out",
          "opacity-0 scale-95 group-hover/card:opacity-100 group-hover/card:scale-105 group-hover/card:bottom-0"
        )}>
          <div className="relative h-full">
            <div className="w-full aspect-[2/3] relative">
              <Image
                src={movie.posterUrl}
                alt={movie.title}
                fill
                className="object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
            </div>
            <div className="p-3 space-y-2 absolute bottom-0 w-full">
              <h3 className="font-headline text-base font-bold text-white truncate">{movie.title}</h3>
              <div className="flex items-center justify-between text-xs text-white/80">
                <Badge variant="destructive" className="text-xs">{movie.rating}</Badge>
                <span>{movie.year}</span>
                <span className='uppercase text-xs border rounded-sm px-1'>{movie.genre.substring(0,3)}</span>
              </div>
              <div className="flex gap-2 pt-1">
                <Button size="icon" className="h-8 w-8 bg-white text-black hover:bg-white/80">
                  <Play className="h-4 w-4 fill-black" />
                </Button>
                <Button size="icon" variant="secondary" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="h-8 w-8">
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="h-8 w-8 ml-auto">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
