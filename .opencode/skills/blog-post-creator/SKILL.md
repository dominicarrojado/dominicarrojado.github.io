---
name: blog-post-creator
description: Craft, format, validate, and manage markdown blog posts under the posts/ directory. Use when creating new blog posts or updating existing post front-matter or content.
---

# Blog Post Creator Instructions

When creating or modifying markdown blog posts in `posts/`, you MUST adhere to the following workflow:

1. **Auto-Generate Slug:** Name the file `[slug].md` where slug is lowercase, kebab-case, and matches standard URL formats.
2. **Draft Front-Matter:** Ensure the metadata block contains exactly `title`, `date`, `excerpt`, `category`, and `videoUrl`.
3. **Verify Conventions:**
   - Confirm `date` is formatted as `YYYY-MM-DD`.
   - Ensure `category` is lowercase (e.g., `'technology'`).
   - Confirm Level-2 headings (`##`) are used instead of Level-1 headings (`#`).
   - Include a `## Prerequisites` block right after `## Introduction`.
   - Ensure the Yarn statement is included: `"We use [Yarn](https://classic.yarnpkg.com/lang/en/) as our package manager, it's just like [npm](https://www.npmjs.com/) but *faster*."`
4. **Formatting:** Format the markdown cleanly with single blank lines between sections.
