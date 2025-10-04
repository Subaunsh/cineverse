import { Header } from '@/components/layout/header';
import { HeroSection } from '@/components/hero-section';
import { MovieCarousel } from '@/components/movie-carousel';
import { getMoviesByGenre } from '@/lib/movies';
import { Separator } from '@/components/ui/separator';
import { getTrendingMovies as getAITrendingMovies } from '@/ai/flows/get-trending-movies';
import { allMovies } from '@/lib/movies';

export default async function Home() {
  const trendingMoviesResult = await getAITrendingMovies();
  const trendingMovies = trendingMoviesResult.movies || allMovies.slice(0, 10);
  
  const heroMovie = trendingMovies.length > 0 ? trendingMovies[0] : allMovies[0];
  
  const actionMovies = getMoviesByGenre('Action', 10);
  const comedyMovies = getMoviesByGenre('Comedy', 10);
  const scifiMovies = getMoviesByGenre('Sci-Fi', 10);
  const horrorMovies = getMoviesByGenre('Horror', 10);
  const dramaMovies = getMoviesByGenre('Drama', 10);

  // Filter out the hero movie from the trending list for the carousel
  const trendingCarouselMovies = trendingMovies.filter(movie => movie.id !== heroMovie.id);

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />
      <main className="flex-1">
        <HeroSection movie={heroMovie} />
        <div className="container pb-20 -mt-24 md:-mt-40 relative z-10 space-y-12">
          {trendingCarouselMovies.length > 0 && <MovieCarousel title="Trending Now" movies={trendingCarouselMovies} />}
          <MovieCarousel title="Action & Adventure" movies={actionMovies} />
          <MovieCarousel title="Sci-Fi Thrillers" movies={scifiMovies} />
          <MovieCarousel title="Comedies" movies={comedyMovies} />
          <MovieCarousel title="Horror" movies={horrorMovies} />
          <MovieCarousel title="Dramas" movies={dramaMovies} />
        </div>
      </main>
      <footer className="container py-8">
        <div className="flex justify-center items-center">
            <Separator className="bg-gray-800" />
        </div>
        <p className="text-center text-sm text-gray-500 mt-8">
            CineVerse &copy; {new Date().getFullYear()}. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
