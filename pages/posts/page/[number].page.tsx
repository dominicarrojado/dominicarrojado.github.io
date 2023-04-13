import { GetStaticProps, GetStaticPaths } from 'next';
import {
  getAllPostsLastPage,
  getAllPostPages,
  getAllPostsData,
} from '@/lib/posts';
import { Route } from '@/lib/types';
import { POSTS_PER_PAGE } from '@/lib/constants';
import PostsIndex, { Props as PostsProps } from '../index.page';

type Props = PostsProps;

export default function PostsPage(postsProps: Props) {
  return (
    <PostsIndex
      {...postsProps}
      path={`${Route.POSTS_PAGE}/${postsProps.currentPage}`}
    />
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: getAllPostPages(),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const currentPage = Number(params?.number);
  const skip = (currentPage - 1) * POSTS_PER_PAGE;

  return {
    props: {
      currentPage,
      lastPage: getAllPostsLastPage(),
      posts: getAllPostsData().splice(skip, POSTS_PER_PAGE),
    },
  };
};
