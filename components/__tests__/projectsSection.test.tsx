import { render, screen, act } from '@testing-library/react';
import Window from '../../modules/Window';
import * as ProjectItem from '../projectItem';
import { PROJECTS } from '../../lib/constants';
import ProjectsSection from '../projectsSection';

describe('<ProjectsSection />', () => {
  const renderComponent = () => {
    render(<ProjectsSection />);
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render all projects', () => {
    const projectItemSpy = jest.spyOn(ProjectItem, 'default');

    renderComponent();

    expect(projectItemSpy).toBeCalledTimes(PROJECTS.length);

    PROJECTS.forEach((project, idx) => {
      expect(projectItemSpy).toHaveBeenNthCalledWith(
        idx + 1,
        expect.objectContaining({
          project,
          headingLevel: 2,
        }),
        {}
      );
    });
  });

  it('should NOT display all projects by default', () => {
    renderComponent();

    const projectsListEl = screen.queryByTestId(
      'projects-list'
    ) as HTMLUListElement;
    const projectItemEls = projectsListEl.childNodes;

    projectItemEls.forEach((projectItemEl) => {
      expect(projectItemEl).toHaveClass('opacity-0');
    });
  });

  it('should display all projects on window load', () => {
    renderComponent();

    act(() => {
      Window.emit('load');
    });

    const projectsListEl = screen.queryByTestId(
      'projects-list'
    ) as HTMLUListElement;
    const projectItemEls = projectsListEl.childNodes;

    projectItemEls.forEach((projectItemEl) => {
      expect(projectItemEl).not.toHaveClass('opacity-0');
    });
  });
});
