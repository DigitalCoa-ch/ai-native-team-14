# Deployment Status

## Team
- Team number: 14
- OpenClaw: https://ai-native-14.digitalcoa.ch
- GitHub: https://github.com/DigitalCoa-ch/ai-native-team-14
- Published app: **NEEDS RE-DEPLOY** (was `https://team-14.apps.digitalcoa.ch`)

## Current Status

**Last commit:** `95add0f` - "chore: update mission and gemini context" (2026-05-19 10:55 UTC)
**Push to GitHub:** ✅ Done

## What Exists

- **Next.js 14 app** at `/` with links to 3 tracker variants
- **Static HTML trackers** in `public/ (index.html, ceos-tracker.html, manly-tracker.html)
- **Sofia Year Tracker** (index.html) — 28,629 bytes, soft girl aesthetic, 12 widgets, localStorage
- **CEOs Tracker** (ceos-tracker.html) — same as Sofia, rebranded
- **Manly Tracker** (manly-tracker.html) — steel blue, progressive overload fitness tracker

## Vercel Deployment

**Expected URL:** `https://team-14.apps.digitalcoa.ch`
**Current status:** 404 — needs re-deploy
**Deployment method:** GitHub push to `main` branch (Vercel auto-deploy)

**Steps to fix:**
1. Check Vercel dashboard for the project
2. Ensure `vercel.json` or `vercel.toml` is configured if needed
3. The `public/` directory is served as static files by Next.js
4. Or: push an empty commit to trigger Vercel: `git commit --allow-empty -m "trigger deploy"`

## Rule
Deployments happen through GitHub push to `main`. Do not use direct Vercel CLI deployment.