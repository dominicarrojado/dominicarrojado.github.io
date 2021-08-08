import {
  getFakeDate,
  getFakeSentence,
  getFakeSentences,
  getFakeUuid,
  getFakeWord,
} from '../test-helpers';
import { Post } from '../types';
import { POSTS_DISPLAY_LATEST_MAX } from '../constants';
import {
  getAllPostIds,
  getAllPostsData,
  getLatestPostsData,
  getPostData,
} from '../posts';

describe('posts utilities', () => {
  describe('getLatestPostsData()', () => {
    it('should return expected value', () => {
      const latestPosts = getLatestPostsData();

      expect(latestPosts).toEqual(
        expect.arrayContaining([
          {
            id: expect.any(String),
            title: expect.any(String),
            category: expect.any(String),
            date: expect.any(String),
            excerpt: expect.any(String),
          },
        ])
      );

      expect(latestPosts.length).toBeLessThanOrEqual(POSTS_DISPLAY_LATEST_MAX);

      // expect sorting is correct
      let minDate = Infinity;

      latestPosts.forEach((post) => {
        const date = new Date(post.date).getTime();

        expect(date).toBeLessThanOrEqual(minDate);

        minDate = date;
      });
    });

    it('should handle posts less than max', () => {
      const posts = [
        {
          id: getFakeUuid(),
          title: getFakeSentence(),
          category: getFakeWord(),
          date: getFakeDate(),
          excerpt: getFakeSentences(),
        },
      ] as Array<Post>;

      const latestPosts = getLatestPostsData(posts);

      expect(latestPosts.length).toBeLessThanOrEqual(POSTS_DISPLAY_LATEST_MAX);
    });

    it('should handle posts more than max', () => {
      const posts = [];

      for (let i = 0; i < POSTS_DISPLAY_LATEST_MAX + 1; i++) {
        posts.push({
          id: getFakeUuid(),
          title: getFakeSentence(),
          category: getFakeWord(),
          date: getFakeDate(),
          excerpt: getFakeSentences(),
        } as Post);
      }

      // sort by date
      posts.sort(({ date: a }, { date: b }) => {
        if (a < b) {
          return 1;
        } else if (a > b) {
          return -1;
        } else {
          return 0;
        }
      });

      const latestPosts = getLatestPostsData(posts);

      expect(latestPosts.length).toBeLessThanOrEqual(POSTS_DISPLAY_LATEST_MAX);
    });
  });

  describe('getAllPostsData()', () => {
    it('should return expected value', () => {
      const posts = getAllPostsData();

      expect(posts).toEqual(
        expect.arrayContaining([
          {
            id: expect.any(String),
            title: expect.any(String),
            category: expect.any(String),
            date: expect.any(String),
            excerpt: expect.any(String),
          },
        ])
      );

      // expect sorting is correct
      let minDate = Infinity;

      posts.forEach((post) => {
        const date = new Date(post.date).getTime();

        expect(date).toBeLessThanOrEqual(minDate);

        minDate = date;
      });
    });
  });

  describe('getAllPostIds()', () => {
    it('should return expected value', () => {
      const postIds = getAllPostIds();

      expect(postIds).toEqual(
        expect.arrayContaining([
          {
            params: {
              id: expect.any(String),
            },
          },
        ])
      );
    });
  });

  describe('getPostData()', () => {
    it('should return expected value', async () => {
      const postData = await getPostData('pre-rendering');

      expect(postData).toEqual({
        id: expect.any(String),
        title: expect.any(String),
        category: expect.any(String),
        date: expect.any(String),
        excerpt: expect.any(String),
        contentHtml: expect.any(String),
      });
    });
  });
});
