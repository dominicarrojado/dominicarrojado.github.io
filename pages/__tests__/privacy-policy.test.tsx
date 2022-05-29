import { render } from '@testing-library/react';
import * as customHooks from '../../lib/custom-hooks';
import * as HeroSub from '../../components/heroSub';
import * as PrivacyPolicySection from '../../components/privacyPolicySection';
import PrivacyPolicy from '../privacy-policy.page';

describe('<PrivacyPolicy />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render expected components', async () => {
    // mock for HeroMain/HeroSub component (prevent re-render & window.matchMedia not a func)
    jest.spyOn(customHooks, 'useScrollOpacityEffect').mockReturnValue(1);
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    const heroSubSpy = jest.spyOn(HeroSub, 'default');
    const privacyPolicySectionSpy = jest.spyOn(PrivacyPolicySection, 'default');

    render(<PrivacyPolicy />);

    expect(heroSubSpy).toBeCalledTimes(1);
    expect(heroSubSpy).toBeCalledWith(
      {
        title: 'Privacy Policy',
        description: 'Find what you need to know about your privacy',
      },
      {}
    );

    expect(privacyPolicySectionSpy).toBeCalledTimes(1);
  });
});
