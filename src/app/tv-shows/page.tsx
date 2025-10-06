import { Header } from "@/components/layout/header";
import { TVShowCard } from "@/components/tv-show-card";
import { allTVShows } from "@/lib/tv-shows";
import { cn } from "@/lib/utils";

export default function TVShowsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1 py-8 md:py-12">
                <div className="container">
                    <h1 className={cn('font-headline text-4xl font-bold mb-8')}>All TV Shows</h1>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {allTVShows.map(show => (
                            <TVShowCard key={show.id} show={show} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
