import { render } from '@testing-library/react';
import * as customHooks from '../../lib/custom-hooks';
import * as SeoTags from '../../components/seoTags';
import * as HeroSub from '../../components/heroSub';
import * as AboutSection from '../../components/aboutSection';
import About from '../about.page';

describe('<About />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render expected components', async () => {
    // mock to prevent re-render of hero section
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    const seoTagsSpy = jest.spyOn(SeoTags, 'default');
    const heroSubSpy = jest.spyOn(HeroSub, 'default');
    const aboutSectionSpy = jest.spyOn(AboutSection, 'default');

    render(<About />);

    const title = 'About Me';
    const desc =
      'An introduction of myself - my passion, experiences and interests';

    expect(seoTagsSpy).toBeCalledTimes(1);
    expect(seoTagsSpy).toBeCalledWith(
      {
        title,
        path: '/about',
        description: desc,
      },
      {}
    );

    expect(heroSubSpy).toBeCalledTimes(1);
    expect(heroSubSpy).toBeCalledWith(
      {
        title,
        description: desc,
      },
      {}
    );

    expect(aboutSectionSpy).toBeCalledTimes(1);
  });
});
