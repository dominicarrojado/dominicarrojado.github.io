import { render, screen } from '@testing-library/react';
import { PROJECTS } from '../../lib/constants';
import ProjectsSection from '../projectsSection';

describe('<ProjectsSection />', () => {
  beforeEach(() => {
    render(<ProjectsSection />);
  });

  it('should have expected title', () => {
    const titleEl = screen.queryByText('Featured Projects');

    expect(titleEl?.tagName).toBe('H2');
  });

  it('should have expected content', () => {
    const content = "A selection of projects I've done so far.";

    expect(screen.queryByText(content)).toBeInTheDocument();
  });

  it('should display best projects only', () => {
    PROJECTS.forEach((project) => {
      const projectEl = screen.queryByText(project.title);

      if (project.isBest) {
        expect(projectEl).toBeInTheDocument();
      } else {
        expect(projectEl).not.toBeInTheDocument();
      }
    });
  });

  it('should have expected anchor', () => {
    const anchorEl = screen.queryByText('See All Projects');

    expect(anchorEl?.tagName).toBe('A');
    expect(anchorEl).toHaveAttribute('href', '/projects');
    expect(anchorEl).not.toHaveAttribute('rel');
    expect(anchorEl).not.toHaveAttribute('target');
  });
});
