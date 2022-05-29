import { render } from '@testing-library/react';
import * as customHooks from '../../../lib/custom-hooks';
import * as HeroSub from '../../../components/heroSub';
import * as PostsSection from '../../../components/postsSection';
import { Post } from '../../../lib/types';
import Posts, { getStaticProps } from '../index.page';

describe('<Posts />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render expected components', async () => {
    // mock for HeroMain/HeroSub component (prevent re-render & window.matchMedia not a func)
    jest.spyOn(customHooks, 'useScrollOpacityEffect').mockReturnValue(1);
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    const heroSubSpy = jest.spyOn(HeroSub, 'default');
    const postsSectionSpy = jest.spyOn(PostsSection, 'default');

    const staticPropsRes = (await getStaticProps({})) as any;
    const staticProps = staticPropsRes.props;

    expect(staticPropsRes).toEqual({
      props: {
        currentPage: expect.any(Number),
        lastPage: expect.any(Number),
        posts: expect.arrayContaining([
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

    const { currentPage, lastPage } = staticProps;

    expect(currentPage).toBeLessThanOrEqual(lastPage);

    const posts = staticProps.posts as Array<Post>;

    render(
      <Posts currentPage={currentPage} lastPage={lastPage} posts={posts} />
    );

    expect(heroSubSpy).toBeCalledTimes(1);
    expect(heroSubSpy).toBeCalledWith(
      {
        title: 'Tech Blog',
        description:
          'A place to share my knowledge and learnings from my web development experiences',
      },
      {}
    );

    expect(postsSectionSpy).toBeCalledTimes(1);
  });
});
