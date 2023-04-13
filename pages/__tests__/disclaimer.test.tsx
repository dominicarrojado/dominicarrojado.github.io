import { render } from '@testing-library/react';
import * as customHooks from '@/lib/custom-hooks';
import * as HeroSub from '@/components/heroSub';
import * as DisclaimerSection from '@/components/disclaimerSection';
import Disclaimer from '../disclaimer.page';

jest.mock('@/lib/custom-hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/custom-hooks'),
}));
jest.mock('@/components/heroSub', () => ({
  __esModule: true,
  ...jest.requireActual('@/components/heroSub'),
}));
jest.mock('@/components/disclaimerSection', () => ({
  __esModule: true,
  ...jest.requireActual('@/components/disclaimerSection'),
}));

describe('<Disclaimer />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render expected components', async () => {
    // mock for HeroMain/HeroSub component (prevent re-render & window.matchMedia not a func)
    jest.spyOn(customHooks, 'useScrollOpacityEffect').mockReturnValue(1);
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    const heroSubSpy = jest.spyOn(HeroSub, 'default');
    const disclaimerSectionSpy = jest.spyOn(DisclaimerSection, 'default');

    render(<Disclaimer />);

    expect(heroSubSpy).toBeCalledTimes(1);
    expect(heroSubSpy).toBeCalledWith(
      {
        title: 'Disclaimer',
        description:
          'Statements to specify or delimit the scope of rights and obligations',
      },
      {}
    );

    expect(disclaimerSectionSpy).toBeCalledTimes(1);
  });
});
