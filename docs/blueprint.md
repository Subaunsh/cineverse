# **App Name**: CineVerse

## Core Features:

- User Authentication: Secure user login/signup using Firebase Authentication (Google/Email).
- Movie Data Storage: Store movie data (title, genre, rating, year, description, poster image URL) in Firebase Firestore.
- Personalized Movie Recommendations: Recommend movies based on watch history, ratings, and selected genres. Integrates with Firestore.
- AI-Powered Natural Language Movie Search: Use the Gemini API to provide movie suggestions based on natural language queries like, 'Suggest me a sci-fi action movie like Inception.' The system uses the AI as a tool for suggesting movies.
- Search and Filtering: Enable users to search and filter movies by genre, year, and rating using the UI.
- Watchlist Management: Allow users to like, rate, and save movies to their watchlist which is stored in Firestore.
- Voice Search: Implement voice search powered by Gemini. User can say, 'Suggest me a romantic comedy' and the application use the AI as a tool.
- Trending Movies: Display a section of trending movies based on their popularity in Firestore.
- User Profile: Display user's watchlist and history.

## Style Guidelines:

- Background color: Dark charcoal gray (#121212) to create a cinematic ambiance.
- Primary color: Vibrant red (#E50914), reminiscent of the Netflix brand, for primary interactive elements.
- Accent color: Electric blue (#007BFF) for secondary interactive elements to give a modern technology feel.
- Body text: 'Inter', a sans-serif font for clean readability.
- Headline font: 'Space Grotesk', a geometric sans-serif, for a modern, bold appearance.
- Netflix-style grid layout for movie cards, responsive across desktop and mobile.
- Recommendation carousels placed prominently, using horizontal scrolling for the recommendation section, displaying titles such as “Because you liked ___”
- Use minimalistic icons for actions like 'Add to Watchlist,' 'Like,' and 'Rate'.
- Employ fade-in animations for movie cards and loading spinners to enhance user experience.