import { render, screen } from '@testing-library/react';
import { getFakeSentence } from '@/lib/test-helpers';
import * as customHooks from '@/lib/custom-hooks';
import HeroSubDescription, { Props } from '../heroSubDescription';

jest.mock('@/lib/custom-hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/custom-hooks'),
}));

describe('<HeroSubDescription />', () => {
  const renderComponent = ({ children }: Props) =>
    render(<HeroSubDescription>{children}</HeroSubDescription>);

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

    const descEl = screen.queryByText(text);

    expect(descEl?.tagName).toBe('P');
  });

  it('should be hidden if NOT mounted', () => {
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(false);

    const text = getFakeSentence();

    renderComponent({ children: text });

    const descEl = screen.queryByText(text);

    expect(descEl).toHaveClass('opacity-0');
  });

  it('should NOT be hidden if mounted', () => {
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    const text = getFakeSentence();

    renderComponent({ children: text });

    const descEl = screen.queryByText(text);

    expect(descEl).not.toHaveClass('opacity-0');
  });
});
