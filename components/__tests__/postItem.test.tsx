import { CSSProperties } from 'react';
import { render, screen } from '@testing-library/react';
import {
  getFakeDate,
  getFakeNumber,
  getFakeSentence,
  getFakeSentences,
  getFakeUrl,
  getFakeUuid,
  getFakeWord,
  getMonthName,
} from '@/lib/test-helpers';
import { Post } from '@/lib/types';
import PostItem from '../postItem';

describe('<PostItem />', () => {
  const post = {
    id: getFakeUuid(),
    title: getFakeSentence(),
    category: getFakeWord(),
    date: getFakeDate(),
    excerpt: getFakeSentences(),
    videoUrl: getFakeUrl(),
  } as Post;
  const getRandomHeadingLevel = () =>
    getFakeNumber({ min: 2, max: 3 }) as 2 | 3;
  const renderComponent = (props: {
    headingLevel: 2 | 3;
    className?: string;
    style?: CSSProperties;
    anchorClassName?: string;
  }) => {
    render(<PostItem post={post} {...props} />);
  };

  describe('content', () => {
    beforeEach(() => {
      renderComponent({ headingLevel: getRandomHeadingLevel() });
    });

    it('should have expected url', () => {
      const titleEl = screen.queryByText(post.title);
      const anchorEl = titleEl?.closest('a') as HTMLAnchorElement;

      expect(anchorEl).toHaveAttribute('href', `/posts/${post.id}/`);
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

      expect(titleEl).toBeInTheDocument();
    });

    it('should render the excerpt', () => {
      const excerptEl = screen.queryByText(post.excerpt);

      expect(excerptEl?.tagName).toBe('P');
    });

    it('should render the button as span', () => {
      const btnEl = screen.queryByText('Read Post');

      expect(btnEl?.tagName).toBe('SPAN');
    });
  });

  describe('other props', () => {
    describe('headingLevel prop', () => {
      it('should have expected heading tag for level 2', () => {
        renderComponent({ headingLevel: 2 });

        const titleEl = screen.queryByText(post.title);

        expect(titleEl?.tagName).toBe('H2');
      });

      it('should have expected heading tag for level 3', () => {
        renderComponent({ headingLevel: 3 });

        const titleEl = screen.queryByText(post.title);

        expect(titleEl?.tagName).toBe('H3');
      });
    });

    it('should accept className prop', () => {
      const className = getFakeWord();

      renderComponent({ className, headingLevel: getRandomHeadingLevel() });

      const titleEl = screen.queryByText(post.title);
      const listEl = titleEl?.closest('li') as HTMLLIElement;

      expect(listEl).toHaveClass(className);
    });

    it('should accept style prop', () => {
      const style = {
        width: `${getFakeNumber()}px`,
        height: `${getFakeNumber()}px`,
      };

      renderComponent({ style, headingLevel: getRandomHeadingLevel() });

      const titleEl = screen.queryByText(post.title);
      const listEl = titleEl?.closest('li') as HTMLLIElement;

      expect(listEl).toHaveStyle(style);
    });

    it('should accept anchorClassName prop', () => {
      const anchorClassName = getFakeWord();

      renderComponent({
        anchorClassName,
        headingLevel: getRandomHeadingLevel(),
      });

      const titleEl = screen.queryByText(post.title);
      const anchorEl = titleEl?.closest('a') as HTMLAnchorElement;

      expect(anchorEl).toHaveClass(anchorClassName);
    });
  });
});
