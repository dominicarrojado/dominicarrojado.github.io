import { render } from '@testing-library/react';
import { getFakeNumber } from '@/lib/test-helpers';
import { getAllPostsLastPage } from '@/lib/posts';
import * as customHooks from '@/lib/custom-hooks';
import * as Posts from '@/pages/posts/index.page';
import PostsPage, { getStaticPaths, getStaticProps } from '../[number].page';

jest.mock('@/lib/custom-hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/custom-hooks'),
}));
jest.mock('@/pages/posts/index.page', () => ({
  __esModule: true,
  ...jest.requireActual('@/pages/posts/index.page'),
}));

describe('<PostsPage />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render expected components', async () => {
    // mock for HeroMain/HeroSub component (prevent re-render & window.matchMedia not a func)
    jest.spyOn(customHooks, 'useScrollOpacityEffect').mockReturnValue(1);
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    const postsSpy = jest.spyOn(Posts, 'default');

    const staticPropsRes = (await getStaticProps({
      params: {
        number: getFakeNumber({
          min: 1,
          max: getAllPostsLastPage(),
        }).toString(),
      },
    })) as any;
    const staticProps = staticPropsRes.props;
    const { currentPage, lastPage, posts } = staticProps;

    render(
      <PostsPage currentPage={currentPage} lastPage={lastPage} posts={posts} />
    );

    expect(postsSpy).toBeCalledTimes(1);
    expect(postsSpy).toBeCalledWith(
      {
        currentPage,
        lastPage,
        posts,
        path: `/posts/page/${currentPage}`,
      },
      {}
    );
  });
});

describe('getStaticPaths()', () => {
  it('should return expected value', () => {
    const paths = getStaticPaths({});

    expect(paths).toEqual({
      paths: expect.arrayContaining([
        {
          params: {
            number: expect.any(String),
          },
        },
      ]),
      fallback: false,
    });
  });
});
