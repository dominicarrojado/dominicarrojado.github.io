import { render } from '@testing-library/react';
import * as customHooks from '../../lib/custom-hooks';
import * as SeoTags from '../../components/seoTags';
import * as HeroSub from '../../components/heroSub';
import Page404 from '../404';

describe('<Page404 />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render expected components', async () => {
    // mock to prevent re-render of hero section
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    const seoTagsSpy = jest.spyOn(SeoTags, 'default');
    const heroSubSpy = jest.spyOn(HeroSub, 'default');

    render(<Page404 />);

    const title = '404 - Page Not Found';
    const shortDesc = "Sorry, we couldn't find what you're looking for.";
    const desc = `${shortDesc} Please check the menu for existing pages.`;

    expect(seoTagsSpy).toBeCalledTimes(1);
    expect(seoTagsSpy).toBeCalledWith(
      {
        title,
        path: '/',
        description: shortDesc,
      },
      {}
    );

    expect(heroSubSpy).toBeCalledTimes(1);
    expect(heroSubSpy).toBeCalledWith(
      {
        title,
        description: desc,
        isMinHeightFull: true,
      },
      {}
    );
  });
});
