# Team CEOtracker — Project Brief

## Product: "Sofia" — A Year Tracker for the Soft Girl Lifestyle

**Status:** Concept defined (2026-05-18)
**Team:** AI Native Team 14

---

## What It Is

Single-page year tracker for women into the soft/pilates-princess lifestyle. Personal dashboard to log daily life — routine, body, mood, money, mind — and watch a full year fill up day by day.

- **One HTML file**, runs in browser, no account, all data in localStorage (`sofia_*` prefix)
- **Aesthetic IS the product** — cream + dusty pink + peach + sage, floating glass cards, sparkles, Bricolage Grotesque + DM Sans fonts

---

## The Year View (Top)

365-day grid for 2026. Each square = one day.
- Empty: cream-white
- Partial day: sage green
- Full day: deep pink
- Hover to peek, click to jump to log
- Header: "Day 137 / 365 — 38% glow."

---

## KPI Strip (5 quick stats)

1. Routine streak (days)
2. Movement sessions (this week)
3. Current cycle day
4. Last night's sleep hours
5. Net spending (clickable → full transactions modal)

---

## Widgets (12 total, 5 rows)

### Row 1 — Daily Core
- **Routine** — custom daily checklist (AM skincare, sunscreen, read 10 pages, etc.), add/remove items, progress bar
- **Affirmation** — one sentence, italic pink card
- **Wins & Gratitude** — 3 fields: win, smile, love

### Row 2 — Body
- **Nourish** — 8 water glasses (tap to fill) + food log (grams → kcal). Defaults: matcha latte, oat milk, greek yogurt, berries, granola, eggs, avocado, salmon, chicken, rice, sweet potato, dark chocolate
- **Movement** — type (pilates/yoga/gym/walk/run/cardio/dance/stretch/rest), duration, intensity (gentle/medium/strong), notes
- **Sleep** — hours, quality 1–5 stars, wake mood (sleepy/meh/okay/glow)

### Row 3 — Rhythm
- **Cycle** — day in cycle, auto-phase labels (menstrual 1-5, follicular 6-13, ovulation 14-16, luteal 17+), mood/energy emoji, symptoms (cramps, bloating, headache, tender, moody, acne, cravings)
- **Hot Girl Walk** — steps (big pink number), outdoor minutes, notes
- **Spending** — log income/expense with categories (self-care, food/café, outfits, pilates/gym, subscriptions, travel, other), running totals. KPI opens full history modal.

### Row 4 — Mind
- **Study** — pending class tasks with priority dots, add/done
- **Read & Watch** — books, podcasts, shows, languages, skills. Every entry requires a "why" (intentionality)

### Row 5 — Overview
- **Year Glow-Up** — analytics: total movement days, avg sleep, avg steps, routine streak, total tasks done, recent movement sessions

---

## Behavior

- Pink dot in widget corner when it has data for selected day
- Drag-and-drop widget reorder (saves order)
- Click any day in year grid to jump/edit
- Click "Today" to snap back
- Settings: export JSON, import JSON, clear all

---

## Tech Stack

- **Stack:** Next.js + TypeScript + Tailwind CSS + npm + Vercel/GitHub
- **Storage:** localStorage only (prefix `sofia_`), no backend, no login
- **Deployment:** OpenClaw edits → commit → push main → Vercel deploys

---

## Commercial Potential

- Digital product (Gumroad/Etsy/Stan Store) — one-time purchase
- Premium aesthetic packs (vanilla girl, coquette, pilates princess, soft goth)
- Multi-year version
- Printable PDF companion
- **AI layer** (future): analyzes data → gives insights/tips, asks contextual questions ("you haven't been sleeping well but you go to bed early — something bothering you?")

---

## Audience

**Primary:** Late-teen to mid-30s women into clean girl / pilates princess / that-girl lifestyle. Already uses Notion templates or Notes app for routines. Posts morning routines on TikTok, drinks matcha, tracks cycle, journals.

**Also:** CEO / busy founders and entrepreneurs aged 20–30 who want a beautiful, personal dashboard to track their daily life across routine, body, mood, money, and mind — without a clinical or corporate feel. Soft aesthetic meets hustle energy.

---

## Differentiation

Most trackers are ugly+clinical OR serious productivity tools. Sofia's aesthetic IS the product — looks like a Pinterest board you can write in. One self-contained HTML file = no friction.

---

## Links

- GitHub: https://github.com/DigitalCoa-ch/ai-native-team-14
- Workbench: https://ai-native-14.digitalcoa.ch
- Published app: https://team-14.apps.digitalcoa.ch