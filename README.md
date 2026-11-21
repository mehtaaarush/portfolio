# Aarush Mehta — Portfolio

Personal portfolio of Aarush Mehta, a Data Science & AI/ML student at UPES Dehradun building RAG systems, ML models and full-stack AI products.

Built with Next.js, TypeScript, Tailwind CSS, Motion and Lenis. Dark theme by default, with a light theme toggle.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Editing content

- **Hero text, availability badge and the `aarush.py` code card (profile and "now" list):** `lib/site-content.ts`
- **Projects, skills, certifications, the experience timeline and links:** `lib/portfolio.ts`
- **Theme colours (dark "night lab" default, light "lab notebook"):** the `.dark` and `:root` blocks in `app/globals.css`
- **Photo:** replace `public/aarush.png` (keep the file name)
- **Project images:** `public/work/`, referenced by each project's `shot` in `lib/portfolio.ts` (`frame: "site"` for live-page screenshots, `"figure"` for repo images and plots); projects without one get a drawn cover
- **Tool logos strip:** `components/site/tool-strip.tsx` (icons from `simple-icons`)
- **LeetCode stats:** fetched on the server in `lib/leetcode.ts`, refreshed every 12 hours, with fallback numbers if LeetCode is unreachable

Pushing to `main` redeploys the site on Vercel automatically.
