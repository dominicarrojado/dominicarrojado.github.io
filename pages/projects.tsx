import SeoTags from '../components/seoTags';
import HeroSub from '../components/heroSub';
import ProjectsSection from '../components/projectsSection';
import { Route } from '../lib/types';

function Projects() {
  const title = 'Featured Projects';
  const desc = "A selection of projects I've done so far.";

  return (
    <>
      {/* TODO: update SEO tags later */}
      <SeoTags
        path={Route.PROJECTS}
        title={title}
        description={desc}
        imageUrl=""
        imageWidth={0}
        imageHeight={0}
      />
      <HeroSub title={title} description={desc} />
      <ProjectsSection />
    </>
  );
}

export default Projects;
