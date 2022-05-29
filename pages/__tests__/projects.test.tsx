import { render } from '@testing-library/react';
import * as customHooks from '../../lib/custom-hooks';
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

    const heroSubSpy = jest.spyOn(HeroSub, 'default');
    const projectsSectionSpy = jest.spyOn(ProjectsSection, 'default');

    render(<Projects />);

    expect(heroSubSpy).toBeCalledTimes(1);
    expect(heroSubSpy).toBeCalledWith(
      {
        title: 'Featured Projects',
        description: "A selection of projects I've done so far",
      },
      {}
    );

    expect(projectsSectionSpy).toBeCalledTimes(1);
  });
});
