import { render, screen } from '@testing-library/react';
import { getFakeSentence } from '@/lib/test-helpers';
import * as customHooks from '@/lib/custom-hooks';
import HeroSubTitle, { Props } from '../heroSubTitle';

jest.mock('@/lib/custom-hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/custom-hooks'),
}));

describe('<HeroSubTitle />', () => {
  const renderComponent = ({ children }: Props) =>
    render(<HeroSubTitle>{children}</HeroSubTitle>);

  beforeEach(() => {
    // mock to prevent window.matchMedia not a func error
    jest.spyOn(customHooks, 'useScrollOpacityEffect').mockReturnValue(1);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render children', () => {
    const text = getFakeSentence();

    renderComponent({ children: text });

    const titleEl = screen.queryByText(text);

    expect(titleEl?.tagName).toBe('H1');
  });

  it('should be hidden if NOT mounted', () => {
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(false);

    const text = getFakeSentence();

    renderComponent({ children: text });

    const titleEl = screen.queryByText(text);

    expect(titleEl).toHaveClass('opacity-0');
  });

  it('should NOT be hidden if mounted', () => {
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    const text = getFakeSentence();

    renderComponent({ children: text });

    const titleEl = screen.queryByText(text);

    expect(titleEl).not.toHaveClass('opacity-0');
  });
});
