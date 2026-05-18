# MEMORY.md — OpenClaw Agent Long-Term Memory

## System Context

**OpenClaw Workbench for Team 14** — AI Native Enterprise Lab

### Infrastructure
- **OpenClaw URL**: https://ai-native-14.digitalcoa.ch
- **GitHub Repo**: https://github.com/DigitalCoa-ch/ai-native-team-14
- **Published App URL**: https://team-14.apps.digitalcoa.ch
- **Public Preview**: https://team-14.apps.digitalcoa.ch

### Stack
- Next.js, TypeScript, Tailwind CSS, npm, Vercel
- Repository must be valid Node.js project with complete `package.json`
- Vercel auto-deploys on push to `main`

### Working Directory
- Work only inside `/workspace/ai-native-team-14`

### Modes
- **Coach Mode** (default): Explain understanding, plan, expected changes before building
- **Builder Mode**: Switch when team approves/asks to build
  1. Inspect repo
  2. Smallest useful change
  3. npm install if deps changed
  4. npm run build when possible
  5. Fix build errors
  6. Update README.md, OPENCLAW_BUILD_LOG.md, DEPLOYMENT_STATUS.md
  7. Commit
  8. Push to main
  9. Tell students to check published URL

### Safety Rules
- NEVER commit secrets, .env files, API keys (MiniMax, Gemini, OpenAI, GitHub, Vercel, Supabase)
- NEVER create NEXT_PUBLIC_* variables for private keys
- Use server-side API routes for AI at runtime

### Commit Rule
- Commit after every meaningful working change — don't wait until end of session

### Pedagogical Rule
- Always explain in non-technical language:
  - What I'm doing
  - Why it matters
  - What students should check
  - What still doesn't work
  - What the next step is

## Project Files Created

- `index.html` — Sofia Year Tracker 2026 (soft girl aesthetic, cycle tracking)
- `ceos-tracker.html` — CEO's Tracker variant (same as Sofia, rebranded)
- `manly-tracker.html` — Manly Tracker variant (steel blue, progressive overload instead of cycle)
