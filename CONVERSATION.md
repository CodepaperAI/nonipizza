# CONVERSATION.md — Changelog

> Running changelog of working sessions. **Newest entry on top.** Concise summaries only
> (5–10 lines each) — never full transcripts.

---

## Entry 0 — project kickoff — 2026-07-21

- Received full brief: build a production-ready marketing + online-ordering site for
  **Noni's Pizza & Wings** (Woodstock, ON), matching a bold maroon/cream/orange
  fast-food reference UI, SEO-optimized for local pizza/wings/shawarma intent.
- Locked tech stack: **Next.js (App Router) + TypeScript + Tailwind**, next/font, JSON-LD,
  Next route handlers for sitemap/robots (chose this over `next-sitemap` — no extra dep).
- Created the three source-of-truth docs: **CLAUDE.md** (business facts/NAP, stack, folder
  structure, conventions, menu reference, SEO strategy), **DESIGN.md** (color tokens,
  typography, components, page layouts), and this **CONVERSATION.md**.
- `git init` done; committing docs first, then scaffolding the app.
- Next: scaffold Next.js app → design system (tokens + primitives) → typed data files →
  homepage → SEO landing routes → technical SEO (metadata/JSON-LD/sitemap/robots) → README.
