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
      <h2 className={cn('font-headline text-2xl md:text-3xl font-bold mb-4 text-white')}>{title}</h2>
      <Carousel
        opts={{
          align: 'start',
          dragFree: true,
          slidesToScroll: 'auto',
        }}
        className="w-full group/carousel"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {movies.map((movie, index) => (
            <CarouselItem
              key={`${movie.id}-${index}`}
              className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-[15%]"
            >
              <MovieCard movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex left-[-20px] h-10 w-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity" />
        <CarouselNext className="hidden lg:flex right-[-20px] h-10 w-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity" />
      </Carousel>
    </div>
  );
}
