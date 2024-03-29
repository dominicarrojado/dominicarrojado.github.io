import { render, screen } from '@testing-library/react';
import {
  getFakeDate,
  getFakeSentence,
  getFakeSentences,
  getFakeUrl,
  getFakeUuid,
  getFakeWord,
} from '@/lib/test-helpers';
import * as PostItem from '../postItem';
import { Post } from '@/lib/types';
import PostsHomeSection from '../postsHomeSection';

jest.mock('../postItem', () => ({
  __esModule: true,
  ...jest.requireActual('../postItem'),
}));

describe('<PostsHomeSection />', () => {
  const latestPosts = [
    {
      id: getFakeUuid(),
      title: getFakeSentence(),
      category: getFakeWord(),
      date: getFakeDate(),
      excerpt: getFakeSentences(),
      videoUrl: getFakeUrl(),
    },
    {
      id: getFakeUuid(),
      title: getFakeSentence(),
      category: getFakeWord(),
      date: getFakeDate(),
      excerpt: getFakeSentences(),
      videoUrl: getFakeUrl(),
    },
  ] as Array<Post>;
  const renderComponent = () => {
    render(<PostsHomeSection latestPosts={latestPosts} />);
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should have expected title', () => {
    renderComponent();

    const titleEl = screen.queryByText('Blog');

    expect(titleEl?.tagName).toBe('H2');
  });

  it('should have expected content', () => {
    renderComponent();

    const content =
      'A place to share my knowledge and learnings from my web development experiences.';

    expect(screen.queryByText(content)).toBeInTheDocument();
  });

  it('should display latest posts', () => {
    const postItemSpy = jest.spyOn(PostItem, 'default');

    renderComponent();

    expect(postItemSpy).toBeCalledTimes(latestPosts.length);

    latestPosts.forEach((post, idx) => {
      expect(postItemSpy).toHaveBeenNthCalledWith(
        idx + 1,
        expect.objectContaining({ post, headingLevel: 3 }),
        {}
      );
    });
  });

  it('should have expected anchor', () => {
    renderComponent();

    const anchorEl = screen.queryByText('See More Posts');

    expect(anchorEl?.tagName).toBe('A');
    expect(anchorEl).toHaveAttribute('href', '/posts/page/2/');
    expect(anchorEl).not.toHaveAttribute('rel');
    expect(anchorEl).not.toHaveAttribute('target');
  });
});
