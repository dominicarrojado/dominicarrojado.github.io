import { render, screen } from '@testing-library/react';
import {
  getFakeDate,
  getFakeSentence,
  getFakeSentences,
  getFakeUuid,
  getFakeWord,
} from '../../lib/test-helpers';
import { Post } from '../../lib/types';
import PostItem from '../postItem';

describe('<PostItem />', () => {
  const post = {
    id: getFakeUuid(),
    title: getFakeSentence(),
    category: getFakeWord(),
    date: getFakeDate(),
    excerpt: getFakeSentences(),
  } as Post;

  beforeEach(() => {
    render(<PostItem post={post} />);
  });

  it('should have expected url', () => {
    const titleEl = screen.queryByText(post.title);
    const anchorEl = titleEl?.closest('a') as HTMLAnchorElement;

    expect(anchorEl).toHaveAttribute('href', `/posts/${post.id}`);
    expect(anchorEl).not.toHaveAttribute('rel');
    expect(anchorEl).not.toHaveAttribute('target');
  });

  it('should render the date', () => {
    const date = new Date(post.date);
    const formattedDate = `${getMonthName(
      date.getMonth()
    )} ${date.getDate()}, ${date.getFullYear()}`;

    expect(screen.queryByText(formattedDate)).toBeInTheDocument();
  });

  it('should render the category', () => {
    const categoryEl = screen.queryByText(post.category);

    expect(categoryEl).toBeInTheDocument();
  });

  it('should render the title', () => {
    const titleEl = screen.queryByText(post.title);

    expect(titleEl?.tagName).toBe('H3');
  });

  it('should render the excerpt', () => {
    const excerptEl = screen.queryByText(post.excerpt);

    expect(excerptEl?.tagName).toBe('P');
  });

  it('should render the button', () => {
    const btnEl = screen.queryByText('Read More');

    expect(btnEl?.tagName).toBe('BUTTON');
  });
});

function getMonthName(monthIdx: number) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return months[monthIdx];
}
