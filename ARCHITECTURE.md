# Repository Architecture Map - Dominic Arrojado Portfolio & Blog

This architectural guide serves as a map for developers and AI agents to understand how modules, data, layouts, and tests coordinate in this Next.js-powered codebase.

## 1. Technical Stack & Core Modules

- **Frontend Framework:** Next.js (v16 Pages router with static HTML export compiling into `/out`).
- **Styling Pipeline:** Tailwind CSS (v3) configured in `tailwind.config.js` with Prettier automatic styling sorter.
- **Client Handlers (under `/modules`):** State or browser logic that needs persistence (e.g., `modules/DarkMode.ts` manages class mutations and local storage). Keep these isolated as standalone TypeScript modules.

## 2. Abstraction & Directory Layout

- **Routing (`/pages`):** Next.js Pages routing following `[name].page.tsx`. Dynamic posts are compiled via `pages/posts/[id].page.tsx`.
- **Reusable UI Components (`/components`):** Reusable structural or styled elements. Standard SVG paths are encapsulated as isolated SVG components (e.g., `components/svgGitHub.tsx`).
- **Pure Helpers & Core Configuration (`/lib`):**
  - `lib/constants.ts` represents the database layer for dynamic portfolio data. This file houses site configs, lists of quotes, showcase projects (`PROJECTS`), and metadata.
  - `lib/posts.ts` is responsible for utilizing `gray-matter` to parse raw markdown posts in `/posts` for compile-time static routes.

## 3. Data Flow

- **Blogging Pipeline:** Markdown files under `/posts` contain front-matter metadata (schema defined in `posts/GEMINI.md`). At build time, Next.js calls `lib/posts.ts` to construct routes. React renders the body with custom markdown handlers like `react-markdown` and `rehype-highlight`.
- **Sitemap Generation:** Runs during the post-build phase (`postbuild` script) via `next-sitemap` and reads configs in `next-sitemap.config.js` to dump files under `/public`.

## 4. Testing & Accessibility Patterns

- **Framework:** Jest + React Testing Library (RTL) configured in `jest.config.js` and `jest.setup.js`.
- **Colocation:** Tests MUST be colocated in folders named `__tests__/` right next to the source files they test.
- **Selector Standards:** RTL tests must select elements using accessible roles (e.g. `screen.getByRole('button', { name: ... })`) or labels, ensuring high accessibility conformance across layouts.
