import { render } from '@testing-library/react';
import * as SeoTags from '../../components/seoTags';
import * as HeroSub from '../../components/heroSub';
import * as ProjectsSection from '../../components/projectsSection';
import Projects from '../projects';

describe('<Projects />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render expected components', async () => {
    const seoTagsSpy = jest.spyOn(SeoTags, 'default');
    const heroSubSpy = jest.spyOn(HeroSub, 'default');
    const projectsSectionSpy = jest.spyOn(ProjectsSection, 'default');

    render(<Projects />);

    expect(seoTagsSpy).toBeCalledTimes(1);

    // TODO: update SEO tags later
    expect(seoTagsSpy).toBeCalledWith(
      {
        path: '/projects',
        title: 'Featured Projects',
        description: "A selection of projects I've done so far.",
        imageUrl: '',
        imageWidth: 0,
        imageHeight: 0,
      },
      {}
    );

    expect(heroSubSpy).toBeCalledTimes(1);
    expect(projectsSectionSpy).toBeCalledTimes(1);
  });
});
