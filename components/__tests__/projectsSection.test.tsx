import { render, screen } from '@testing-library/react';
import * as customHooks from '../../lib/custom-hooks';
import * as ProjectItem from '../projectItem';
import { PROJECTS } from '../../lib/constants';
import ProjectsSection from '../projectsSection';

describe('<ProjectsSection />', () => {
  const renderComponent = () => {
    // mock to prevent re-render
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    return render(<ProjectsSection />);
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

  it('should display all projects on mount', () => {
    renderComponent();

    const projectsListEl = screen.queryByTestId(
      'projects-list'
    ) as HTMLUListElement;
    const projectItemEls = projectsListEl.childNodes;

    projectItemEls.forEach((projectItemEl) => {
      expect(projectItemEl).not.toHaveClass('opacity-0');
    });
  });
});
