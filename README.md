# Mr. Juice — Web App

A React + Vite website for Mr. Juice: Home, About, Menu, Gallery and Contact,
with outlet-aware WhatsApp ordering built in. Static output — no backend or
database needed.

## Run it locally

You'll need [Node.js](https://nodejs.org) 18+ installed. Then, in this folder:

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`).

## Build for hosting

```bash
npm run build
```

This creates a `dist/` folder. Upload everything inside `dist/` to your
hosting (cPanel File Manager, FTP, Netlify, Vercel, GitHub Pages — any static
host works, since routing uses hash URLs like `#/menu`, which need no server
configuration).

## How ordering works

- Every menu item has an **Add** (build a multi-item order) and **Order**
  (send just that item) button.
- Ordering asks the visitor to pick an outlet first, then opens WhatsApp
  (`wa.me`) with a pre-filled message listing the item(s), quantities and
  total — sent straight to your business number.
- The cart icon in the navbar opens a slide-over with the full order before
  it's sent.

## Things to customize before launch

1. **WhatsApp numbers per outlet** — `src/data/outlets.js`. Right now every
   outlet uses the one number from your menu (0314-4432349, written as
   `923144432349`). Give any outlet its own WhatsApp number by editing its
   `whatsapp` field.
2. **Menu & prices** — `src/data/menu.js`. Transcribed from your PDF menu;
   double-check prices/spelling before publishing, and update whenever your
   printed menu changes.
3. **Gallery photos** — `src/pages/Gallery.jsx` currently uses illustrated,
   color-coded tiles (no stock/stock-photo licensing concerns). Swap in real
   photography of your drinks and outlets when you have it — the file has
   notes on where to make the swap.
4. **About page copy** — `src/pages/About.jsx` uses brand-voice copy that
   avoids inventing specific facts (founding year, awards, etc). Replace with
   your real story whenever you'd like.
5. **Business hours** — not shown anywhere yet since they weren't in the
   source menu. Add them to the Contact page if you'd like them listed.
6. **Logo** — `src/components/Logo.jsx` is a redrawn SVG version of your logo
   in code (crisp at any size). If you have the original vector/AI file,
   swap it in as an image instead for pixel-perfect brand match.

## Project structure

```
src/
  data/         menu.js, outlets.js — all editable content lives here
  context/      AppContext.jsx — cart, outlet selection, WhatsApp link builder
  components/   Navbar, Footer, cards, modals, decorative pieces
  pages/        Home, About, Menu, Gallery, Contact
```

## Tech used

React 18, Vite, React Router (hash routing), Tailwind CSS, Framer Motion,
lucide-react icons.
