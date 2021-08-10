import { render, screen, act } from '@testing-library/react';
import {
  fireEventTransitionEnd,
  getFakeDate,
  getFakeSentence,
  getFakeSentences,
  getFakeUuid,
  getFakeWord,
  getMonthName,
  queryByTextIgnoreHTML,
} from '../../lib/test-helpers';
import Window from '../../modules/Window';
import { Post, PostData } from '../../lib/types';
import PostContent from '../postContent';

describe('<PostContent />', () => {
  const renderComponent = ({ postData }: { postData: PostData }) => {
    render(<PostContent postData={postData} />);
  };

  describe('all props defined', () => {
    const postData = {
      id: getFakeUuid(),
      title: getFakeSentence(),
      category: getFakeWord(),
      date: getFakeDate(),
      excerpt: getFakeSentences(),
      contentHtml: `<p>${getFakeSentences()}</p>`,
      previousPost: {
        id: getFakeUuid(),
        title: getFakeSentence(),
        category: getFakeWord(),
        date: getFakeDate(),
        excerpt: getFakeSentences(),
      },
      nextPost: {
        id: getFakeUuid(),
        title: getFakeSentence(),
        category: getFakeWord(),
        date: getFakeDate(),
        excerpt: getFakeSentences(),
      },
    } as PostData & { previousPost: Post; nextPost: Post };

    beforeEach(() => {
      renderComponent({ postData });
    });

    it('should render the date', () => {
      const date = new Date(postData.date);
      const formattedDate = `${getMonthName(
        date.getMonth()
      )} ${date.getDate()}, ${date.getFullYear()}`;

      const dateEl = queryByTextIgnoreHTML(
        screen,
        `Last Updated: ${formattedDate}`
      );

      expect(dateEl).toBeInTheDocument();
    });

    it('should render the category', () => {
      const categoryEl = screen.queryByText(postData.category);

      expect(categoryEl).toBeInTheDocument();
    });

    it('should render the content', () => {
      const textContent = postData.contentHtml.replace(/<p>|\<\/p>/g, '');
      const contentEl = screen.queryByText(textContent);

      expect(contentEl).toBeInTheDocument();
    });

    it('should render the previous post anchor', () => {
      const { previousPost } = postData;
      const textEl = screen.queryByText(previousPost.title);
      const anchorEl = textEl?.closest('a');
      const helperEl = textEl?.nextElementSibling;

      expect(anchorEl).toHaveAttribute('href', `/posts/${previousPost.id}`);
      expect(anchorEl).not.toHaveAttribute('rel');
      expect(anchorEl).not.toHaveAttribute('target');
      expect(helperEl?.innerHTML).toBe('Previous Post');
    });

    it('should render the next post anchor', () => {
      const { nextPost } = postData;
      const textEl = screen.queryByText(nextPost.title);
      const anchorEl = textEl?.closest('a');
      const helperEl = textEl?.nextElementSibling;

      expect(anchorEl).toHaveAttribute('href', `/posts/${nextPost.id}`);
      expect(anchorEl).not.toHaveAttribute('rel');
      expect(anchorEl).not.toHaveAttribute('target');
      expect(helperEl?.innerHTML).toBe('Next Post');
    });

    it('should have expected anchor', () => {
      const anchorEl = screen.queryByText('See All Blog');

      expect(anchorEl?.tagName).toBe('A');
      expect(anchorEl).toHaveAttribute('href', '/posts');
      expect(anchorEl).not.toHaveAttribute('rel');
      expect(anchorEl).not.toHaveAttribute('target');
    });

    it('should NOT display content by default', () => {
      const contentEl = screen.queryByTestId('content');

      expect(contentEl).toHaveClass('opacity-0');
    });

    it('should display content on window load', () => {
      act(() => {
        Window.emit('load');
      });

      const contentEl = screen.queryByTestId('content');

      expect(contentEl).not.toHaveClass('opacity-0');
    });

    it('should have shorter delay by default', () => {
      act(() => {
        Window.emit('load');
      });

      const contentEl = screen.queryByTestId('content');

      expect(contentEl).toHaveClass('delay-1500');
      expect(contentEl).not.toHaveClass('delay-2500');
    });

    it('should have shorter animation delay by default', () => {
      act(() => {
        Window.emit('load');
      });

      const contentEl = screen.queryByTestId('content');

      expect(contentEl).toHaveClass('delay-1500');
      expect(contentEl).not.toHaveClass('delay-2500');
    });

    it('should have longer animation delay by default on transition end of opacity', () => {
      act(() => {
        Window.emit('load');
      });

      const contentEl = screen.queryByTestId('content') as HTMLElement;

      fireEventTransitionEnd(contentEl, 'opacity');

      expect(contentEl).toHaveClass('delay-2500');
      expect(contentEl).not.toHaveClass('delay-1500');
    });

    it('should have shorter animation delay on transition end of other prop name', () => {
      act(() => {
        Window.emit('load');
      });

      const contentEl = screen.queryByTestId('content') as HTMLElement;

      fireEventTransitionEnd(contentEl, getFakeWord());

      expect(contentEl).toHaveClass('delay-1500');
      expect(contentEl).not.toHaveClass('delay-2500');
    });
  });

  describe('previous post is null', () => {
    const postData = {
      id: getFakeUuid(),
      title: getFakeSentence(),
      category: getFakeWord(),
      date: getFakeDate(),
      excerpt: getFakeSentences(),
      contentHtml: `<p>${getFakeSentences()}</p>`,
      previousPost: null,
      nextPost: {
        id: getFakeUuid(),
        title: getFakeSentence(),
        category: getFakeWord(),
        date: getFakeDate(),
        excerpt: getFakeSentences(),
      },
    } as PostData & { nextPost: Post };

    beforeEach(() => {
      renderComponent({ postData });
    });

    it('should NOT render the previous post anchor', () => {
      const helperEl = screen.queryByText('Previous Post');

      expect(helperEl).not.toBeInTheDocument();
    });

    it('should render the next post anchor', () => {
      const nextPost = postData.nextPost;
      const textEl = screen.queryByText(nextPost.title);
      const anchorEl = textEl?.closest('a');
      const helperEl = textEl?.nextElementSibling;

      expect(anchorEl).toHaveAttribute('href', `/posts/${nextPost.id}`);
      expect(anchorEl).not.toHaveAttribute('rel');
      expect(anchorEl).not.toHaveAttribute('target');
      expect(helperEl?.innerHTML).toBe('Next Post');
    });
  });

  describe('next post is null', () => {
    const postData = {
      id: getFakeUuid(),
      title: getFakeSentence(),
      category: getFakeWord(),
      date: getFakeDate(),
      excerpt: getFakeSentences(),
      contentHtml: `<p>${getFakeSentences()}</p>`,
      previousPost: {
        id: getFakeUuid(),
        title: getFakeSentence(),
        category: getFakeWord(),
        date: getFakeDate(),
        excerpt: getFakeSentences(),
      },
      nextPost: null,
    } as PostData & { previousPost: Post };

    beforeEach(() => {
      renderComponent({ postData });
    });

    it('should render the previous post anchor', () => {
      const previousPost = postData.previousPost;
      const textEl = screen.queryByText(previousPost.title);
      const anchorEl = textEl?.closest('a');
      const helperEl = textEl?.nextElementSibling;

      expect(anchorEl).toHaveAttribute('href', `/posts/${previousPost.id}`);
      expect(anchorEl).not.toHaveAttribute('rel');
      expect(anchorEl).not.toHaveAttribute('target');
      expect(helperEl?.innerHTML).toBe('Previous Post');
    });

    it('should NOT render the next post anchor', () => {
      const helperEl = screen.queryByText('Next Post');

      expect(helperEl).not.toBeInTheDocument();
    });
  });
});