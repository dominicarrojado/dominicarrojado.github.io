import { render } from '@testing-library/react';
import { getRandomPostId } from '@/lib/test-helpers';
import * as customHooks from '@/lib/custom-hooks';
import * as HeroSub from '@/components/heroSub';
import * as PostContent from '@/components/postContent';
import { PostData } from '@/lib/types';
import PostIndex, { getStaticPaths, getStaticProps } from '../[id].page';

jest.mock('@/lib/custom-hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/custom-hooks'),
}));
jest.mock('@/components/heroSub', () => ({
  __esModule: true,
  ...jest.requireActual('@/components/heroSub'),
}));
jest.mock('@/components/postContent', () => ({
  __esModule: true,
  ...jest.requireActual('@/components/postContent'),
}));

describe('<PostIndex />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render expected components', async () => {
    // mock for HeroMain/HeroSub component (prevent re-render & window.matchMedia not a func)
    jest.spyOn(customHooks, 'useScrollOpacityEffect').mockReturnValue(1);
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    // mock for PostContent component (prevent re-render)
    jest.spyOn(customHooks, 'useWindowSize').mockReturnValue({
      windowWidth: 0,
      windowHeight: 0,
    });

    const heroSubSpy = jest.spyOn(HeroSub, 'default');
    const postContentSpy = jest.spyOn(PostContent, 'default');

    const postId = getRandomPostId();

    const staticProps = (await getStaticProps({
      params: { id: postId },
    })) as any;

    const postData = staticProps.props.postData as PostData;

    expect(typeof postData.content).toBe('string');

    const expectAdjacentPostData = (adjacentPostData: any) => {
      expect(adjacentPostData).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          category: expect.any(String),
          date: expect.any(String),
          excerpt: expect.any(String),
          videoUrl: expect.any(String),
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
