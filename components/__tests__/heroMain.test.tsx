import { render } from '@testing-library/react';
import * as customHooks from '@/lib/custom-hooks';
import * as HeroBackground from '../heroBackground';
import * as HeroMainLogo from '../heroMainLogo';
import * as ScrollDownButton from '../scrollDownButton';
import HeroMain from '../heroMain';

jest.mock('@/lib/custom-hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/custom-hooks'),
}));
jest.mock('../heroBackground', () => ({
  __esModule: true,
  ...jest.requireActual('../heroBackground'),
}));
jest.mock('../heroMainLogo', () => ({
  __esModule: true,
  ...jest.requireActual('../heroMainLogo'),
}));
jest.mock('../scrollDownButton', () => ({
  __esModule: true,
  ...jest.requireActual('../scrollDownButton'),
}));

describe('<HeroMain />', () => {
  const renderComponent = () => render(<HeroMain />);

  beforeEach(() => {
    // mock to prevent window.matchMedia not a func error
    jest.spyOn(customHooks, 'useScrollOpacityEffect').mockReturnValue(1);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render expected children', () => {
    const heroBackgroundSpy = jest.spyOn(HeroBackground, 'default');
    const heroMainLogoSpy = jest.spyOn(HeroMainLogo, 'default');
    const scrollDownButtonSpy = jest.spyOn(ScrollDownButton, 'default');

    renderComponent();

    expect(heroBackgroundSpy).toBeCalledTimes(1);
    expect(heroMainLogoSpy).toBeCalledTimes(1);
    expect(scrollDownButtonSpy).toBeCalledTimes(1);
  });
});
