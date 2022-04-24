import { GetStaticProps } from 'next';
import { getAllPostsLastPage, getAllPostsData } from '../../lib/posts';
import HeroSub from '../../components/heroSub';
import PostsSection from '../../components/postsSection';
import SeoTags from '../../components/seoTags';
import { Post, Route } from '../../lib/types';
import { POSTS_PER_PAGE } from '../../lib/constants';

export type Props = {
  posts: Array<Post>;
  currentPage: number;
  lastPage: number;
  path?: string;
};

export default function Posts(props: Props) {
  const title = 'Tech Blog';
  const desc =
    'A place to share my knowledge and learnings from my web development experiences';

  return (
    <>
      <SeoTags
        path={props.path || Route.POSTS}
        title={title}
        description={desc}
      />
      <HeroSub title={title} description={desc} />
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
