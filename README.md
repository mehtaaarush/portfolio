# Aarush Mehta — Portfolio

Personal portfolio of Aarush Mehta, a Data Science & AI/ML student at UPES Dehradun building RAG systems, ML models and full-stack AI products.

Built with Next.js, TypeScript, Tailwind CSS, Motion and Lenis. Light theme by default, with a dark theme toggle.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Editing content

- **Hero text, availability badge and the "Currently" list:** `lib/site-content.ts`
- **Projects, skills, certifications, the experience timeline and links:** `lib/portfolio.ts`
- **Theme colours (light "lab notebook" and dark "night study"):** the `:root` and `.dark` blocks in `app/globals.css`
- **Photo:** replace `public/aarush.png` (keep the file name)
- **Project screenshots:** `public/work/`, referenced by each project's `shot` in `lib/portfolio.ts`; projects without one get a typographic cover

Pushing to `main` redeploys the site on Vercel automatically.
