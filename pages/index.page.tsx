import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { getAllPostsData } from '../lib/posts';
import { getMetaTitle } from '../lib/meta';
import HeroMain from '../components/heroMain';
import AboutHomeSection from '../components/aboutHomeSection';
import ProjectsHomeSection from '../components/projectsHomeSection';
import PostsHomeSection from '../components/postsHomeSection';
import TestimonialsHomeSection from '../components/testimonialsHomeSection';
import { Post } from '../lib/types';
import { POSTS_PER_PAGE } from '../lib/constants';

export default function Home({ latestPosts }: { latestPosts: Array<Post> }) {
  return (
    <>
      <NextSeo
        title={getMetaTitle('Guides, Tips and Tricks to Web Development')}
        description="My name is Dominic Arrojado. I write tech blogs and create videos to share my knowledge and learnings from my web development experiences."
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
