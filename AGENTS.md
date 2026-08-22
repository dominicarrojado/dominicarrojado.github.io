# AGENTS.md

High-signal instructions for AI coding agents in this repository.

## Verification & Commands

- Package manager: Always use **Yarn** (`yarn install --frozen-lockfile`). Do NOT use `npm` or `pnpm`.
- Dev server: `yarn dev`
- Lint: `yarn lint` (ESLint v9 via `eslint.config.mjs`)
- Test suite: `yarn test` (Jest with coverage)
- Single test: `yarn test pages/__tests__/index.test.tsx`
- Build: `yarn build` (runs `next build` static export, followed by `next-sitemap` via `postbuild`)
- Gemini validation: `node scripts/validate-gemini.js`

## Key Architecture & Framework Quirks

- **Routing File Extension**: Next.js Pages Router configured with `pageExtensions: ['page.tsx']` in `next.config.js`. Route pages MUST end with `.page.tsx` (e.g., `pages/about.page.tsx`). Files without `.page.tsx` in `pages/` are ignored by routing.
- **Static Export**: Uses `output: 'export'` with `trailingSlash: true`. CI transforms `out/404/index.html` to `out/404.html` and creates `out/.nojekyll`. Never manually edit generated artifacts (`.next/`, `out/`, `coverage/`, `next-env.d.ts`).
- **Blog Pipeline**: Markdown posts live in `posts/*.md`. `lib/posts.ts` parses front-matter and automatically excludes uppercase `*.md` files (e.g., `posts/GEMINI.md`, `AGENTS.md`).
- **Data & State**: Portfolio projects and site metadata are in `lib/constants.ts`. Browser-only client logic lives in `modules/` (e.g., `modules/DarkMode.ts`).

## Code Conventions & Style

- **Path Aliases**: Use `@/*` for root imports (e.g., `@/components/Header`, `@/lib/constants`).
- **ESLint & TypeScript Requirements**:
  - Array types must use generic syntax `Array<T>` (enforced by `@typescript-eslint/array-type`).
  - Do NOT use `.then()` or `.catch()` promise chains; use `async/await` with `try/catch` (enforced by ESLint).
- **Testing**: Colocate tests in `__tests__/` subdirectories adjacent to source files (e.g., `pages/__tests__/`, `lib/__tests__/`). Use React Testing Library with accessible role queries (`screen.getByRole`).

## Referenced Instructions & Specs

- Architecture overview: [ARCHITECTURE.md](ARCHITECTURE.md)
- Blog front-matter schema & post style: [posts/GEMINI.md](posts/GEMINI.md)
- Developer guidelines: [GEMINI.md](GEMINI.md)
