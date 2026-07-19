# Gemini Blog Writing Instructions

All blog posts are authored in Markdown with Front-Matter metadata under the `posts/` directory.

## Editorial Style Guide

1. **Voice and Tone:** Casual, warm, and highly encouraging. Address the reader as a peer developer.
2. **Signature Phrases:** Weave in natural, upbeat transitions like:
   - `"Alright, here we go ~"`
   - `"Let's get started!"`
   - `"so let's go ahead and start learning and building it together!"`
3. **Technology Hyperlinking:** On first mention of any core web technology, always link to its official documentation (e.g. `[React](https://react.dev/)`, `[Yarn](https://classic.yarnpkg.com/lang/en/)`, `[TypeScript](https://www.typescriptlang.org/)`).
4. **Prerequisites Section:** Every technical post must feature a `## Prerequisites` section right after the `## Introduction`. This section should:
   - Explicitly list assumed knowledge of web development standards (HTML, CSS, JavaScript, React).
   - Advocate for Yarn with the phrase: `"We use [Yarn](https://classic.yarnpkg.com/lang/en/) as our package manager, it's just like [npm](https://www.npmjs.com/) but *faster*."`
   - Include a relative link pointing to the live demo of the feature (if applicable).
5. **Headings:** The post title is rendered from front-matter. Therefore, the markdown body MUST start with Level-2 Headings (`##`) or lower. Never use Level-1 Headings (`#`) in the content.
6. **Paragraph Spacing:** Ensure one blank line between paragraphs and headings to preserve parser consistency.

## Front-Matter Schema

Every markdown file MUST begin with front-matter structured as follows:

```yaml
---
title: 'Detailed Title of Your Post'
date: 'YYYY-MM-DD'
excerpt: 'A short, engaging 1-2 sentence description summarizing the post.'
category: 'technology'
videoUrl: ''
---
```

### Constraints:

- **`date`:** MUST be formatted as `YYYY-MM-DD`.
- **`category`:** Must be lowercase (usually `'technology'`).
- **`videoUrl`:** String containing a YouTube link or empty string `''` if none.
