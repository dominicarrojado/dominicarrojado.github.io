import { render } from '@testing-library/react';
import * as customHooks from '../../lib/custom-hooks';
import * as SeoTags from '../../components/seoTags';
import * as HeroMain from '../../components/heroMain';
import * as AboutHomeSection from '../../components/aboutHomeSection';
import * as ProjectsHomeSection from '../../components/projectsHomeSection';
import * as PostsHomeSection from '../../components/postsHomeSection';
import * as TestimonialsHomeSection from '../../components/testimonialsHomeSection';
import { Post } from '../../lib/types';
import { POSTS_DISPLAY_LATEST_MAX } from '../../lib/constants';
import Home, { getStaticProps } from '../index.page';

describe('<Home />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render expected components', async () => {
    // mock to prevent re-render of hero section
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    // mock to prevent re-render of testimonials home section
    jest.spyOn(customHooks, 'useWindowSize').mockReturnValue({
      windowWidth: 0,
      windowHeight: 0,
    });

    const seoTagsSpy = jest.spyOn(SeoTags, 'default');
    const heroMainSpy = jest.spyOn(HeroMain, 'default');
    const aboutHomeSectionSpy = jest.spyOn(AboutHomeSection, 'default');
    const projectsHomeSectionSpy = jest.spyOn(ProjectsHomeSection, 'default');
    const postsHomeSectionSpy = jest.spyOn(PostsHomeSection, 'default');
    const testimonialsHomeSectionSpy = jest.spyOn(
      TestimonialsHomeSection,
      'default'
    );

    const staticProps = (await getStaticProps({})) as any;

    expect(staticProps).toEqual({
      props: {
        latestPosts: expect.arrayContaining([
          {
            id: expect.any(String),
            title: expect.any(String),
            category: expect.any(String),
            date: expect.any(String),
            excerpt: expect.any(String),
            videoUrl: expect.any(String),
          },
        ]),
      },
    });

    const latestPosts = staticProps.props.latestPosts as Array<Post>;

    expect(latestPosts.length).toBeLessThanOrEqual(POSTS_DISPLAY_LATEST_MAX);

    render(<Home latestPosts={latestPosts} />);

    expect(seoTagsSpy).toBeCalledTimes(1);
    expect(seoTagsSpy).toBeCalledWith(
      {
        path: '/',
        title: 'Dominic Arrojado - Tech Blog',
        description:
          "My name is Dominic Arrojado. I'm a web developer and this is your guides, tips and tricks to web development. I write tech blogs and create videos to share my knowledge and learnings in my web development experiences.",
      },
      {}
    );

    expect(heroMainSpy).toBeCalledTimes(1);
    expect(aboutHomeSectionSpy).toBeCalledTimes(1);
    expect(projectsHomeSectionSpy).toBeCalledTimes(1);
    expect(postsHomeSectionSpy).toBeCalledTimes(1);
    expect(testimonialsHomeSectionSpy).toBeCalledTimes(1);
  });
});
