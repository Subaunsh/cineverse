'use client';

import type { TVShow } from '@/lib/types';
import { Card, CardContent, CardFooter } from './ui/card';
import { Star } from 'lucide-react';
import Image from 'next/image';

interface TVShowCardProps {
  show: TVShow;
}

export function TVShowCard({ show }: TVShowCardProps) {
  return (
    <Card className="group/card w-full h-full overflow-hidden rounded-xl border-border bg-card transition-all duration-300 ease-in-out hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 flex flex-col">
      <CardContent className="p-0 relative aspect-[2/3]">
        <Image
          src={show.posterUrl}
          alt={show.title}
          fill
          className="object-cover"
        />
      </CardContent>
      <CardFooter className="p-3 flex-col items-start space-y-1 bg-card/80">
          <h3 className="font-headline text-base font-bold text-foreground truncate w-full">{show.title}</h3>
          <div className="flex items-center justify-between text-xs text-muted-foreground w-full">
            <span className='uppercase'>{show.genre}</span>
            <div className='flex items-center gap-1'>
                <Star className='w-3 h-3 text-primary fill-primary' />
                <span>{show.rating}</span>
            </div>
          </div>
      </CardFooter>
    </Card>
  );
}
