"use client";

import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // To prevent flash of unauthenticated content, we show a loading skeleton
  if (loading) {
    return (
      <div className="w-full h-screen bg-background flex flex-col">
        <header className="h-16 flex items-center justify-between px-4 container">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-10 w-10 rounded-full" />
        </header>
        <main className="flex-1">
            <Skeleton className="w-full h-[60vh]" />
            <div className="container space-y-8 mt-8">
                <Skeleton className="h-8 w-48" />
                <div className="flex space-x-4">
                    <Skeleton className="h-64 w-48" />
                    <Skeleton className="h-64 w-48" />
                    <Skeleton className="h-64 w-48" />
                    <Skeleton className="h-64 w-48" />
                </div>
            </div>
        </main>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
