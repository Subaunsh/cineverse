import type { Movie } from '@/lib/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { MovieCard } from './movie-card';
import { cn } from '@/lib/utils';

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
}

export function MovieCarousel({ title, movies }: MovieCarouselProps) {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className={cn('font-headline text-3xl md:text-4xl font-bold mb-6 text-white')}>{title}</h2>
      <Carousel
        opts={{
          align: 'start',
          dragFree: true,
          slidesToScroll: 'auto',
        }}
        className="w-full group/carousel -mx-2"
      >
        <CarouselContent className="">
          {movies.map((movie, index) => (
            <CarouselItem
              key={`${movie.id}-${index}`}
              className="pl-4 basis-1/3 sm:basis-1/4 md:basis-1/5"
            >
              <MovieCard movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex left-2 h-12 w-12 opacity-0 group-hover/carousel:opacity-100 transition-opacity" />
        <CarouselNext className="hidden lg:flex right-2 h-12 w-12 opacity-0 group-hover/carousel:opacity-100 transition-opacity" />
      </Carousel>
    </div>
  );
}
