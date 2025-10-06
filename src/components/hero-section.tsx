import { Button } from '@/components/ui/button';
import { PlayCircle, Info } from 'lucide-react';
import type { Movie } from '@/lib/types';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface HeroSectionProps {
  movie: Movie;
}

export function HeroSection({ movie }: HeroSectionProps) {
  if (!movie) return null;
  
  return (
    <div className="relative h-[80vh] w-full -mt-20">
      <div className="absolute inset-0">
        <Image
            src={movie.posterUrl}
            alt={`Poster for ${movie.title}`}
            fill
            className="object-cover"
            priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/10 to-transparent" />
      </div>
      <div className="relative z-10 container h-full flex flex-col justify-end pb-20 md:pb-24 space-y-6 max-w-2xl">
        <h1 className={cn('font-headline text-4xl md:text-6xl font-bold text-white drop-shadow-lg')}>
          {movie.title}
        </h1>
        <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-primary bg-primary/20 text-primary">{movie.year}</Badge>
            <Badge variant="outline" className="border-primary bg-primary/20 text-primary">{movie.genre}</Badge>
            <Badge variant="outline" className="border-primary bg-primary/20 text-primary">Rating: {movie.rating}/10</Badge>
        </div>
        <p className="text-base md:text-lg text-white/80 drop-shadow-md line-clamp-3">
          {movie.description}
        </p>
        <div className="flex items-center space-x-4 pt-2">
          <Button size="lg" className="font-bold text-lg">
            <PlayCircle className="mr-2 h-6 w-6" />
            Play
          </Button>
          <Button size="lg" variant="secondary" className="font-bold text-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
            <Info className="mr-2 h-6 w-6" />
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
}
