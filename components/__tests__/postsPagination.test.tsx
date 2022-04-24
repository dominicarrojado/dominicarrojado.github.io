import { render, screen } from '@testing-library/react';
import { getFakeNumber } from '../../lib/test-helpers';
import { PAGINATION_MAX_LENGTH } from '../../lib/constants';
import PostsPagination, { Props } from '../postsPagination';

describe('<PostsPagination />', () => {
  const renderComponent = (props: Props) => {
    return render(<PostsPagination {...props} />);
  };
  const verifyPaginationItems = (paginationItems: Array<number>) => {
    paginationItems.forEach((pageNumber) => {
      const anchorEl = screen.queryByText(pageNumber);

      expect(anchorEl?.tagName).toBe('A');
      expect(anchorEl).toHaveAttribute('href', `/posts/page/${pageNumber}`);
      expect(anchorEl).not.toHaveAttribute('target');
      expect(anchorEl).not.toHaveAttribute('rel');
    });
  };
  const verifyPaginationArrow = (
    text: 'Previous' | 'Next',
    pageNumber: number
  ) => {
    const spanEl = screen.queryByText(text) as HTMLDivElement;
    const anchorEl = spanEl.parentElement;

    expect(anchorEl?.tagName).toBe('A');
    expect(anchorEl).toHaveAttribute('href', `/posts/page/${pageNumber}`);
    expect(anchorEl).not.toHaveAttribute('target');
    expect(anchorEl).not.toHaveAttribute('rel');
  };

  it('should handle pagination less than max', () => {
    const lastPage = getFakeNumber({
      min: 1,
      max: PAGINATION_MAX_LENGTH - 1,
    });
    const currentPage = getFakeNumber({ min: 1, max: lastPage });

    renderComponent({ currentPage, lastPage });

    const paginationItems = [];

    for (let i = 1; i <= lastPage; i++) {
      paginationItems.push(i);
    }

    verifyPaginationItems(paginationItems);

    const ellipsisEl = screen.queryByText('...');

    expect(ellipsisEl).not.toBeInTheDocument();
  });

  it('should handle pagination equal to max', () => {
    const lastPage = PAGINATION_MAX_LENGTH;
    const currentPage = getFakeNumber({ min: 1, max: lastPage });

    renderComponent({ currentPage, lastPage });

    const paginationItems = [];

    for (let i = 1; i <= lastPage; i++) {
      paginationItems.push(i);
    }

    verifyPaginationItems(paginationItems);

    const ellipsisEl = screen.queryByText('...');

    expect(ellipsisEl).not.toBeInTheDocument();
  });

  it('should handle current page in the front', () => {
    const lastPage = getFakeNumber({ min: PAGINATION_MAX_LENGTH + 1 });
    const currentPage = 1;

    renderComponent({ currentPage, lastPage });

    verifyPaginationItems([1, 2, 3, 4, 5, lastPage]);

    const ellipsisEl = screen.queryByText('...');

    expect(ellipsisEl?.tagName).toBe('SPAN');

    const previousEl = screen.queryByText('Previous') as HTMLDivElement;
    const previousAnchorEl = previousEl.parentElement;

    expect(previousAnchorEl?.tagName).toBe('SPAN');

    verifyPaginationArrow('Next', currentPage + 1);
  });

  it('should handle current page in the rear', () => {
    const lastPage = getFakeNumber({ min: PAGINATION_MAX_LENGTH + 1 });
    const currentPage = lastPage;

    renderComponent({ currentPage, lastPage });

    const paginationItems = [lastPage];

    for (let i = lastPage - 1; i > lastPage - 5; i--) {
      paginationItems.unshift(i);
    }

    verifyPaginationItems([1, ...paginationItems]);

    const ellipsisEl = screen.queryByText('...');

    expect(ellipsisEl?.tagName).toBe('SPAN');

    const nextEl = screen.queryByText('Next') as HTMLDivElement;
    const nextAnchorEl = nextEl.parentElement;

    expect(nextAnchorEl?.tagName).toBe('SPAN');

    verifyPaginationArrow('Previous', currentPage - 1);
  });

  it('should handle current page in the middle', () => {
    const lastPage = getFakeNumber({ min: PAGINATION_MAX_LENGTH + 2 });
    const currentPage = 5;

    renderComponent({ currentPage, lastPage });

    verifyPaginationItems([1, 4, 5, 6, lastPage]);

    const ellipsisEls = screen.queryAllByText('...');

    expect(ellipsisEls).toHaveLength(2);

    ellipsisEls.forEach((ellipsisEl) => {
      expect(ellipsisEl.tagName).toBe('SPAN');
    });

    verifyPaginationArrow('Previous', currentPage - 1);
    verifyPaginationArrow('Next', currentPage + 1);
  });
});
