# typ

A minimalist typing game for kids (ages 5-7) built with Vue 3 and Vite.

## Features

- Clean, child-friendly interface with large fonts
- Three difficulty levels (easy, medium, hard)
- Three practice modes (word, phrase, numbers)
- Visual feedback with color-coded typing
- On-screen keyboard with next-letter highlighting
- Activity timer (tracks focused time only)
- Fullscreen mode
- Dark/light mode (follows system preference)
- Settings persistence via localStorage
- Fully static, deployable to any hosting platform

## Practice Modes

**Word Mode:** Practice typing single words from a curated list of Dolch and Fry sight words.

**Phrase Mode:** Practice typing short, age-appropriate phrases.

**Numbers Mode:** See the written form and type the number (e.g., "forty-two" → 42)
- Easy: Numbers < 30
- Medium: Numbers < 100 and powers of 10 (10, 100, 1000)
- Hard: Numbers < 5000

## Design Decisions

**Word List:** Uses a manually curated word list combining Dolch and Fry sight words with simple age-appropriate vocabulary. This ensures all content is educational, safe, and suitable for young children, avoiding the need for NSFW filtering present in generic word list packages.

**Activity Timer:** Tracks only active typing time by pausing after 15 seconds of inactivity. This provides an accurate measure of focused practice time.

**Tech Stack:** Vue 3 + Vite for fast development and optimal static build output.

**Target Audience:** Ages 5-7, with extra large fonts, bright colors, and encouraging visual feedback.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The output in `dist/` can be deployed to any static hosting service (GitHub Pages, Netlify, Vercel, etc.).
