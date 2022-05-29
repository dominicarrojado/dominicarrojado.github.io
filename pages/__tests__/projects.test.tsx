import { render } from '@testing-library/react';
import * as customHooks from '../../lib/custom-hooks';
import * as SeoTags from '../../components/seoTags';
import * as HeroSub from '../../components/heroSub';
import * as ProjectsSection from '../../components/projectsSection';
import Projects from '../projects.page';

describe('<Projects />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render expected components', async () => {
    // mock for HeroMain/HeroSub component (prevent re-render & window.matchMedia not a func)
    jest.spyOn(customHooks, 'useScrollOpacityEffect').mockReturnValue(1);
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    // mock for ProjectItem component (window.matchMedia not a func)
    jest.spyOn(customHooks, 'useMotionSafe').mockReturnValue(true);

    const seoTagsSpy = jest.spyOn(SeoTags, 'default');
    const heroSubSpy = jest.spyOn(HeroSub, 'default');
    const projectsSectionSpy = jest.spyOn(ProjectsSection, 'default');

    render(<Projects />);

    const title = 'Featured Projects';
    const desc = "A selection of projects I've done so far";

    expect(seoTagsSpy).toBeCalledTimes(1);
    expect(seoTagsSpy).toBeCalledWith(
      {
        title,
        path: '/projects',
        description: desc,
      },
      {}
    );

    expect(heroSubSpy).toBeCalledTimes(1);
    expect(heroSubSpy).toBeCalledWith({ title, description: desc }, {});

    expect(projectsSectionSpy).toBeCalledTimes(1);
  });
});