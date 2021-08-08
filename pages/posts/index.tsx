import { GetStaticProps } from 'next';
import { getAllPostsData } from '../../lib/posts';
import HeroSub from '../../components/heroSub';
import PostsSection from '../../components/postsSection';
import SeoTags from '../../components/seoTags';
import { Post, Route } from '../../lib/types';

export default function Posts({ posts }: { posts: Array<Post> }) {
  const title = 'Blog';
  const desc =
    'A place to share my knowledge and learnings from my web development experiences.';

  return (
    <>
      {/* TODO: update SEO tags later */}
      <SeoTags
        path={Route.POSTS}
        title={title}
        description={desc}
        imageUrl=""
        imageWidth={0}
        imageHeight={0}
      />
      <HeroSub title={title} description={desc} />
      <PostsSection posts={posts} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts: getAllPostsData(),
    },
  };
};
