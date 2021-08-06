import { render } from '@testing-library/react';
import { PROJECTS } from '../../lib/constants';
import * as ProjectItem from '../projectItem';
import ProjectsSection from '../projectsSection';

describe('<ProjectsSection />', () => {
  const renderComponent = () => {
    render(<ProjectsSection />);
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should display all projects', () => {
    const projectItemSpy = jest.spyOn(ProjectItem, 'default');

    renderComponent();

    expect(projectItemSpy).toBeCalledTimes(PROJECTS.length);

    PROJECTS.forEach((project, idx) => {
      expect(projectItemSpy).toHaveBeenNthCalledWith(idx + 1, { project }, {});
    });
  });
});
