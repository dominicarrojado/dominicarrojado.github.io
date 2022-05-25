import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllPostIds, getPostData } from '../../lib/posts';
import SeoTags from '../../components/seoTags';
import HeroSub from '../../components/heroSub';
import AdUnitScript from '../../components/adUnitScript';
import PostContent from '../../components/postContent';
import { PostData, Route } from '../../lib/types';

export default function Post({ postData }: { postData: PostData }) {
  return (
    <>
      <SeoTags
        path={`${Route.POSTS}/${postData.id}`}
        title={postData.title}
        description={postData.excerpt}
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
