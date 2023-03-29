import { render } from '@testing-library/react';
import * as customHooks from '../../lib/custom-hooks';
import HeroBackground from '../heroBackground';

describe('<HeroBackground />', () => {
  const renderComponent = () => render(<HeroBackground />);

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be hidden if window NOT loaded', () => {
    jest.spyOn(customHooks, 'useWindowLoaded').mockReturnValue(false);

    const { container } = renderComponent();

    const containerEl = container.firstElementChild;

    expect(containerEl).toHaveClass('opacity-0');
  });

  it('should NOT be hidden if window loaded', () => {
    jest.spyOn(customHooks, 'useWindowLoaded').mockReturnValue(true);

    const { container } = renderComponent();

    const containerEl = container.firstElementChild;

    expect(containerEl).not.toHaveClass('opacity-0');
  });
});
