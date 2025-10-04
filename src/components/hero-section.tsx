import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlayCircle, PlusCircle, Info } from 'lucide-react';
import type { Movie } from '@/lib/types';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  movie: Movie;
}

export function HeroSection({ movie }: HeroSectionProps) {
  if (!movie) return null;
  
  return (
    <div className="relative h-[90vh] w-full">
      <div className="absolute inset-0">
        <Image
          src={movie.posterUrl}
          alt={`Poster for ${movie.title}`}
          fill
          className="object-cover"
          data-ai-hint={movie.id}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 container h-full flex flex-col justify-center space-y-6 max-w-3xl">
        <h1 className={cn('font-headline text-5xl md:text-7xl font-bold text-white drop-shadow-2xl')}>
          {movie.title}
        </h1>
        <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-white bg-white/20 backdrop-blur-sm">{movie.year}</Badge>
            <Badge variant="secondary" className="text-white bg-white/20 backdrop-blur-sm">{movie.genre}</Badge>
            <Badge variant="secondary" className="text-white bg-white/20 backdrop-blur-sm">Rating: {movie.rating}/10</Badge>
        </div>
        <p className="text-lg md:text-xl text-white/80 drop-shadow-lg line-clamp-3">
          {movie.description}
        </p>
        <div className="flex items-center space-x-4 pt-4">
          <Button size="lg" className="bg-white hover:bg-white/90 text-black font-bold text-lg">
            <PlayCircle className="mr-2 h-7 w-7" />
            Play
          </Button>
          <Button size="lg" variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm font-bold text-lg">
            <Info className="mr-2 h-7 w-7" />
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
}
