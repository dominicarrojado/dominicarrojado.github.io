import { render } from '@testing-library/react';
import * as customHooks from '@/lib/custom-hooks';
import HeroBackground from '../heroBackground';

jest.mock('@/lib/custom-hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/custom-hooks'),
}));

describe('<HeroBackground />', () => {
  const renderComponent = () => render(<HeroBackground />);

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be hidden if NOT mounted', () => {
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(false);

    const { container } = renderComponent();

    const containerEl = container.firstElementChild;

    expect(containerEl).toHaveClass('opacity-0');
  });

  it('should NOT be hidden if mounted', () => {
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    const { container } = renderComponent();

    const containerEl = container.firstElementChild;

    expect(containerEl).not.toHaveClass('opacity-0');
  });
});
