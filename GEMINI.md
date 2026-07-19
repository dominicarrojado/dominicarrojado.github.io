# Gemini Developer Instructions - Dominic Arrojado

These instructions are a foundational mandate and take precedence over default behaviors. They ensure all AI-assisted changes are safe, high-quality, and strictly CI-compatible.

## Core Setup & Environment

- **Package Manager:** Always use **Yarn** (`yarn install`, `yarn test`, `yarn lint`, `yarn build`). Do NOT use `npm` or `pnpm` as it will break lockfile compatibility.
- **Node.js Target:** Node v20 with frozen lockfiles in GitHub Actions.
- **CI Safety:** Before finalizing any task, you MUST run linting, tests, and build checks locally.
- **IDE Instructions Sync:** This workspace co-exists with `AGENTS.md` (which is kept for GitHub Copilot compatibility). Always ensure key structural guidelines or command modifications made in `./GEMINI.md` are aligned with `AGENTS.md`.

## Workspace Map

- **Routing:** Next.js Pages router under `pages/` with `*.page.tsx` naming style.
- **UI Components:** Modular Tailwind CSS / React components under `components/`.
- **Utilities & Helpers:** Independent helpers inside `lib/`.
- **Client Classes:** Modular modules inside `modules/` (e.g., DarkMode, Events, Window).
- **Blog Content:** Markdown files containing front-matter in the `posts/` folder.

## Conventions & Engineering Standards

1. **TypeScript Rigor:** Always maintain strict typing. Avoid type casts, `any`, and suppressed warnings unless absolutely necessary or pre-existing.
2. **Styling (Adhering to Codebase):** This codebase uses **Tailwind CSS**. Adhere to tailwind styling conventions. Leverage `prettier-plugin-tailwindcss` for automatically sorting classes.
3. **Prettier Formatting:** Follow configuration rules defined in `.prettierrc`.
4. **File Naming:** Strictly preserve existing file patterns:
   - Pages: `[name].page.tsx`
   - Test files: Colocated inside `__tests__/` subfolders as `[name].test.tsx` or `[name].test.ts`.

## Essential Developer Commands

- **Install Dependencies:** `yarn install`
- **Development Server:** `yarn dev`
- **Formatting and Linting:** `yarn lint`
- **Testing with Coverage:** `yarn test`
- **Build / Static Export Compilation:** `yarn build`

## Avoid Modifying Generated / Cache Paths

- `.next/`
- `out/`
- `coverage/`
- `next-env.d.ts`
