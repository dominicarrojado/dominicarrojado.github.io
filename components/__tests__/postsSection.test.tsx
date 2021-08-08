import { render, screen, act, fireEvent } from '@testing-library/react';
import {
  getFakeDate,
  getFakeNumber,
  getFakeSentence,
  getFakeSentences,
  getFakeUuid,
  getFakeWord,
} from '../../lib/test-helpers';
import Window from '../../modules/Window';
import * as PostItem from '../postItem';
import { Post } from '../../lib/types';
import { POSTS_DISPLAY_LATEST_MAX } from '../../lib/constants';
import PostsSection from '../postsSection';

describe('<PostsSection />', () => {
  const renderComponent = (posts: Array<Post>) => {
    render(<PostsSection posts={posts} />);
  };

  describe('posts less than max', () => {
    const posts = createPosts(
      getFakeNumber({ min: 1, max: POSTS_DISPLAY_LATEST_MAX - 1 })
    );

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should render all posts', () => {
      const postItemSpy = jest.spyOn(PostItem, 'default');

      renderComponent(posts);

      expect(postItemSpy).toBeCalledTimes(posts.length);

      posts.forEach((post, idx) => {
        expect(postItemSpy).toHaveBeenNthCalledWith(
          idx + 1,
          expect.objectContaining({
            post,
          }),
          {}
        );
      });
    });

    it('should NOT display all posts by default', () => {
      renderComponent(posts);

      const postsListEl = screen.queryByTestId(
        'posts-list'
      ) as HTMLUListElement;
      const postItemEls = postsListEl.childNodes;

      postItemEls.forEach((postItemEl) => {
        expect(postItemEl).toHaveClass('opacity-0');
      });
    });

    it('should display all posts on window load', () => {
      renderComponent(posts);

      act(() => {
        Window.emit('load');
      });

      const postsListEl = screen.queryByTestId(
        'posts-list'
      ) as HTMLUListElement;
      const postItemEls = postsListEl.childNodes;

      postItemEls.forEach((postItemEl) => {
        expect(postItemEl).not.toHaveClass('opacity-0');
      });
    });

    it('should NOT display show all button', () => {
      const btnEl = screen.queryByText('Show All Posts');

      expect(btnEl).not.toBeInTheDocument();
    });
  });

  describe('posts more than max', () => {
    const posts = createPosts(
      getFakeNumber({ min: POSTS_DISPLAY_LATEST_MAX + 1, max: 10 })
    );

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should render all posts', () => {
      const postItemSpy = jest.spyOn(PostItem, 'default');

      renderComponent(posts);

      expect(postItemSpy).toBeCalledTimes(posts.length);

      posts.forEach((post, idx) => {
        expect(postItemSpy).toHaveBeenNthCalledWith(
          idx + 1,
          expect.objectContaining({
            post,
          }),
          {}
        );
      });
    });

    it('should NOT display all posts by default', () => {
      renderComponent(posts);

      const postsListEl = screen.queryByTestId(
        'posts-list'
      ) as HTMLUListElement;
      const postItemEls = postsListEl.childNodes;

      postItemEls.forEach((postItemEl) => {
        expect(postItemEl).toHaveClass('opacity-0');
      });
    });

    it('should display latest posts on window load', () => {
      renderComponent(posts);

      act(() => {
        Window.emit('load');
      });

      const postsListEl = screen.queryByTestId(
        'posts-list'
      ) as HTMLUListElement;
      const postItemEls = postsListEl.childNodes;

      postItemEls.forEach((postItemEl, idx) => {
        if (idx < POSTS_DISPLAY_LATEST_MAX) {
          expect(postItemEl).not.toHaveClass('opacity-0');
        } else {
          expect(postItemEl).toHaveClass('opacity-0');
        }
      });
    });

    it('should display all posts on click', () => {
      renderComponent(posts);

      act(() => {
        Window.emit('load');
      });

      const btnEl = screen.queryByText('Show All Posts') as HTMLButtonElement;

      fireEvent.click(btnEl);

      expect(btnEl).not.toBeInTheDocument();

      const postsListEl = screen.queryByTestId(
        'posts-list'
      ) as HTMLUListElement;
      const postItemEls = postsListEl.childNodes;

      postItemEls.forEach((postItemEl) => {
        expect(postItemEl).not.toHaveClass('opacity-0');
      });
    });
  });
});

function createPosts(count: number) {
  const posts = [];

  for (let i = 0; i < count; i++) {
    posts.push({
      id: getFakeUuid(),
      title: getFakeSentence(),
      category: getFakeWord(),
      date: getFakeDate(),
      excerpt: getFakeSentences(),
    } as Post);
  }

  return posts;
}
