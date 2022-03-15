import { render } from '@testing-library/react';
import * as customHooks from '../../../lib/custom-hooks';
import * as SeoTags from '../../../components/seoTags';
import * as HeroSub from '../../../components/heroSub';
import * as PostsSection from '../../../components/postsSection';
import { Post } from '../../../lib/types';
import Posts, { getStaticProps } from '../index.page';

describe('<Posts />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render expected components', async () => {
    // mock to prevent re-render of hero section
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    const seoTagsSpy = jest.spyOn(SeoTags, 'default');
    const heroSubSpy = jest.spyOn(HeroSub, 'default');
    const postsSectionSpy = jest.spyOn(PostsSection, 'default');

    const staticProps = (await getStaticProps({})) as any;

    expect(staticProps).toEqual({
      props: {
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

    const posts = staticProps.props.posts as Array<Post>;

    render(<Posts posts={posts} />);

    const title = 'Tech Blog';
    const desc =
      'A place to share my knowledge and learnings from my web development experiences';

    expect(seoTagsSpy).toBeCalledTimes(1);
    expect(seoTagsSpy).toBeCalledWith(
      {
        title,
        path: '/posts',
        description: desc,
      },
      {}
    );

    expect(heroSubSpy).toBeCalledTimes(1);
    expect(heroSubSpy).toBeCalledWith({ title, description: desc }, {});

    expect(postsSectionSpy).toBeCalledTimes(1);
  });
});
