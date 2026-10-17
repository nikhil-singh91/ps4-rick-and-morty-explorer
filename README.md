# PS4: Rick and Morty Explorer (Assignment-5)

A React web application built for college Assignment-5 (PS4) that allows users to explore characters, species, and living statuses from the Rick and Morty television series using the public Rick and Morty API.

## Technologies Used

- React (v19)
- React Router (v7)
- Vite
- Vanilla CSS

## API Used

- Rick and Morty API: https://rickandmortyapi.com/
- Base endpoint: https://rickandmortyapi.com/api/character

## Implemented Routes

- `/` : Home page with an introduction and a button navigating to `/characters`.
- `/characters` : Characters directory with character cards, status badges, name search, status filter, and URL pagination.
- `/characters/:id` : Character details page showing image, status, species, gender, origin, current location, and total episode appearances.
- `*` : Not-found page for unmatched URLs with a link back to Home.

## Features

- Character grid displaying image, name, species, and color-coded status badge.
- Status badge colors: green for Alive, red for Dead, grey for Unknown.
- Name search input to filter characters.
- Status dropdown filter (All, Alive, Dead, Unknown).
- Next and Previous pagination controls with disabled boundary states.
- URL-synchronized pagination via `useSearchParams` (`/characters?page=1`).
- Direct navigation support for character details (`/characters/:id`).
- SPA rewrites for Vercel (`vercel.json`) and Netlify (`_redirects`).

## Installation and Execution

Clone the repository:
```bash
git clone https://github.com/nikhil-singh91/ps4-rick-and-morty-explorer.git
cd ps4-rick-and-morty-explorer
```

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Screenshots

Add your application screenshots in this section before submitting:
- Screenshot 1: Characters Directory (`/characters`)
- Screenshot 2: Character Details (`/characters/:id`)

## Live Deployment URL

*(Deployment URL will be placed here once deployed to Vercel or Netlify)*
