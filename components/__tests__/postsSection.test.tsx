import { render, screen, act, fireEvent } from '@testing-library/react';
import {
  getFakeDate,
  getFakeNumber,
  getFakeSentence,
  getFakeSentences,
  getFakeUrl,
  getFakeUuid,
  getFakeWord,
} from '../../lib/test-helpers';
import Window from '../../modules/Window';
import * as PostItem from '../postItem';
import * as PostsPagination from '../postsPagination';
import { Post } from '../../lib/types';
import { POSTS_PER_PAGE } from '../../lib/constants';
import PostsSection, { Props } from '../postsSection';

describe('<PostsSection />', () => {
  const renderComponent = (props: Props) => {
    render(<PostsSection {...props} />);
  };

  it('should render expected components', () => {
    const postItemSpy = jest.spyOn(PostItem, 'default');
    const postsPaginationSpy = jest.spyOn(PostsPagination, 'default');

    const currentPage = 1;
    const lastPage = getFakeNumber({ max: POSTS_PER_PAGE });
    const posts = createPosts(getFakeNumber({ min: 1, max: POSTS_PER_PAGE }));

    renderComponent({ posts, currentPage, lastPage });

    expect(postItemSpy).toBeCalledTimes(posts.length);

    posts.forEach((post, idx) => {
      expect(postItemSpy).toHaveBeenNthCalledWith(
        idx + 1,
        expect.objectContaining({
          post,
          headingLevel: 2,
        }),
        {}
      );
    });

    expect(postsPaginationSpy).toBeCalledTimes(1);
  });

  it('should NOT display all posts by default', () => {
    const currentPage = 1;
    const lastPage = getFakeNumber({ max: POSTS_PER_PAGE });
    const posts = createPosts(getFakeNumber({ min: 1, max: POSTS_PER_PAGE }));

    renderComponent({ posts, currentPage, lastPage });

    const postsListEl = screen.queryByTestId('posts-list') as HTMLUListElement;
    const postItemEls = postsListEl.childNodes;

    postItemEls.forEach((postItemEl) => {
      expect(postItemEl).toHaveClass('opacity-0');
    });
  });

  it('should display all posts on window load', () => {
    const currentPage = 1;
    const lastPage = getFakeNumber({ max: POSTS_PER_PAGE });
    const posts = createPosts(getFakeNumber({ min: 1, max: POSTS_PER_PAGE }));

    renderComponent({ posts, currentPage, lastPage });

    act(() => {
      Window.emit('load');
    });

    const postsListEl = screen.queryByTestId('posts-list') as HTMLUListElement;
    const postItemEls = postsListEl.childNodes;

    postItemEls.forEach((postItemEl) => {
      expect(postItemEl).not.toHaveClass('opacity-0');
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
      videoUrl: getFakeUrl(),
    } as Post);
  }

  return posts;
}
