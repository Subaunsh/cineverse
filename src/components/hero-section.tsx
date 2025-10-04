import { Button } from '@/components/ui/button';
import { PlayCircle, Info } from 'lucide-react';
import type { Movie } from '@/lib/types';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  movie: Movie;
}

export function HeroSection({ movie }: HeroSectionProps) {
  if (!movie) return null;
  
  return (
    <div className="relative w-full">
      <div className="relative z-10 container h-full flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
          <div className="md:col-span-2 space-y-6">
            <h1 className={cn('font-headline text-5xl md:text-7xl font-bold text-white drop-shadow-2xl')}>
              {movie.title}
            </h1>
            <div className="flex items-center gap-4">
                <Badge variant="outline" className="border-primary text-primary">{movie.year}</Badge>
                <Badge variant="outline" className="border-primary text-primary">{movie.genre}</Badge>
                <Badge variant="outline" className="border-primary text-primary">Rating: {movie.rating}/10</Badge>
            </div>
            <p className="text-lg md:text-xl text-foreground/80 drop-shadow-lg line-clamp-4">
              {movie.description}
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <Button size="lg" className="font-bold text-lg">
                <PlayCircle className="mr-2 h-7 w-7" />
                Play
              </Button>
              <Button size="lg" variant="outline" className="font-bold text-lg">
                <Info className="mr-2 h-7 w-7" />
                More Info
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
