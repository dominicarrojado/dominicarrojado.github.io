import { GetStaticProps } from 'next';
import { getAllPostsData } from '../lib/posts';
import SeoTags from '../components/seoTags';
import HeroMain from '../components/heroMain';
import AboutHomeSection from '../components/aboutHomeSection';
import ProjectsHomeSection from '../components/projectsHomeSection';
import PostsHomeSection from '../components/postsHomeSection';
import TestimonialsHomeSection from '../components/testimonialsHomeSection';
import { Post, Route } from '../lib/types';
import { POSTS_PER_PAGE } from '../lib/constants';

export default function Home({ latestPosts }: { latestPosts: Array<Post> }) {
  return (
    <>
      <SeoTags
        path={Route.HOME}
        title="Guides, Tips and Tricks to Web Development"
        description="My name is Dominic Arrojado. I write tech blogs and create videos to share my knowledge and learnings in my web development experiences."
      />
      <HeroMain />
      <AboutHomeSection />
      <ProjectsHomeSection />
      <PostsHomeSection latestPosts={latestPosts} />
      <TestimonialsHomeSection />
    </>
  );
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      latestPosts: getAllPostsData().splice(0, POSTS_PER_PAGE),
    },
  };
};
