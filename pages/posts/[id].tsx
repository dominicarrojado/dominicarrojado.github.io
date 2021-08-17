import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllPostIds, getPostData } from '../../lib/posts';
import SeoTags from '../../components/seoTags';
import HeroSub from '../../components/heroSub';
import PostContent from '../../components/postContent';
import { PostData } from '../../lib/types';

function Post({ postData }: { postData: PostData }) {
  return (
    <>
      <SeoTags
        path={`/posts/${postData.id}`}
        title={postData.title}
        description={postData.excerpt}
        imageUrl={postData.imageUrl}
      />
      <HeroSub title={postData.title} description={postData.excerpt} />
      <PostContent postData={postData} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData,
    },
  };
};

export default Post;
