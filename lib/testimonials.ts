import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';
import { sortArrayByKeys } from './array';
import { Testimonial } from './types';

const testimonialsDir = path.join(process.cwd(), 'testimonials');

export async function getAllTestimonialsData() {
  const fileNames = fs.readdirSync(testimonialsDir);
  const promises: Array<Promise<void>> = [];
  const testimonials: Array<Testimonial> = [];

  fileNames.forEach((fileName) => {
    promises.push(
      (async () => {
        // read markdown file as string
        const fullPath = path.join(testimonialsDir, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // use remark to convert markdown into HTML string
        const processedContent = await remark()
          .use(html)
          .process(matterResult.content);
        const contentHtml = processedContent.toString();

        testimonials.push({
          ...(matterResult.data as Exclude<Testimonial, 'contentHtml'>),
          contentHtml,
        });
      })()
    );
  });

  await Promise.all(promises);

  return sortArrayByKeys(testimonials, { order: 1 });
}
