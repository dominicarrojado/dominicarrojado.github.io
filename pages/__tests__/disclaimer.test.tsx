import { render } from '@testing-library/react';
import * as customHooks from '../../lib/custom-hooks';
import * as SeoTags from '../../components/seoTags';
import * as HeroSub from '../../components/heroSub';
import * as DisclaimerSection from '../../components/disclaimerSection';
import Disclaimer from '../disclaimer';

describe('<Disclaimer />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render expected components', async () => {
    // mock to prevent re-render of hero section
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    const seoTagsSpy = jest.spyOn(SeoTags, 'default');
    const heroSubSpy = jest.spyOn(HeroSub, 'default');
    const disclaimerSectionSpy = jest.spyOn(DisclaimerSection, 'default');

    render(<Disclaimer />);

    expect(seoTagsSpy).toBeCalledTimes(1);
    expect(seoTagsSpy).toBeCalledWith(
      {
        path: '/disclaimer',
        title: 'Disclaimer',
        description:
          'Statements to specify or delimit the scope of rights and obligations',
        imageUrl: '/images/pages/disclaimer.png',
      },
      {}
    );

    expect(heroSubSpy).toBeCalledTimes(1);
    expect(disclaimerSectionSpy).toBeCalledTimes(1);
  });
});
