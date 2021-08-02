import { render, screen } from '@testing-library/react';
import {
  getFakeDate,
  getFakeSentence,
  getFakeSentences,
  getFakeUuid,
  getFakeWord,
} from '../../lib/test-helpers';
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

  beforeEach(() => {
    render(<PostsSection latestPosts={latestPosts} />);
  });

  it('should have expected title', () => {
    const titleEl = screen.queryByText('Blog');

    expect(titleEl?.tagName).toBe('H2');
  });

  it('should have expected content', () => {
    const content =
      'A place to share my knowledge and learnings from my web development experiences.';

    expect(screen.queryByText(content)).toBeInTheDocument();
  });

  it('should display latest posts', () => {
    latestPosts.forEach((post) => {
      const titleEl = screen.queryByText(post.title);

      expect(titleEl).toBeInTheDocument();
    });
  });

  it('should have expected anchor', () => {
    const anchorEl = screen.queryByText('See All Blog');

    expect(anchorEl?.tagName).toBe('A');
    expect(anchorEl).toHaveAttribute('href', '/posts');
    expect(anchorEl).not.toHaveAttribute('rel');
    expect(anchorEl).not.toHaveAttribute('target');
  });
});
