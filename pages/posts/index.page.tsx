import { GetStaticProps } from 'next';
import { useMemo } from 'react';
import { NextSeo } from 'next-seo';
import { getMetaTitle, getRouteCanonical } from '@/lib/meta';
import { getAllPostsLastPage, getAllPostsData } from '@/lib/posts';
import HeroSub from '@/components/heroSub';
import AdUnitScript from '@/components/adUnitScript';
import PostsSection from '@/components/postsSection';
import { Post, Route } from '@/lib/types';
import { POSTS_PER_PAGE } from '@/lib/constants';

export type Props = {
  posts: Array<Post>;
  currentPage: number;
  lastPage: number;
  path?: string;
};

export default function Posts(props: Props) {
  const propsPath = props.path;
  const metaUrl = useMemo(
    () =>
      getRouteCanonical(
        (propsPath || Route.POSTS) as Exclude<Route, Route.HOME>
      ),
    [propsPath]
  );
  const title = 'Tech Blog';
  const desc =
    'A place to share my knowledge and learnings from my web development experiences';

  return (
    <>
      <NextSeo
        canonical={metaUrl}
        title={getMetaTitle(title)}
        description={desc}
        openGraph={{ url: metaUrl }}
      />
      <HeroSub title={title} description={desc} />
      <AdUnitScript />
      <PostsSection {...props} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      currentPage: 1,
      lastPage: getAllPostsLastPage(),
      posts: getAllPostsData().splice(0, POSTS_PER_PAGE),
    },
  };
};
