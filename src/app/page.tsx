import { Header } from '@/components/layout/header';
import { HeroSection } from '@/components/hero-section';
import { MovieCarousel } from '@/components/movie-carousel';
import { allMovies, getMoviesByGenre, getTrendingMovies } from '@/lib/movies';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  const trendingMovies = getTrendingMovies(10);
  const heroMovie = trendingMovies[0];
  const actionMovies = getMoviesByGenre('Action', 10);
  const comedyMovies = getMoviesByGenre('Comedy', 10);
  const scifiMovies = getMoviesByGenre('Sci-Fi', 10);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection movie={heroMovie} />
        <div className="container pb-20 -mt-20 md:-mt-32 relative z-10 space-y-8">
          <MovieCarousel title="Trending Now" movies={trendingMovies} />
          <MovieCarousel title="Action & Adventure" movies={actionMovies} />
          <MovieCarousel title="Sci-Fi Thrillers" movies={scifiMovies} />
          <MovieCarousel title="Comedies" movies={comedyMovies} />
        </div>
      </main>
      <footer className="container py-8">
        <div className="flex justify-center items-center">
            <Separator />
        </div>
        <p className="text-center text-sm text-muted-foreground mt-8">
            CineVerse &copy; {new Date().getFullYear()}. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
