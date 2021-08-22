import { render } from '@testing-library/react';
import { getRandomPostId } from '../../../lib/test-helpers';
import * as customHooks from '../../../lib/custom-hooks';
import * as SeoTags from '../../../components/seoTags';
import * as HeroSub from '../../../components/heroSub';
import * as PostContent from '../../../components/postContent';
import { Post, PostData } from '../../../lib/types';
import PostIndex, { getStaticPaths, getStaticProps } from '../[id]';

describe('<PostIndex />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render expected components', async () => {
    // mock to prevent re-render of hero section
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    const seoTagsSpy = jest.spyOn(SeoTags, 'default');
    const heroSubSpy = jest.spyOn(HeroSub, 'default');
    const postContentSpy = jest.spyOn(PostContent, 'default');

    const postId = getRandomPostId();

    const staticProps = (await getStaticProps({
      params: { id: postId },
    })) as any;

    expect(staticProps).toEqual({
      props: {
        postData: expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          category: expect.any(String),
          date: expect.any(String),
          excerpt: expect.any(String),
          imageUrl: expect.any(String),
          contentHtml: expect.any(String),
        }),
      },
    });

    const expectPost = (post: Post) => {
      expect(post).toMatchObject({
        id: expect.any(String),
        title: expect.any(String),
        category: expect.any(String),
        date: expect.any(String),
        excerpt: expect.any(String),
        imageUrl: expect.any(String),
      });
    };

    const postData = staticProps.props.postData as PostData;

    const expectAdjacentPostData = (adjacentPostData: any) => {
      expect(adjacentPostData).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          category: expect.any(String),
          date: expect.any(String),
          excerpt: expect.any(String),
          imageUrl: expect.any(String),
        })
      );
      expect(adjacentPostData.id).not.toBe(postId);
    };

    const currentPostDate = new Date(postData.date).getTime();
    const previousPostData = postData.previousPost;

    if (previousPostData) {
      expectAdjacentPostData(previousPostData);

      const previousPostDate = new Date(previousPostData.date).getTime();

      expect(currentPostDate).toBeGreaterThanOrEqual(previousPostDate);
    } else {
      expect(previousPostData).toBeNull();
    }

    const nextPostData = postData.nextPost;

    if (nextPostData) {
      expectAdjacentPostData(nextPostData);

      const nextPostDate = new Date(nextPostData.date).getTime();

      expect(currentPostDate).toBeLessThanOrEqual(nextPostDate);
    } else {
      expect(nextPostData).toBeNull();
    }

    render(<PostIndex postData={postData} />);

    expect(seoTagsSpy).toBeCalledTimes(1);
    expect(seoTagsSpy).toBeCalledWith(
      {
        path: `/posts/${postId}`,
        title: postData.title,
        description: postData.excerpt,
        imageUrl: postData.imageUrl,
      },
      {}
    );

    expect(heroSubSpy).toBeCalledTimes(1);
    expect(heroSubSpy).toBeCalledWith(
      { title: postData.title, description: postData.excerpt },
      {}
    );

    expect(postContentSpy).toBeCalledTimes(1);
    expect(postContentSpy).toBeCalledWith({ postData }, {});
  });
});

describe('getStaticPaths()', () => {
  it('should return expected value', () => {
    const paths = getStaticPaths({});

    expect(paths).toEqual({
      paths: expect.arrayContaining([
        {
          params: {
            id: expect.any(String),
          },
        },
      ]),
      fallback: false,
    });
  });
});
