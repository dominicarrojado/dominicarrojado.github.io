import { act, render, screen } from '@testing-library/react';
import { getFakeNumber } from '../../lib/test-helpers';
import Window from '../../modules/Window';
import * as customHooks from '../../lib/custom-hooks';
import PostsPagination, { Props } from '../postsPagination';

describe('<PostsPagination />', () => {
  const renderComponent = (props: Props) => {
    // mock to prevent re-render
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    return render(<PostsPagination {...props} />);
  };
  const verifyPaginationItems = (
    pageNums: Array<{
      text: string;
      page: number | undefined;
    }>,
    currentPage: number
  ) => {
    const navEl = screen.queryByLabelText('Pagination');
    const navListEl = navEl?.firstElementChild;

    expect(navListEl?.childElementCount).toBe(pageNums.length);

    pageNums.forEach((pageItem, idx) => {
      const listEl = navListEl?.childNodes[idx];
      const anchorEl = listEl?.firstChild as HTMLElement;

      expect(anchorEl).toHaveTextContent(pageItem.text);

      if (pageItem.page) {
        expect(anchorEl.tagName).toBe('A');
        expect(anchorEl).toHaveAttribute(
          'href',
          `/posts/page/${pageItem.page}`
        );
        expect(anchorEl).not.toHaveAttribute('target');
        expect(anchorEl).not.toHaveAttribute('rel');
      } else {
        expect(anchorEl.tagName).toBe('SPAN');
      }

      if (pageItem.page === currentPage) {
        expect(anchorEl).toHaveAttribute('aria-current', 'page');
      } else {
        expect(anchorEl).not.toHaveAttribute('aria-current');
      }
    });
  };

  it('should handle "previous" disabled', () => {
    const currentPage = 1;

    renderComponent({
      currentPage,
      lastPage: 5,
    });

    verifyPaginationItems(
      [
        { text: 'Previous', page: undefined },
        { text: '1', page: 1 },
        { text: '2', page: 2 },
        { text: '3', page: 3 },
        { text: '4', page: 4 },
        { text: '5', page: 5 },
        { text: 'Next', page: 2 },
      ],
      currentPage
    );
  });

  it('should handle "next" disabled', () => {
    const currentPage = 5;

    renderComponent({
      currentPage,
      lastPage: 5,
    });

    verifyPaginationItems(
      [
        { text: 'Previous', page: 4 },
        { text: '1', page: 1 },
        { text: '2', page: 2 },
        { text: '3', page: 3 },
        { text: '4', page: 4 },
        { text: '5', page: 5 },
        { text: 'Next', page: undefined },
      ],
      currentPage
    );
  });

  it('should render ellipsis', () => {
    const currentPage = 5;

    renderComponent({
      currentPage,
      lastPage: 10,
    });

    verifyPaginationItems(
      [
        { text: 'Previous', page: 4 },
        { text: '1', page: 1 },
        { text: '...', page: undefined },
        { text: '4', page: 4 },
        { text: '5', page: 5 },
        { text: '6', page: 6 },
        { text: '...', page: undefined },
        { text: '10', page: 10 },
        { text: 'Next', page: 6 },
      ],
      currentPage
    );
  });

  it('should display on mount', () => {
    const lastPage = getFakeNumber({ min: 1 });
    const currentPage = getFakeNumber({ min: 1, max: lastPage });

    renderComponent({
      currentPage,
      lastPage,
    });

    act(() => {
      Window.emit('load');
    });

    const navigationEl = screen.queryByLabelText('Pagination');

    expect(navigationEl).not.toHaveClass('opacity-0');
  });
});
