# Frankies Cake

A premium, single-page storefront for Frankies Cake — a handcrafted cake studio in AlJubiha,
Amman. Fully static: no database, no server, no secrets.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router), static export (`output: 'export'`) |
| Styling | Tailwind CSS |
| Motion | Framer Motion |
| State | React Context + `localStorage` (cart) — no backend |
| Hosting | Cloudflare Workers (static assets) |

There is no order/checkout backend yet — the cart, checkout, and custom-cake-builder flows are
fully built UI/UX, but "submitting" an order is currently a simulated round trip. Wiring them to
a real order pipeline (D1, KV, or an external API) is the natural next step.

## Local development

```bash
npm install
npm run dev
```

## Deploying to Cloudflare

The repo is set up for Cloudflare's Git integration: connect this repo to a Worker
(**Workers & Pages → your Worker → Settings → Build**) and it builds and deploys on every push to
`main`. `wrangler.jsonc` already tells wrangler to run `npm run build` before deploying, so the
dashboard's own build command field can be left as-is.

To deploy manually:

```bash
npm run build
npx wrangler deploy
```

## Project structure

```
src/
  app/            # Next.js App Router entry (layout, page, globals.css)
  components/
    layout/       # Header, mobile menu, footer, loading screen
    home/         # Page sections (hero, cakes grid, collections, about, ...)
    product/      # Cake card + product detail modal
    cart/         # Cart context, drawer, checkout, fly-to-cart animation
    custom-builder/ # Multi-step custom cake request flow
    ui/           # Shared primitives (Button, Reveal, motion providers, ...)
  data/           # Menu (categories/flavors/pricing) and site copy
  lib/            # Motion variants, timing constants, small hooks
public/
  images/cakes/   # Product photography
```
