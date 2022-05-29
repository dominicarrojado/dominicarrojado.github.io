import { GetStaticProps, GetStaticPaths } from 'next';
import { NextSeo } from 'next-seo';
import { getMetaTitle, getRouteCanonical } from '../../lib/meta';
import { getAllPostIds, getPostData } from '../../lib/posts';
import HeroSub from '../../components/heroSub';
import AdUnitScript from '../../components/adUnitScript';
import PostContent from '../../components/postContent';
import { PostData, Route } from '../../lib/types';
import { useMemo } from 'react';

export default function Post({ postData }: { postData: PostData }) {
  const postId = postData.id;
  const postDate = postData.date;
  const metaUrl = useMemo(
    () =>
      getRouteCanonical(
        `${Route.POSTS}/${postId}` as Exclude<Route, Route.HOME>
      ),
    [postId]
  );
  const metaModifiedTime = useMemo(() => `${postDate}T14:00:00Z`, []);

  return (
    <>
      <NextSeo
        canonical={metaUrl}
        title={getMetaTitle(postData.title)}
        description={postData.excerpt}
        openGraph={{
          url: metaUrl,
          type: 'article',
          article: {
            publishedTime: metaModifiedTime,
            modifiedTime: metaModifiedTime,
            authors: [getRouteCanonical(Route.ABOUT)],
          },
        }}
      />
      <HeroSub title={postData.title} description={postData.excerpt} />
      <AdUnitScript />
      <PostContent postData={postData} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: getAllPostIds(),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      postData: await getPostData(params?.id as string),
    },
  };
};
