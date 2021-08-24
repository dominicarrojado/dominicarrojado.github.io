import SeoTags from '../components/seoTags';
import HeroSub from '../components/heroSub';
import ProjectsSection from '../components/projectsSection';
import { Route } from '../lib/types';

function Projects() {
  const title = 'Featured Projects';
  const desc = "A selection of projects I've done so far";

  return (
    <>
      <SeoTags path={Route.PROJECTS} title={title} description={desc} />
      <HeroSub title={title} description={desc} />
      <ProjectsSection />
    </>
  );
}

export default Projects;
