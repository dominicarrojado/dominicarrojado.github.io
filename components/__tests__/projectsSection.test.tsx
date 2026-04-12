import { render, screen } from '@testing-library/react';
import * as customHooks from '@/lib/custom-hooks';
import * as ProjectItem from '../projectItem';
import { PROJECTS } from '@/lib/constants';
import ProjectsSection from '../projectsSection';

jest.useFakeTimers();

jest.mock('@/lib/custom-hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/custom-hooks'),
}));
jest.mock('../projectItem', () => ({
  __esModule: true,
  ...jest.requireActual('../projectItem'),
}));

describe('<ProjectsSection />', () => {
  const renderComponent = () => {
    // mock to prevent re-render
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    return render(<ProjectsSection />);
  };

  beforeEach(() => {
    window.history.pushState({}, '', '/projects/');

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.clearAllTimers();
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

  it('should scroll to project from query param with smooth behavior', () => {
    const scrollIntoViewSpy = jest.fn();
    const targetProject = PROJECTS[0];

    window.history.pushState(
      {},
      '',
      `/projects/?project=${encodeURIComponent(targetProject.id)}`
    );

    const getElementByIdSpy = jest
      .spyOn(document, 'getElementById')
      .mockReturnValue({ scrollIntoView: scrollIntoViewSpy } as any);

    renderComponent();

    expect(getElementByIdSpy).toBeCalledWith(targetProject.id);
    expect(scrollIntoViewSpy).not.toBeCalled();

    jest.advanceTimersByTime(99);
    expect(scrollIntoViewSpy).not.toBeCalled();

    jest.advanceTimersByTime(1);
    expect(scrollIntoViewSpy).toBeCalledTimes(1);
    expect(scrollIntoViewSpy).toBeCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it('should scroll immediately with auto behavior when reduced motion is preferred', () => {
    const scrollIntoViewSpy = jest.fn();
    const targetProject = PROJECTS[0];

    window.history.pushState(
      {},
      '',
      `/projects/?project=${encodeURIComponent(targetProject.id)}`
    );

    jest.spyOn(window, 'matchMedia').mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    jest
      .spyOn(document, 'getElementById')
      .mockReturnValue({ scrollIntoView: scrollIntoViewSpy } as any);

    renderComponent();

    jest.runOnlyPendingTimers();

    expect(scrollIntoViewSpy).toBeCalledTimes(1);
    expect(scrollIntoViewSpy).toBeCalledWith({
      behavior: 'auto',
      block: 'start',
    });
  });

  it('should not attempt to scroll when project query param is missing', () => {
    const getElementByIdSpy = jest.spyOn(document, 'getElementById');

    renderComponent();

    jest.runOnlyPendingTimers();

    expect(getElementByIdSpy).not.toBeCalled();
  });

  it('should not attempt to scroll when component is not mounted yet', () => {
    const getElementByIdSpy = jest.spyOn(document, 'getElementById');

    jest.spyOn(customHooks, 'useMounted').mockReturnValue(false);
    render(<ProjectsSection />);

    jest.runOnlyPendingTimers();

    expect(getElementByIdSpy).not.toBeCalled();
  });

  it('should not scroll when query project does not exist in the DOM', () => {
    const targetProject = PROJECTS[0];

    window.history.pushState(
      {},
      '',
      `/projects/?project=${encodeURIComponent(targetProject.id)}`
    );

    const getElementByIdSpy = jest
      .spyOn(document, 'getElementById')
      .mockReturnValue(null);

    renderComponent();
    jest.runOnlyPendingTimers();

    expect(getElementByIdSpy).toBeCalledWith(targetProject.id);
  });
});
