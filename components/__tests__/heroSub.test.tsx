import { render, screen } from '@testing-library/react';
import { getFakeSentence, getFakeSentences } from '@/lib/test-helpers';
import * as customHooks from '@/lib/custom-hooks';
import HeroSub, { Props } from '../heroSub';

jest.mock('@/lib/custom-hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/custom-hooks'),
}));

describe('<HeroSub />', () => {
  const renderComponent = (props: Props) => render(<HeroSub {...props} />);

  beforeEach(() => {
    // mock to prevent window.matchMedia not a func error
    jest.spyOn(customHooks, 'useScrollOpacityEffect').mockReturnValue(1);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('content', () => {
    const title = getFakeSentence();
    const description = getFakeSentences();

    beforeEach(() => {
      renderComponent({
        title,
        description,
      });
    });

    it('should have expected title', () => {
      const titleEl = screen.queryByText(title);

      expect(titleEl?.tagName).toBe('H1');
    });

    it('should have expected description', () => {
      const descEl = screen.queryByText(description);

      expect(descEl).toBeInTheDocument();
    });
  });
});
