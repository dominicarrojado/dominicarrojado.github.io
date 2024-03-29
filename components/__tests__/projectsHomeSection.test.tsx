import { render, screen } from '@testing-library/react';
import { BEST_PROJECTS } from '@/lib/constants';
import * as customHooks from '@/lib/custom-hooks';
import * as ProjectItem from '../projectItem';
import ProjectsHomeSection from '../projectsHomeSection';

jest.mock('@/lib/custom-hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/custom-hooks'),
}));
jest.mock('../projectItem', () => ({
  __esModule: true,
  ...jest.requireActual('../projectItem'),
}));

describe('<ProjectsHomeSection />', () => {
  const renderComponent = () => {
    render(<ProjectsHomeSection />);
  };

  beforeEach(() => {
    // mock for ProjectItem component
    jest.spyOn(customHooks, 'useMotionSafe').mockReturnValue(true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('content', () => {
    beforeEach(() => {
      renderComponent();
    });

    it('should have expected title', () => {
      const titleEl = screen.queryByText('Featured Projects');

      expect(titleEl?.tagName).toBe('H2');
    });

    it('should have expected content', () => {
      const content = "A selection of projects I've done so far.";

      expect(screen.queryByText(content)).toBeInTheDocument();
    });

    it('should have expected anchor', () => {
      const anchorEl = screen.queryByText('See All Projects');

      expect(anchorEl?.tagName).toBe('A');
      expect(anchorEl).toHaveAttribute('href', '/projects');
      expect(anchorEl).not.toHaveAttribute('rel');
      expect(anchorEl).not.toHaveAttribute('target');
    });
  });

  describe('<ProjectItem />', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should display best projects only', () => {
      const projectItemSpy = jest.spyOn(ProjectItem, 'default');

      renderComponent();

      expect(projectItemSpy).toBeCalledTimes(BEST_PROJECTS.length);

      BEST_PROJECTS.forEach((project, idx) => {
        expect(projectItemSpy).toHaveBeenNthCalledWith(
          idx + 1,
          { project, headingLevel: 3 },
          {}
        );
      });
    });
  });
});
