import { GetStaticProps } from 'next';
import { getLatestPostsData } from '../lib/posts';
import SeoTags from '../components/seoTags';
import HeroMain from '../components/heroMain';
import AboutMeSection from '../components/aboutMeSection';
import ProjectsSection from '../components/projectsSection';
import PostsSection from '../components/postsSection';
import TestimonialsSection from '../components/testimonialsSection';
import { Post } from '../lib/types';
import { MAIN_TITLE } from '../lib/constants';

function Home({ latestPosts }: { latestPosts: Array<Post> }) {
  return (
    <>
      {/* TODO: update SEO tags later */}
      <SeoTags
        path="/"
        title={MAIN_TITLE}
        description="I'm Dominic Arrojado and my passion is turning design into code. I'm a web developer specializing in both front-end & back-end development. I'm experienced in developing small to large web applications."
        imageUrl=""
        imageWidth={0}
        imageHeight={0}
      />
      <HeroMain />
      <AboutMeSection />
      <ProjectsSection />
      <PostsSection latestPosts={latestPosts} />
      <TestimonialsSection />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      latestPosts: getLatestPostsData(),
    },
  };
};

export default Home;
