import { render } from '@testing-library/react';
import * as HeroMain from '../../components/heroMain';
import * as SeoTags from '../../components/seoTags';
import * as AboutMeSection from '../../components/aboutMeSection';
import * as ProjectsSection from '../../components/projectsSection';
import * as BlogSection from '../../components/blogSection';
import * as TestimonialsSection from '../../components/testimonialsSection';
import { MAIN_TITLE } from '../../lib/constants';
import Index, { getStaticProps } from '../index';

describe('<Index />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render expected components', () => {
    const seoTagsSpy = jest.spyOn(SeoTags, 'default');
    const heroMainSpy = jest.spyOn(HeroMain, 'default');
    const aboutMeSectionSpy = jest.spyOn(AboutMeSection, 'default');
    const projectsSectionSpy = jest.spyOn(ProjectsSection, 'default');
    const blogSectionSpy = jest.spyOn(BlogSection, 'default');
    const testimonialsSectionSpy = jest.spyOn(TestimonialsSection, 'default');

    render(<Index />);

    expect(seoTagsSpy).toBeCalledTimes(1);

    // TODO: update SEO tags later
    expect(seoTagsSpy).toBeCalledWith(
      {
        path: '/',
        title: MAIN_TITLE,
        description:
          "I'm Dominic Arrojado and my passion is turning design into code. I'm a web developer specializing in both front-end & back-end development. I'm experienced in developing small to large web applications.",
        imageUrl: '',
        imageWidth: 0,
        imageHeight: 0,
      },
      {}
    );

    expect(heroMainSpy).toBeCalledTimes(1);
    expect(aboutMeSectionSpy).toBeCalledTimes(1);
    expect(projectsSectionSpy).toBeCalledTimes(1);
    expect(blogSectionSpy).toBeCalledTimes(1);
    expect(testimonialsSectionSpy).toBeCalledTimes(1);
  });
});

describe('getStaticProps()', () => {
  it('should return expected value', async () => {
    const staticProps = await getStaticProps({});
    const expectedProps = { props: {} };

    expect(staticProps).toEqual(expectedProps);
  });
});
