import cn from 'classnames';
import { useWindowLoaded } from '../lib/custom-hooks';
import Section from './section';
import ProjectItem from './projectItem';
import { PROJECTS } from '../lib/constants';

function ProjectsSection() {
  const shouldDisplay = useWindowLoaded();

  return (
    <Section id="projects">
      <ul className="max-w-screen-3xl mx-auto" data-testid="projects-list">
        {PROJECTS.map((project, idx) => (
          <ProjectItem
            key={idx}
            project={project}
            className={cn('transition duration-700', {
              ['transform opacity-0 translate-y-10']: !shouldDisplay,
            })}
            style={{
              transitionDelay: `${idx * 150 + 1500}ms`,
            }}
          />
        ))}
      </ul>
    </Section>
  );
}

export default ProjectsSection;
