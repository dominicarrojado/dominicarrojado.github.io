import { GetStaticProps } from 'next';
import { getLatestPostsData } from '../lib/posts';
import { getAllTestimonialsData } from '../lib/testimonials';
import SeoTags from '../components/seoTags';
import HeroMain from '../components/heroMain';
import AboutMeHomeSection from '../components/aboutMeHomeSection';
import ProjectsHomeSection from '../components/projectsHomeSection';
import PostsHomeSection from '../components/postsHomeSection';
import TestimonialsHomeSection from '../components/testimonialsHomeSection';
import { Post, Route, Testimonial } from '../lib/types';
import { MAIN_TITLE } from '../lib/constants';

export default function Home({
  latestPosts,
  testimonials,
}: {
  latestPosts: Array<Post>;
  testimonials: Array<Testimonial>;
}) {
  return (
    <>
      {/* TODO: update SEO tags later */}
      <SeoTags
        path={Route.HOME}
        title={MAIN_TITLE}
        description="I'm Dominic Arrojado and my passion is turning design into code. I'm a web developer specializing in both front-end & back-end development. I'm experienced in developing small to large web applications."
        imageUrl=""
        imageWidth={0}
        imageHeight={0}
      />
      <HeroMain />
      <AboutMeHomeSection />
      <ProjectsHomeSection />
      <PostsHomeSection latestPosts={latestPosts} />
      <TestimonialsHomeSection testimonials={testimonials} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      latestPosts: getLatestPostsData(),
      testimonials: await getAllTestimonialsData(),
    },
  };
};
