import { MovieCarousel } from '@/components/movie-carousel';
import { getMoviesByGenre } from '@/lib/movies';
import { Separator } from '@/components/ui/separator';
import { getTrendingMovies as getAITrendingMovies } from '@/ai/flows/get-trending-movies';
import { allMovies } from '@/lib/movies';
import { SearchDialog } from '@/components/search-dialog';
import { UserNav } from '@/components/user-nav';

export default async function Home() {
  const trendingMoviesResult = await getAITrendingMovies();
  const trendingMovies = trendingMoviesResult.movies || allMovies.slice(0, 10);
  
  const actionMovies = getMoviesByGenre('Action', 10);
  const comedyMovies = getMoviesByGenre('Comedy', 10);
  const scifiMovies = getMoviesByGenre('Sci-Fi', 10);
  const horrorMovies = getMoviesByGenre('Horror', 10);
  const dramaMovies = getMoviesByGenre('Drama', 10);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full">
        <div className="container flex h-20 max-w-screen-2xl items-center justify-end">
          <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
            <SearchDialog />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container pb-20 mt-8 md:mt-12 space-y-16">
          {trendingMovies.length > 0 && <MovieCarousel title="Trending Now" movies={trendingMovies} />}
          <MovieCarousel title="Action & Adventure" movies={actionMovies} />
          <MovieCarousel title="Sci-Fi Thrillers" movies={scifiMovies} />
          <MovieCarousel title="Comedies" movies={comedyMovies} />
          <MovieCarousel title="Horror" movies={horrorMovies} />
          <MovieCarousel title="Dramas" movies={dramaMovies} />
        </div>
      </main>
      <footer className="container py-8">
        <div className="flex justify-center items-center">
            <Separator className="bg-border" />
        </div>
        <p className="text-center text-sm text-muted-foreground mt-8">
            CineVerse &copy; {new Date().getFullYear()}. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
