import { render } from '@testing-library/react';
import * as customHooks from '../../lib/custom-hooks';
import * as SeoTags from '../../components/seoTags';
import * as HeroSub from '../../components/heroSub';
import * as PrivacyPolicySection from '../../components/privacyPolicySection';
import PrivacyPolicy from '../privacy-policy.page';

describe('<PrivacyPolicy />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render expected components', async () => {
    // mock to prevent re-render of hero section
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    const seoTagsSpy = jest.spyOn(SeoTags, 'default');
    const heroSubSpy = jest.spyOn(HeroSub, 'default');
    const privacyPolicySectionSpy = jest.spyOn(PrivacyPolicySection, 'default');

    render(<PrivacyPolicy />);

    const title = 'Privacy Policy';
    const desc = 'Find what you need to know about your privacy';

    expect(seoTagsSpy).toBeCalledTimes(1);
    expect(seoTagsSpy).toBeCalledWith(
      {
        title,
        path: '/privacy-policy',
        description: desc,
      },
      {}
    );

    expect(heroSubSpy).toBeCalledTimes(1);
    expect(heroSubSpy).toBeCalledWith({ title, description: desc }, {});

    expect(privacyPolicySectionSpy).toBeCalledTimes(1);
  });
});