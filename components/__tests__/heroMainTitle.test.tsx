import { render, screen } from '@testing-library/react';
import * as customHooks from '../../lib/custom-hooks';
import HeroMainTitle from '../heroMainTitle';

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

  it('should be hidden if NOT mounted', () => {
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(false);

    renderComponent();

    const titleEl = screen.queryByText(
      'Guides, Tips and Tricks to Web Development'
    );

    expect(titleEl).toHaveClass('opacity-0');
  });

  it('should NOT be hidden if mounted', () => {
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    renderComponent();

    const titleEl = screen.queryByText(
      'Guides, Tips and Tricks to Web Development'
    );

    expect(titleEl).not.toHaveClass('opacity-0');
  });
});
