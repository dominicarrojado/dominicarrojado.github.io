import { GetStaticProps } from 'next';
import { getLatestPostsData } from '../lib/posts';
import SeoTags from '../components/seoTags';
import HeroMain from '../components/heroMain';
import AboutHomeSection from '../components/aboutHomeSection';
import ProjectsHomeSection from '../components/projectsHomeSection';
import PostsHomeSection from '../components/postsHomeSection';
import TestimonialsHomeSection from '../components/testimonialsHomeSection';
import { Post, Route, Testimonial } from '../lib/types';
import { MAIN_TITLE } from '../lib/constants';

export default function Home({ latestPosts }: { latestPosts: Array<Post> }) {
  const desc =
    "Guides, Tips and Tricks to Web Development. I'm Dominic Arrojado and my passion is turning design into code. I'm a web developer specializing in both front-end &amp; back-end development. I'm experienced in developing small to large web applications. I write tech blogs and create video tutorials to share my knowledge and learnings in my web development experiences.";
  const imageUrl = '/images/pages/home.png';

  return (
    <>
      <SeoTags
        path={Route.HOME}
        title={MAIN_TITLE}
        description={desc}
        imageUrl={imageUrl}
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
      latestPosts: getLatestPostsData(),
    },
  };
};
