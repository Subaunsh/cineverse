import { MovieCarousel } from '@/components/movie-carousel';
import { getMoviesByGenre } from '@/lib/movies';
import { getTrendingMovies as getAITrendingMovies } from '@/ai/flows/get-trending-movies';
import { allMovies } from '@/lib/movies';
import { HeroSection } from '@/components/hero-section';
import { Header } from '@/components/layout/header';

export default async function Home() {
  const trendingMoviesResult = await getAITrendingMovies();
  const trendingMovies = trendingMoviesResult.movies || allMovies.slice(0, 10);
  const heroMovie = trendingMovies[0];

  const actionMovies = getMoviesByGenre('Action', 10);
  const comedyMovies = getMoviesByGenre('Comedy', 10);
  const scifiMovies = getMoviesByGenre('Sci-Fi', 10);
  const horrorMovies = getMoviesByGenre('Horror', 10);
  const dramaMovies = getMoviesByGenre('Drama', 10);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {heroMovie && <HeroSection movie={heroMovie} />}
        <div className="container pb-20 space-y-12 relative z-10">
          {trendingMovies.length > 1 && (
            <MovieCarousel title="Trending Now" movies={trendingMovies.slice(1)} />
          )}
          <MovieCarousel title="Action & Adventure" movies={actionMovies} />
          <MovieCarousel title="Sci-Fi Thrillers" movies={scifiMovies} />
          <MovieCarousel title="Comedies" movies={comedyMovies} />
          <MovieCarousel title="Horror" movies={horrorMovies} />
          <MovieCarousel title="Dramas" movies={dramaMovies} />
        </div>
      </main>
      <footer className="container py-8 text-center text-muted-foreground">
        CineVerse &copy; {new Date().getFullYear()}. All Rights Reserved.
      </footer>
    </div>
  );
}
