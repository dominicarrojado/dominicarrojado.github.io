import { act, render, screen } from '@testing-library/react';
import * as customHooks from '@/lib/custom-hooks';
import { QUOTES } from '@/lib/constants';
import QuoteItems from '../quoteItems';

jest.mock('@/lib/custom-hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/custom-hooks'),
}));
jest.useFakeTimers();

describe('<QuoteItems />', () => {
  const renderComponent = () => render(<QuoteItems />);

  beforeEach(() => {
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    renderComponent();
  });

  it('should display first quote on mount', () => {
    QUOTES.forEach((item, idx) => {
      const quoteEl = screen.queryByText(`“${item.quote}”`);
      const containerEl = quoteEl?.closest('li');

      if (idx !== 0) {
        expect(containerEl).toHaveClass('opacity-0');
      } else {
        expect(containerEl).not.toHaveClass('opacity-0');
      }
    });
  });

  it('should display next quote on interval', () => {
    act(() => {
      jest.runOnlyPendingTimers();
    });

    QUOTES.forEach((item, idx) => {
      const quoteEl = screen.queryByText(`“${item.quote}”`);
      const containerEl = quoteEl?.closest('li');

      if (idx !== 1) {
        expect(containerEl).toHaveClass('opacity-0');
      } else {
        expect(containerEl).not.toHaveClass('opacity-0');
      }
    });
  });

  it('should display first quote after last quote', () => {
    act(() => {
      QUOTES.forEach(() => {
        jest.runOnlyPendingTimers();
      });
    });

    QUOTES.forEach((item, idx) => {
      const quoteEl = screen.queryByText(`“${item.quote}”`);
      const containerEl = quoteEl?.closest('li');

      if (idx !== 0) {
        expect(containerEl).toHaveClass('opacity-0');
      } else {
        expect(containerEl).not.toHaveClass('opacity-0');
      }
    });
  });
});
