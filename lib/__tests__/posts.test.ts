import { POSTS_DISPLAY_LATEST_MAX } from '../constants';
import {
  getAllPostIds,
  getLatestPostsData,
  getPostData,
  getSortedPostsData,
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

      let minDate = Infinity;

      latestPosts.forEach((post) => {
        const date = new Date(post.date).getTime();

        expect(date).toBeLessThanOrEqual(minDate);

        minDate = date;
      });
    });
  });

  describe('getSortedPostsData()', () => {
    it('should return expected value', () => {
      const sortedPosts = getSortedPostsData();

      expect(sortedPosts).toEqual(
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

      let minDate = Infinity;

      sortedPosts.forEach((post) => {
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
