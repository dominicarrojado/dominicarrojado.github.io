import SeoTags from '../components/seoTags';
import HeroSub from '../components/heroSub';
import { Route } from '../lib/types';
import AboutSection from '../components/aboutSection';

function About() {
  const title = 'About Me';
  const desc =
    'An introduction of myself - my passion, experiences and interests';

  return (
    <>
      {/* TODO: update SEO tags later */}
      <SeoTags
        path={Route.ABOUT}
        title={title}
        description={desc}
        imageUrl=""
        imageWidth={0}
        imageHeight={0}
      />
      <HeroSub title={title} description={desc} />
      <AboutSection />
    </>
  );
}

export default About;
