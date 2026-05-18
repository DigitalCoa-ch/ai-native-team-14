# Deployment Status

## Team

Team number: 14
OpenClaw: https://ai-native-14.digitalcoa.ch
GitHub: https://github.com/DigitalCoa-ch/ai-native-team-14
Published app: https://team-14.apps.digitalcoa.ch

## Current Status

Last commit: 59f1a03 - "Deploy tracker landing page + HTML files via Vercel"
Last push: Mon May 18 12:00 UTC
Vercel status: Build successful (✓ Compiled successfully, 4 static pages)
Public URL checked: 404 - DEPLOYMENT_NOT_FOUND (Vercel deployment may be delayed or project needs re-link)

## What Was Built

3 tracker variants (self-contained HTML files):
- `index.html` - Sofia Year Tracker (soft girl, cycle tracking)
- `ceos-tracker.html` - CEO's Tracker (same as Sofia, rebranded)
- `manly-tracker.html` - Manly Tracker (steel blue, progressive overload)

Static landing page at `/` linking to all 3 trackers.

## Known Issue

Vercel deployment not found at `https://team-14.apps.digitalcoa.ch`. The push to GitHub triggers Vercel, but deployment may need:
1. Manual re-link of Vercel project to GitHub repo, OR
2. Waiting for Vercel to process the deployment queue

## Rule

Deployments happen through GitHub push to `main`. Do not use direct Vercel CLI deployment unless instructed.