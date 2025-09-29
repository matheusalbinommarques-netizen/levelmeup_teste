# Level Me Up!

"Level Me Up!" is a web application designed as a personal learning and skill-tracking tool. It allows users to track their progress across various "knowledge areas" by gaining Experience Points (XP) and leveling up. It's built as a Progressive Web App (PWA), meaning it can be "installed" on a device and work offline.

## Core Features

*   **Gamified Learning:** The central concept is to make learning more engaging by using game-like elements such as XP, levels, and progress bars.
*   **Knowledge Areas:** The application is structured around a comprehensive list of skills and subjects, categorized into areas like "Exact and Natural Sciences," "Technology and Engineering," "Arts," "Health," and "Fundamental Skills."
*   **XP and Leveling System:** Users can add XP to their profile, and as they accumulate points, they "level up."
*   **Progress Tracking:** The `progresso.html` page provides a dashboard to visualize progress, including:
    *   A "heatmap" showing daily consistency.
    *   "Mastery" levels for different knowledge areas.
    *   A history of all XP earned.
    *   Daily/weekly "quests" (though these seem to be mockups for now).
*   **Favorites:** Users can mark specific sub-areas of knowledge as "favorites" for quick access.
*   **Search:** A search function allows users to find specific skills within the knowledge areas.
*   **Dark Mode:** The application has a theme toggle for switching between light and dark modes.
*   **PWA Functionality:** The `manifest.json` and `sw.js` (Service Worker) files indicate that this is a PWA. The service worker enables offline access by caching the application's main files (the "app shell").
*   **Accessibility:** The code includes features for accessibility (`a11y`), such as `aria-` attributes, a skip-link, and semantic HTML, which is a great practice.

## How it Works (Technical Details)

*   **Frontend:** It's a pure HTML, CSS, and JavaScript application. There are no large frameworks like React or Vue.js mentioned.
*   **Client-Side Storage:** The application uses `localStorage` to save all user data, including level, XP, favorites, and theme preference. This means all data is stored in the user's browser.
*   **Single-Page Application (SPA) like behavior:** The `index.html` contains a "mini-router" in its JavaScript. This router intercepts clicks on links to other HTML pages (like `progresso.html`) and, instead of a full page reload, it fetches the content of the new page and injects it into the current one. This makes navigation faster and smoother.
*   **Service Worker:** The `sw.js` file implements a "stale-while-revalidate" caching strategy. This means the app will load quickly from the cache, and in the background, it will check for updated versions of the files.

## How to Use

1.  Clone or download the repository.
2.  Open the `index.html` file in a web browser.
3.  The application is ready to use. All data will be stored locally in your browser.

## File Structure

```
.
├── changelog.md
├── index.html
├── manifest.json
├── progresso.html
└── sw.js
```

*   `index.html`: The main page of the application, displaying the knowledge areas.
*   `progresso.html`: The progress dashboard.
*   `sw.js`: The service worker for PWA functionality.
*   `manifest.json`: The web app manifest for PWA configuration.
*   `changelog.md`: A log of changes and improvements to the application.
