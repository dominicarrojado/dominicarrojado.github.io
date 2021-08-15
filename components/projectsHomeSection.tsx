import Link from 'next/link';
import cn from 'classnames';
import Section from './section';
import SectionTitle from './sectionTitle';
import SectionContent from './sectionContent';
import TextArrowLink from './textArrowLink';
import ProjectItem from './projectItem';
import { Route } from '../lib/types';
import { BEST_PROJECTS } from '../lib/constants';

function ProjectsHomeSection() {
  return (
    <Section id="projects">
      <SectionTitle>Featured Projects</SectionTitle>
      <SectionContent>A selection of projects I've done so far.</SectionContent>
      <ul
        className={cn('max-w-screen-3xl mx-auto mt-8', 'sm:mt-10', 'lg:mt-12')}
        data-testid="projects-list"
      >
        {BEST_PROJECTS.map((project, idx) => (
          <ProjectItem key={idx} project={project} />
        ))}
      </ul>
      <div
        className={cn('mt-12 text-center', 'md:mt-16', 'lg:mt-24', 'xl:mt-28')}
      >
        <Link href={Route.PROJECTS} passHref>
          <TextArrowLink>See All Projects</TextArrowLink>
        </Link>
      </div>
    </Section>
  );
}

export default ProjectsHomeSection;
