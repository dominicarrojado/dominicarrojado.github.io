import {
  getFakeDate,
  getFakeSentence,
  getFakeSentences,
  getFakeUuid,
  getFakeWord,
  getRandomPostId,
} from '../test-helpers';
import { Post } from '../types';
import { POSTS_DISPLAY_LATEST_MAX } from '../constants';
import {
  getAdjacentPosts,
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
            imageUrl: expect.any(String),
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
          imageUrl: expect.any(String),
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
          imageUrl: expect.any(String),
        } as Post);
      }

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
            imageUrl: expect.any(String),
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
      const postId = getRandomPostId();
      const postData = await getPostData(postId);

      expect(postData).toEqual(
        expect.objectContaining({
          id: postId,
          title: expect.any(String),
          category: expect.any(String),
          date: expect.any(String),
          excerpt: expect.any(String),
          imageUrl: expect.any(String),
          contentHtml: expect.any(String),
        })
      );

      const expectAdjacentPostData = (adjacentPostData: any) => {
        expect(adjacentPostData).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            category: expect.any(String),
            date: expect.any(String),
            excerpt: expect.any(String),
            imageUrl: expect.any(String),
          })
        );
        expect(adjacentPostData.id).not.toBe(postId);
      };

      const currentPostDate = new Date(postData.date).getTime();
      const previousPostData = postData.previousPost;

      if (previousPostData) {
        expectAdjacentPostData(previousPostData);

        const previousPostDate = new Date(previousPostData.date).getTime();

        expect(currentPostDate).toBeGreaterThanOrEqual(previousPostDate);
      } else {
        expect(previousPostData).toBeNull();
      }

      const nextPostData = postData.nextPost;

      if (nextPostData) {
        expectAdjacentPostData(nextPostData);

        const nextPostDate = new Date(nextPostData.date).getTime();

        expect(currentPostDate).toBeLessThanOrEqual(nextPostDate);
      } else {
        expect(nextPostData).toBeNull();
      }
    });
  });

  describe('getAdjacentPosts()', () => {
    it('should return previous and next post', () => {
      const sortedPosts = [];

      for (let i = 0; i < 3; i++) {
        sortedPosts.push({
          id: getFakeUuid(),
          title: getFakeSentence(),
          category: getFakeWord(),
          date: getFakeDate(),
          excerpt: getFakeSentences(),
          imageUrl: expect.any(String),
        } as Post);
      }

      const adjacentPostData = getAdjacentPosts(sortedPosts[1].id, sortedPosts);

      expect(adjacentPostData).toEqual({
        previousPost: sortedPosts[2],
        nextPost: sortedPosts[0],
      });
    });

    it('should return previous post only', () => {
      const sortedPosts = [];

      for (let i = 0; i < 3; i++) {
        sortedPosts.push({
          id: getFakeUuid(),
          title: getFakeSentence(),
          category: getFakeWord(),
          date: getFakeDate(),
          excerpt: getFakeSentences(),
          imageUrl: expect.any(String),
        } as Post);
      }

      const adjacentPostData = getAdjacentPosts(sortedPosts[0].id, sortedPosts);

      expect(adjacentPostData).toEqual({
        previousPost: sortedPosts[1],
        nextPost: null,
      });
    });

    it('should return next post only', () => {
      const sortedPosts = [];

      for (let i = 0; i < 3; i++) {
        sortedPosts.push({
          id: getFakeUuid(),
          title: getFakeSentence(),
          category: getFakeWord(),
          date: getFakeDate(),
          excerpt: getFakeSentences(),
          imageUrl: expect.any(String),
        } as Post);
      }

      const adjacentPostData = getAdjacentPosts(sortedPosts[2].id, sortedPosts);

      expect(adjacentPostData).toEqual({
        previousPost: null,
        nextPost: sortedPosts[1],
      });
    });
  });
});
