import { render } from '@testing-library/react';
import * as customHooks from '@/lib/custom-hooks';
import * as HeroMain from '@/components/heroMain';
import * as AboutHomeSection from '@/components/aboutHomeSection';
import * as ProjectsHomeSection from '@/components/projectsHomeSection';
import * as PostsHomeSection from '@/components/postsHomeSection';
import * as TestimonialsHomeSection from '@/components/testimonialsHomeSection';
import { Post } from '@/lib/types';
import { POSTS_PER_PAGE } from '@/lib/constants';
import Home, { getStaticProps } from '../index.page';

jest.mock('@/lib/custom-hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/custom-hooks'),
}));
jest.mock('@/components/heroMain', () => ({
  __esModule: true,
  ...jest.requireActual('@/components/heroMain'),
}));
jest.mock('@/components/aboutHomeSection', () => ({
  __esModule: true,
  ...jest.requireActual('@/components/aboutHomeSection'),
}));
jest.mock('@/components/projectsHomeSection', () => ({
  __esModule: true,
  ...jest.requireActual('@/components/projectsHomeSection'),
}));
jest.mock('@/components/postsHomeSection', () => ({
  __esModule: true,
  ...jest.requireActual('@/components/postsHomeSection'),
}));
jest.mock('@/components/testimonialsHomeSection', () => ({
  __esModule: true,
  ...jest.requireActual('@/components/testimonialsHomeSection'),
}));

describe('<Home />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render expected components', async () => {
    // mock for HeroMain/HeroSub component (prevent re-render & window.matchMedia not a func)
    jest.spyOn(customHooks, 'useScrollOpacityEffect').mockReturnValue(1);
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    // mock for TestimonialsHomeSection component (prevent re-render)
    jest.spyOn(customHooks, 'useWindowSize').mockReturnValue({
      windowWidth: 0,
      windowHeight: 0,
    });

    // mock for ProjectItem component
    jest.spyOn(customHooks, 'useMotionSafe').mockReturnValue(true);

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

    expect(latestPosts.length).toBeLessThanOrEqual(POSTS_PER_PAGE);

    render(<Home latestPosts={latestPosts} />);

    expect(heroMainSpy).toBeCalledTimes(1);
    expect(aboutHomeSectionSpy).toBeCalledTimes(1);
    expect(projectsHomeSectionSpy).toBeCalledTimes(1);
    expect(postsHomeSectionSpy).toBeCalledTimes(1);
    expect(testimonialsHomeSectionSpy).toBeCalledTimes(1);
  });
});
