import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { sortArrayByKeys } from './array';
import { POSTS_PER_PAGE } from './constants';

const postsDirectory = path.join(process.cwd(), 'posts');

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

  return sortArrayByKeys(posts, { date: -1, title: -1 });
}

export function getAllPostsLastPage() {
  const fileNames = fs.readdirSync(postsDirectory);

  return Math.ceil(fileNames.length / POSTS_PER_PAGE);
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ''),
    },
  }));
}

export function getAllPostPages() {
  const lastPage = getAllPostsLastPage();
  const pages: Array<{ params: { number: string } }> = [];

  for (let i = 1; i <= lastPage; i++) {
    pages.push({
      params: {
        number: i.toString(),
      },
    });
  }

  return pages;
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // combine the data with the id
  return {
    id,
    content: matterResult.content,
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
