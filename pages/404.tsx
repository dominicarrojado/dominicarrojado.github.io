import SeoTags from '../components/seoTags';
import HeroSub from '../components/heroSub';
import { Route } from '../lib/types';

function About() {
  const title = '404 - Page Not Found';
  const shortDesc = "Sorry, we couldn't find what you're looking for.";
  const desc = `${shortDesc} Please check the menu for existing pages.`;
  const imageUrl = '/images/pages/404.png';

  return (
    <>
      <SeoTags
        path={Route.HOME}
        title={title}
        description={shortDesc}
        imageUrl={imageUrl}
      />
      <HeroSub title={title} description={desc} isMinHeightFull />
    </>
  );
}

export default About;
