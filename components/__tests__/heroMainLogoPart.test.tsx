import { render, waitFor } from '@testing-library/react';
import * as customHooks from '@/lib/custom-hooks';
import HeroMainLogoPart, { Props } from '../heroMainLogoPart';

jest.mock('@/lib/custom-hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/custom-hooks'),
}));

describe('<HeroMainLogoPart />', () => {
  const renderComponent = (props: Props) =>
    render(<HeroMainLogoPart {...props} />);

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should have expected class if right', () => {
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(false);

    const { container } = renderComponent({ isLeft: false });

    const iconEl = container.firstElementChild;

    expect(iconEl).toHaveClass('-translate-x-3');
  });

  it('should have expected class if left', () => {
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(false);

    const { container } = renderComponent({ isLeft: true });

    const iconEl = container.firstElementChild;

    expect(iconEl).toHaveClass('translate-x-3');
  });

  it('should be hidden if NOT mounted', () => {
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(false);

    const { container } = renderComponent({});

    const iconEl = container.firstElementChild;

    expect(iconEl).toHaveClass('text-opacity-0');
  });

  it('should NOT be hidden if mounted', () => {
    const { container } = renderComponent({});

    const iconEl = container.firstElementChild;

    return waitFor(() => expect(iconEl).not.toHaveClass('text-opacity-0'));
  });
});
