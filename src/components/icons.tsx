import { cn } from "@/lib/utils";

export const Icons = {
  logo: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <span
      className={cn("font-headline text-3xl font-bold text-primary", className)}
    >
      CineVerse
    </span>
  ),
  google: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-4", className)}
      {...props}
    >
      <title>Google</title>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.6 1.62-4.8 1.62-3.87 0-7-3.13-7-7s3.13-7 7-7c1.73 0 3.25.61 4.45 1.74l2.43-2.43C17.43 1.1 15.21 0 12.48 0 7.3 0 3.13 4.15 3.13 9.32s4.17 9.32 9.35 9.32c2.73 0 4.93-1.01 6.6-2.68 1.7-1.7 2.35-4.08 2.35-6.21 0-.6-.05-1.15-.15-1.68z"
      />
    </svg>
  ),
};
