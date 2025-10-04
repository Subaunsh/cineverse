import Link from "next/link";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { SearchDialog } from "@/components/search-dialog";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-transparent bg-gradient-to-b from-black/80 via-black/50 to-transparent transition-all duration-300">
      <div className="container flex h-20 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Icons.logo className="h-6 w-6" />
        </Link>
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          <SearchDialog />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
