import cn from 'classnames';
import Section from './section';
import SectionTitle from './sectionTitle';
import SectionContent from './sectionContent';
import TextArrowLink from './textArrowLink';
import ProjectItem from './projectItem';
import NextLink from './nextLink';
import { Route } from '../lib/types';
import { BEST_PROJECTS } from '../lib/constants';

export default function ProjectsHomeSection() {
  return (
    <Section id="projects">
      <SectionTitle>Featured Projects</SectionTitle>
      <SectionContent>A selection of projects I've done so far.</SectionContent>
      <ul
        className={cn('mx-auto mt-8 max-w-screen-3xl', 'sm:mt-10', 'lg:mt-12')}
        data-testid="projects-list"
      >
        {BEST_PROJECTS.map((project, idx) => (
          <ProjectItem key={idx} project={project} headingLevel={3} />
        ))}
      </ul>
      <div
        className={cn('mt-12 text-center', 'md:mt-16', 'lg:mt-24', 'xl:mt-28')}
      >
        <NextLink href={Route.PROJECTS} passHref>
          <TextArrowLink>See All Projects</TextArrowLink>
        </NextLink>
      </div>
    </Section>
  );
}
