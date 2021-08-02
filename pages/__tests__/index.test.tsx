import { render } from '@testing-library/react';
import * as HeroMain from '../../components/heroMain';
import * as SeoTags from '../../components/seoTags';
import * as AboutMeSection from '../../components/aboutMeSection';
import * as ProjectsSection from '../../components/projectsSection';
import * as PostsSection from '../../components/postsSection';
import * as TestimonialsSection from '../../components/testimonialsSection';
import { MAIN_TITLE, POSTS_DISPLAY_LATEST_MAX } from '../../lib/constants';
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
    const postsSectionSpy = jest.spyOn(PostsSection, 'default');
    const testimonialsSectionSpy = jest.spyOn(TestimonialsSection, 'default');

    render(<Index latestPosts={[]} />);

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
    expect(postsSectionSpy).toBeCalledTimes(1);
    expect(testimonialsSectionSpy).toBeCalledTimes(1);
  });
});

describe('getStaticProps()', () => {
  it('should return expected value', async () => {
    const staticProps = await getStaticProps({});

    expect(staticProps).toEqual({
      props: {
        latestPosts: expect.arrayContaining([
          {
            id: expect.any(String),
            title: expect.any(String),
            category: expect.any(String),
            date: expect.any(String),
            excerpt: expect.any(String),
          },
        ]),
      },
    });

    const { latestPosts } = (staticProps as any).props;

    expect(latestPosts.length).toBeLessThanOrEqual(POSTS_DISPLAY_LATEST_MAX);
  });
});
