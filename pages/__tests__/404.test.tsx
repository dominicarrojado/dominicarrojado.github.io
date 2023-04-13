import { render } from '@testing-library/react';
import * as customHooks from '@/lib/custom-hooks';
import * as HeroSub from '@/components/heroSub';
import Custom404 from '../404.page';

jest.mock('@/lib/custom-hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/custom-hooks'),
}));
jest.mock('@/components/heroSub', () => ({
  __esModule: true,
  ...jest.requireActual('@/components/heroSub'),
}));

describe('<Custom404 />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render expected components', async () => {
    // mock for HeroMain/HeroSub component (prevent re-render & window.matchMedia not a func)
    jest.spyOn(customHooks, 'useScrollOpacityEffect').mockReturnValue(1);
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    const heroSubSpy = jest.spyOn(HeroSub, 'default');

    render(<Custom404 />);

    expect(heroSubSpy).toBeCalledTimes(1);
    expect(heroSubSpy).toBeCalledWith(
      {
        title: '404 - Page Not Found',
        description:
          "Sorry, we couldn't find what you're looking for. Please check the menu for existing pages.",
        isMinHeightFull: true,
      },
      {}
    );
  });
});
