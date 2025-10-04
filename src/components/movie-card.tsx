'use client';

import Image from 'next/image';
import type { Movie } from '@/lib/types';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Play, Plus, ThumbsUp } from 'lucide-react';
import { Badge } from './ui/badge';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card className="group relative w-full h-full overflow-hidden rounded-lg border-none bg-card shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:z-10">
      <CardContent className="p-0">
        <div className="w-full aspect-[2/3] relative">
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            data-ai-hint={movie.id}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
            <h3 className="font-headline text-lg font-bold text-white truncate">{movie.title}</h3>
            <div className="flex items-center gap-2 text-xs text-white/80">
              <span>{movie.year}</span>
              <Badge variant="destructive">{movie.rating}</Badge>
              <span>{movie.genre}</span>
            </div>
            <div className="flex gap-2 pt-2">
              <Button size="icon" className="h-8 w-8">
                <Play className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary" className="h-8 w-8">
                <Plus className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary" className="h-8 w-8">
                <ThumbsUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
