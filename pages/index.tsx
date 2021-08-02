import { GetStaticProps } from 'next';
import SeoTags from '../components/seoTags';
import HeroMain from '../components/heroMain';
import AboutMeSection from '../components/aboutMeSection';
import ProjectsSection from '../components/projectsSection';
import BlogSection from '../components/blogSection';
import TestimonialsSection from '../components/testimonialsSection';
import { MAIN_TITLE } from '../lib/constants';

function Home() {
  return (
    <>
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
      <BlogSection />
      <TestimonialsSection />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default Home;
