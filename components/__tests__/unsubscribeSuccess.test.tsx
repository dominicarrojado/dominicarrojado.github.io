import { render, screen } from '@testing-library/react';
import * as customHooks from '@/lib/custom-hooks';
import UnsubscribeSuccess from '../unsubscribeSuccess';

jest.mock('@/lib/custom-hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/custom-hooks'),
}));

describe('<UnsubscribeSuccess />', () => {
  const renderComponent = () => render(<UnsubscribeSuccess />);

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('content', () => {
    beforeEach(() => {
      jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

      renderComponent();
    });

    it('should have expected title', () => {
      const titleEl = screen.queryByText('Unsubscribed');

      expect(titleEl?.tagName).toBe('H5');
    });

    it('should have expected description', () => {
      const titleEl = screen.queryByText(
        "You have been successfully unsubscribed from my tech blog. I'm sorry to see you go, but I appreciate your time and interest in my content. If you change your mind and would like to resubscribe in the future, please don't hesitate to do so. Thank you!"
      );

      expect(titleEl?.tagName).toBe('P');
    });
  });
});
