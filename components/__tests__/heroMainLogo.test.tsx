import { render, screen, waitFor } from '@testing-library/react';
import * as customHooks from '@/lib/custom-hooks';
import * as HeroMainLogoPart from '../heroMainLogoPart';
import HeroMainLogo from '../heroMainLogo';

jest.mock('@/lib/custom-hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/custom-hooks'),
}));
jest.mock('../heroMainLogoPart', () => ({
  __esModule: true,
  ...jest.requireActual('../heroMainLogoPart'),
}));

describe('<HeroMainLogo />', () => {
  const renderComponent = () => render(<HeroMainLogo />);

  beforeEach(() => {
    // mock to prevent window.matchMedia not a func error
    jest.spyOn(customHooks, 'useScrollOpacityEffect').mockReturnValue(1);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should have expected children', () => {
    const heroMainLogoPartSpy = jest.spyOn(HeroMainLogoPart, 'default');

    renderComponent();

    expect(heroMainLogoPartSpy).toBeCalledTimes(2);
    expect(heroMainLogoPartSpy).toHaveBeenNthCalledWith(
      1,
      { isLeft: true },
      {}
    );
    expect(heroMainLogoPartSpy).toHaveBeenNthCalledWith(2, {}, {});
  });

  it('should be hidden if NOT mounted', () => {
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(false);

    renderComponent();

    const logoEl = screen.queryByLabelText('Dominic Arrojado logo');

    expect(logoEl).toHaveClass('opacity-0');
  });

  it('should NOT be hidden if mounted', () => {
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    renderComponent();

    const logoEl = screen.queryByLabelText('Dominic Arrojado logo');

    return waitFor(() => expect(logoEl).not.toHaveClass('opacity-0'));
  });
});
