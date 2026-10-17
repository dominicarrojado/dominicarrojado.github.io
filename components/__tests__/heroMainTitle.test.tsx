import { render, screen } from '@testing-library/react';
import * as customHooks from '@/lib/custom-hooks';
import HeroMainTitle from '../heroMainTitle';

jest.mock('@/lib/custom-hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/custom-hooks'),
}));

describe('<HeroMainTitle />', () => {
  const renderComponent = () => render(<HeroMainTitle />);

  beforeEach(() => {
    // mock to prevent window.matchMedia not a func error
    jest.spyOn(customHooks, 'useScrollOpacityEffect').mockReturnValue(1);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render expected title', () => {
    renderComponent();

    const titleEl = screen.queryByText(
      'Guides, Tips and Tricks to Web Development'
    );

    expect(titleEl?.tagName).toBe('H1');
  });

  it('should be visible without waiting for mount and animate in', () => {
    renderComponent();

    const titleEl = screen.queryByText(
      'Guides, Tips and Tricks to Web Development'
    );

    expect(titleEl).not.toHaveClass('opacity-0');
    expect(titleEl).toHaveClass('motion-safe:animate-hero-title-in');
  });
});
