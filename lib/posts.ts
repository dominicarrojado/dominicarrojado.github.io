import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import remarkHtml from 'remark-html';
import remarkExternalLinks from 'remark-external-links';
import { sortArrayByKeys } from './array';
import { POSTS_DISPLAY_LATEST_MAX } from './constants';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getLatestPostsData(posts = getAllPostsData()) {
  const postsLen = posts.length;
  const latestPosts = [];

  for (let i = 0; i < postsLen; i++) {
    if (i >= POSTS_DISPLAY_LATEST_MAX) {
      break;
    }

    latestPosts.push(posts[i]);
  }

  return latestPosts;
}

export function getAllPostsData() {
  // get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames.map((fileName) => {
    // remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    };
  });

  return sortArrayByKeys(posts, { date: -1 });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ''),
    },
  }));
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(remarkExternalLinks, {
      target: '_blank',
      rel: ['noopener noreferrer nofollow'],
    })
    .use(remarkHtml)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // combine the data with the id
  return {
    id,
    contentHtml,
    ...getAdjacentPosts(id),
    ...(matterResult.data as { date: string; title: string }),
  };
}

// get previous/next of post via postId
export function getAdjacentPosts(postId: string, posts = getAllPostsData()) {
  const postIdx = posts.findIndex((item) => item.id === postId);

  return {
    previousPost: posts[postIdx + 1] || null,
    nextPost: posts[postIdx - 1] || null,
  };
}
