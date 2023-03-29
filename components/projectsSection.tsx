import cn from 'classnames';
import { useMounted } from '../lib/custom-hooks';
import Section from './section';
import ProjectItem from './projectItem';
import { PROJECTS } from '../lib/constants';

function ProjectsSection() {
  const shouldDisplay = useMounted();

  return (
    <Section id="projects">
      <ul className="max-w-screen-3xl mx-auto" data-testid="projects-list">
        {PROJECTS.map((project, idx) => (
          <ProjectItem
            key={idx}
            project={project}
            headingLevel={2}
            className={cn(
              'transform transition-opacity duration-700',
              'motion-reduce:transition-none',
              {
                ['opacity-0']: !shouldDisplay,
              }
            )}
            style={{
              transitionDelay: `${idx * 150}ms`,
            }}
          />
        ))}
      </ul>
    </Section>
  );
}

export default ProjectsSection;
