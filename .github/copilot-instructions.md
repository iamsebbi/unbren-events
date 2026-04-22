# Copilot Instructions for UNBREN.

## Project shape (read this first)

- This is a **single Next.js App Router app** with two product verticals:
  - **Events** under `src/app/events/*`
  - **Creative** under `src/app/creative/*`
- Root landing `src/app/(root)/page.tsx` is a split-screen router to `/events` and `/creative`.
- Keep changes scoped to the target vertical unless explicitly asked to share logic.

## Routing, layout, and theming conventions

- Each vertical owns its layout and theme wrapper:
  - `src/app/events/layout.tsx` → `.events-theme`, Lenis smooth scroll, conditional footer.
  - `src/app/creative/layout.tsx` → `.creative-theme`, local light/dark toggle via context.
- Theme tokens are CSS variables in vertical stylesheets:
  - `src/app/events/styles/styles.css`
  - `src/app/creative/styles/styles.css`
- Global typography/font variables are set in:
  - `src/app/layout.tsx`
  - `src/styles/globals.css`

## Component/data patterns used in this codebase

- Prefer **section-based composition** for pages (home pages import many `_components/*`).
- Many pages are **data-driven** from typed `data/*.ts` files (e.g. `events/data/eventsData.ts`, `creative/(home)/data/servicesData.ts`).
- Dynamic pages commonly map `slug` to local data and call `notFound()` when missing (example: `src/app/events/[slug]/page.tsx`).
- Use `cn()` from `src/lib/utils.ts` for class merging.
- Use `@/*` import alias from `tsconfig.json`; prefer aliases over long relative paths when practical.

## Forms and user feedback

- Existing forms submit directly to **Web3Forms** via `fetch("https://api.web3forms.com/submit")`.
- Access key comes from `NEXT_PUBLIC_WEB3FORMS_KEY`.
- Keep existing UX style: lightweight client validation + `sonner` toasts.
- Reference implementations:
  - `src/app/events/contact/components/ContactForm.tsx`
  - `src/app/creative/(home)/_components/CreativeCTASection.tsx`

## Motion and interaction conventions

- Motion stack is `framer-motion`; smooth scroll in Events uses `lenis/react` (`events/_shared/SmoothScroll.tsx`).
- Events modal/open overlays communicate with smooth-scroll through `offers:modal-toggle` custom event; preserve this behavior when editing modal flows.

## Build, lint, and local workflow

- Install: `npm install`
- Dev: `npm run dev`
- Lint: `npm run lint`
- Production: `npm run build` then `npm run start`
- No dedicated test suite is configured in `package.json`; run lint/build for validation.

## Styling and asset constraints

- Tailwind CSS v4 is used with `prettier-plugin-tailwindcss`; keep class order formatter-friendly.
- Use `next/image` for images. Allowed remote hosts are defined in `next.config.ts` (`images.unsplash.com`, `plus.unsplash.com`, `**.fbcdn.net`, `encrypted-tbn0.gstatic.com`).
- Reuse existing theme tokens (`--color-events-*`, `--color-creative-*`) instead of introducing ad-hoc colors.

## When implementing changes

- Follow the existing vertical’s language/tone and visual style (Events is Romanian-heavy; Creative is mostly English copy).
- Prefer minimal, local edits over cross-cutting refactors.
- Do not introduce new state libraries or form frameworks unless the task explicitly requires it.
