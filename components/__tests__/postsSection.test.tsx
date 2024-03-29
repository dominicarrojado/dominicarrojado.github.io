import { render, screen } from '@testing-library/react';
import {
  getFakeDate,
  getFakeNumber,
  getFakeSentence,
  getFakeSentences,
  getFakeUrl,
  getFakeUuid,
  getFakeWord,
} from '@/lib/test-helpers';
import * as customHooks from '@/lib/custom-hooks';
import * as PostItem from '../postItem';
import * as PostsPagination from '../postsPagination';
import { Post } from '@/lib/types';
import { POSTS_PER_PAGE } from '@/lib/constants';
import PostsSection, { Props } from '../postsSection';

jest.mock('@/lib/custom-hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/custom-hooks'),
}));
jest.mock('../postItem', () => ({
  __esModule: true,
  ...jest.requireActual('../postItem'),
}));
jest.mock('../postsPagination', () => ({
  __esModule: true,
  ...jest.requireActual('../postsPagination'),
}));

describe('<PostsSection />', () => {
  const renderComponent = (props: Props) => {
    // mock to prevent re-render
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    return render(<PostsSection {...props} />);
  };
  const createPosts = (count: number) => {
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
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

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

  it('should display all posts on mount', () => {
    const currentPage = 1;
    const lastPage = getFakeNumber({ max: POSTS_PER_PAGE });
    const posts = createPosts(getFakeNumber({ min: 1, max: POSTS_PER_PAGE }));

    renderComponent({ posts, currentPage, lastPage });

    const postsListEl = screen.queryByTestId('posts-list') as HTMLUListElement;
    const postItemEls = postsListEl.childNodes;

    postItemEls.forEach((postItemEl) => {
      expect(postItemEl).not.toHaveClass('opacity-0');
    });
  });
});
