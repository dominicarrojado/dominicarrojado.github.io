import {
  getFakeDate,
  getFakeNumber,
  getFakeSentence,
  getFakeSentences,
  getFakeUrl,
  getFakeUuid,
  getFakeWord,
  getRandomPostId,
} from '../test-helpers';
import { Post } from '../types';
import {
  getAdjacentPosts,
  getAllPostIds,
  getAllPostPages,
  getAllPostsData,
  getAllPostsLastPage,
  getPostData,
} from '../posts';

describe('posts utilities', () => {
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
            videoUrl: expect.any(String),
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

  describe('getAllPostsLastPage()', () => {
    it('should return expected value', () => {
      const lastPage = getAllPostsLastPage();

      expect(typeof lastPage).toBe('number');
      expect(lastPage).toBeGreaterThan(0);
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

  describe('getAllPostPages()', () => {
    it('should return expected value', () => {
      const postPages = getAllPostPages();

      expect(postPages).toEqual(
        expect.arrayContaining([
          {
            params: {
              number: expect.any(String),
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
          videoUrl: expect.any(String),
          content: expect.any(String),
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
            videoUrl: expect.any(String),
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
          videoUrl: getFakeUrl(),
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
          videoUrl: getFakeUrl(),
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
          videoUrl: getFakeUrl(),
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
