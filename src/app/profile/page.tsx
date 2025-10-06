
import { MovieCarousel } from "@/components/movie-carousel";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getTrendingMovies, getMoviesByGenre } from "@/lib/movies";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";

export default function ProfilePage() {
    // In a real app, you would fetch the user's actual watchlist and history
    const userWatchlist = getTrendingMovies(5);
    const userHistory = getMoviesByGenre('Sci-Fi', 7);

    // Mock user data
    const user = {
        displayName: 'CineVerse User',
        email: 'user@example.com',
        photoURL: ''
    };
    const userInitial = user.displayName?.charAt(0).toUpperCase();

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 py-8 md:py-12">
                <div className="container">
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-12">
                        <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-primary">
                            <AvatarFallback className="text-4xl">{userInitial}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className={cn('font-headline text-4xl font-bold')}>{user.displayName}</h1>
                            <p className="text-muted-foreground">{user.email}</p>
                        </div>
                    </div>

                    <div className="space-y-12">
                        <MovieCarousel title="My Watchlist" movies={userWatchlist} />
                        <MovieCarousel title="Watched History" movies={userHistory} />
                    </div>
                </div>
            </main>
        </div>
    );
}
