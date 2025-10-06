
import { MovieCarousel } from "@/components/movie-carousel";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { allMovies } from "@/lib/movies";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { auth } from "@/lib/firebase-server";
import { redirect } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-server";
import { getMovieById } from "@/lib/movies";

export default async function ProfilePage() {
    const user = auth.currentUser;

    if (!user) {
        redirect('/login');
    }
    
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    const watchlistIds = userDoc.exists() ? userDoc.data()?.watchlist || [] : [];
    
    const userWatchlist = watchlistIds.map((id: string) => getMovieById(id)).filter(Boolean);
    const userHistory = allMovies.slice(5, 10); // Mock history

    const userInitial = user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase();

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
                            <h1 className={cn('font-headline text-4xl font-bold')}>{user.displayName || 'CineVerse User'}</h1>
                            <p className="text-muted-foreground">{user.email}</p>
                        </div>
                    </div>

                    <div className="space-y-12">
                        {userWatchlist.length > 0 ? (
                           <MovieCarousel title="My Watchlist" movies={userWatchlist} />
                        ) : (
                            <div>
                                <h2 className={cn('font-headline text-3xl md:text-4xl font-bold mb-6 text-white')}>My Watchlist</h2>
                                <p className="text-muted-foreground">You haven't added any movies to your watchlist yet.</p>
                            </div>
                        )}
                        <MovieCarousel title="Watched History (Demo)" movies={userHistory} />
                    </div>
                </div>
            </main>
        </div>
    );
}
