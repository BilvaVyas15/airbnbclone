# Airbnb-Clone — Take-Home Submission

Next.js 14 (App Router) + TypeScript + Tailwind CSS clone of the reference
listing page, its Photo Tour, and its Lightbox.

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## What's implemented

- **Listing Page** (`/`): header nav, hero gallery grid with hover states,
  title bar with share/save, host summary, highlights, expandable
  description, amenities grid with show-all toggle, sticky booking/reserve
  card with price breakdown.
- **Photo Tour** (`src/components/PhotoTour.tsx`): full-screen overlay,
  photos grouped by room, opened from "Show all photos" or any hero image,
  closes on Escape or the close button, restores focus to the trigger.
- **Lightbox** (`src/components/Lightbox.tsx`): single-photo viewer with
  prev/next buttons, `←`/`→` keyboard navigation, `Escape` to close, a
  focus trap while open, and focus restoration on close (back to the Photo
  Tour if opened from there, otherwise back to the grid).

## Known gap — please read

I built this without live access to the reference URL
(`https://airbnb-clone-umber-two.vercel.app`) — my environment's network
access doesn't reach that domain and the site also blocks automated
fetching. So the current build follows real Airbnb's actual, well-known
listing-page conventions (spacing scale, `#FF385C` accent, card radii,
hover/focus behavior) as a faithful **structural and behavioral** starting
point, rather than a byte-for-byte visual match to the specific reference
screenshots.

To close the gap to pixel-perfect, the fastest path is:
1. Open the reference in a desktop browser.
2. For each of the three views, capture a screenshot and, in DevTools,
   copy the computed styles (or the outer HTML) for the sections that
   differ from this build.
3. Drop them in `/reference` and run the `pixel-fidelity-review` skill
   (see `.claude/skills/pixel-fidelity-review/SKILL.md`) or the
   `ui-fidelity-auditor` sub-agent against them — both are set up to do a
   systematic expected-vs-actual pass rather than an eyeballed one.

## Sample data

`src/data/listing.ts` holds placeholder listing content (title, amenities,
photos) modeled on the reference's visible text ("Romantic Jacuzzi 1BHK
Candolim | Mirashya UG10") plus stock photography, since I could not pull
the reference's actual asset URLs. Swap in the real copy/photos once you
have them from the reference page.

## Architecture

See `architecture-diagram.png` / `.pdf` and `architecture-notes.md` for the
production-scale system design (frontend, backend, storage, search,
deployment/scaling strategy).

## AI-assisted development

See `PROMPTS.md` for the sequence of prompts/tasks used to build this with
Claude, and `.claude/agents/` + `.claude/skills/` for the sub-agent and
skill configs used in the workflow.
