import { render, screen } from '@testing-library/react';
import {
  getFakeDate,
  getFakeSentence,
  getFakeSentences,
  getFakeUuid,
  getFakeWord,
} from '../../lib/test-helpers';
import * as PostItem from '../postItem';
import { Post } from '../../lib/types';
import PostsSection from '../postsSection';

describe('<PostsSection />', () => {
  const latestPosts = [
    {
      id: getFakeUuid(),
      title: getFakeSentence(),
      category: getFakeWord(),
      date: getFakeDate(),
      excerpt: getFakeSentences(),
    },
    {
      id: getFakeUuid(),
      title: getFakeSentence(),
      category: getFakeWord(),
      date: getFakeDate(),
      excerpt: getFakeSentences(),
    },
  ] as Array<Post>;
  const renderComponent = () => {
    render(<PostsSection latestPosts={latestPosts} />);
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
      expect(postItemSpy).toHaveBeenNthCalledWith(idx + 1, { post }, {});
    });
  });

  it('should have expected anchor', () => {
    renderComponent();

    const anchorEl = screen.queryByText('See All Blog');

    expect(anchorEl?.tagName).toBe('A');
    expect(anchorEl).toHaveAttribute('href', '/posts');
    expect(anchorEl).not.toHaveAttribute('rel');
    expect(anchorEl).not.toHaveAttribute('target');
  });
});
