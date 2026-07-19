---
name: blog-post-creator
description: Expertise in crafting, formatting, validating, and managing markdown blog posts under the posts/ directory. Use when creating new blog posts or updating existing post front-matter/content.
---

# Blog Post Creator Instructions

When creating or modifying markdown blog posts, you MUST adhere to the following workflow:

1. **Auto-Generate Slug:** Name the file `[slug].md` where slug is lowercase, kebab-case, and matches standard URL formats.
2. **Draft Front-Matter:** Ensure the metadata block contains exactly `title`, `date`, `excerpt`, `category`, and `videoUrl`.
3. **Verify Conventions Manually:**
   - Confirm date is `YYYY-MM-DD` (for example, the current date formatted as `YYYY-MM-DD`).
   - Ensure categories are lowercase.
   - Confirm Level-2 headings (`##`) are used instead of Level-1 headings (`#`).
4. **Verify Formatting:** Format the markdown using Prettier.
