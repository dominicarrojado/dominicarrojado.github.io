import { NextSeo } from 'next-seo';
import { useMemo } from 'react';
import { getMetaTitle, getRouteCanonical } from '../lib/meta';
import HeroSub from '../components/heroSub';
import ProjectsSection from '../components/projectsSection';
import { Route } from '../lib/types';

function Projects() {
  const metaUrl = useMemo(() => getRouteCanonical(Route.PROJECTS), []);
  const title = 'Featured Projects';
  const desc = "A selection of projects I've done so far";

  return (
    <>
      <NextSeo
        canonical={metaUrl}
        title={getMetaTitle(title)}
        description={desc}
        openGraph={{ url: metaUrl }}
      />
      <HeroSub title={title} description={desc} />
      <ProjectsSection />
    </>
  );
}

export default Projects;
