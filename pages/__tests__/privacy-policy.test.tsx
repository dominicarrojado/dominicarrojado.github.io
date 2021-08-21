import { render } from '@testing-library/react';
import * as customHooks from '../../lib/custom-hooks';
import * as SeoTags from '../../components/seoTags';
import * as HeroSub from '../../components/heroSub';
import * as PrivacyPolicySection from '../../components/privacyPolicySection';
import PrivacyPolicy from '../privacy-policy';

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

    expect(seoTagsSpy).toBeCalledTimes(1);
    expect(seoTagsSpy).toBeCalledWith(
      {
        path: '/privacy-policy',
        title: 'Privacy Policy',
        description: 'Find what you need to know about your privacy',
        imageUrl: '/images/pages/privacy-policy.png',
      },
      {}
    );

    expect(heroSubSpy).toBeCalledTimes(1);
    expect(privacyPolicySectionSpy).toBeCalledTimes(1);
  });
});
