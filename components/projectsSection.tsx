import Section from './section';
import ProjectItem from './projectItem';
import { PROJECTS } from '../lib/constants';

function ProjectsSection() {
  return (
    <Section id="projects">
      <ul className="max-w-screen-3xl mx-auto" data-testid="projects-list">
        {PROJECTS.map((project, idx) => (
          <ProjectItem key={idx} project={project} />
        ))}
      </ul>
    </Section>
  );
}

export default ProjectsSection;
