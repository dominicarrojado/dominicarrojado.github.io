---
name: portfolio-project-updater
description: Add or modify showcase projects in the portfolio (lib/constants.ts). Use when updating project highlights, inserting new work, or configuring showcase links.
---

# Portfolio Project Updater Instructions

When instructed to add or modify projects in the portfolio, you MUST:

1. **Locate Projects List:** Find the export named `PROJECTS` in `lib/constants.ts`.
2. **Follow Type Definitions:** Make sure the object you insert adheres exactly to the `Project` type in `lib/types.ts`:
   - `title`: string
   - `id`: string (unique kebab-case identifier)
   - `description`: string
   - `links`: Array<{ title: string; url: string }>
   - `imageUrl`: string (maps to static asset path, e.g., `/images/projects/[project-id].png`)
   - `imageWidth`: number (explicit layout dimension)
   - `imageHeight`: number (explicit layout dimension)
   - `gifUrl`: string (maps to static loader/GIF asset path)
   - `isBest`: boolean (optional)
3. **Verify Asset Placement:** Ensure placeholder images/GIFs are placed in the `public/images/projects/` directory matching the metadata paths.
4. **Compile Check:** Execute `yarn build` or `yarn lint` to ensure that code updates compile cleanly.
