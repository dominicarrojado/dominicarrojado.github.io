---
name: seo-validator
description: Expertise in auditing and maintaining search engine optimization (SEO) best practices on Next.js pages. Use when validating metadata, sitemap configs, or SEO tags.
---

# SEO Validator Instructions

When auditing or reviewing SEO tags across pages:

1. **Audit Standard Meta Tags:** Open page files (`pages/*.page.tsx`) and verify that `<SeoTags>` or Next.js metadata triggers the correct title, description, and preview cards.
2. **Check Constants Alignment:** Ensure constants like `SITE_NAME`, `MAIN_TITLE`, `MAIN_DESC`, and `META_IMAGE` in `lib/constants.ts` are populated correctly and not overridden by broken hardcoded strings in separate layouts.
3. **Verify Sitemap Configuration:** Check the sitemap generation logic configured inside `next-sitemap.config.js` to ensure generated maps cover the standard dynamic post routing correctly.
