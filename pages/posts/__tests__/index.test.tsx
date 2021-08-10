import { render } from '@testing-library/react';
import * as customHooks from '../../../lib/custom-hooks';
import * as SeoTags from '../../../components/seoTags';
import * as HeroSub from '../../../components/heroSub';
import * as PostsSection from '../../../components/postsSection';
import { Post } from '../../../lib/types';
import Posts, { getStaticProps } from '../index';

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
          },
        ]),
      },
    });

    const posts = staticProps.props.posts as Array<Post>;

    render(<Posts posts={posts} />);

    expect(seoTagsSpy).toBeCalledTimes(1);

    // TODO: update SEO tags later
    expect(seoTagsSpy).toBeCalledWith(
      {
        path: '/posts',
        title: 'Blog',
        description:
          'A place to share my knowledge and learnings from my web development experiences.',
        imageUrl: '',
        imageWidth: 0,
        imageHeight: 0,
      },
      {}
    );

    expect(heroSubSpy).toBeCalledTimes(1);
    expect(postsSectionSpy).toBeCalledTimes(1);
  });
});
