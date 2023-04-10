import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import { config } from 'react-transition-group';
import Window from '../../modules/Window';
import {
  getFakeBoolean,
  getFakeDirectoryPath,
  getFakeImageUrl,
  getFakeNumber,
  getFakeSentence,
  getFakeSentences,
  getFakeUrl,
  setReadOnlyProperty,
} from '../../lib/test-helpers';
import * as customHooks from '../../lib/custom-hooks';
import * as hooks from '../../lib/hooks';
import * as ga from '../../lib/google-analytics';
import ProjectItem, { Props } from '../projectItem';

jest.useFakeTimers();

config.disabled = true; // disable react-transitions-group transitions

describe('<ProjectItem />', () => {
  const renderComponent = (props: Props) => {
    // mock to prevent re-render
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    return render(<ProjectItem {...props} />);
  };
  const getRandomHeadingLevel = () =>
    getFakeNumber({ min: 2, max: 3 }) as 2 | 3;
  const createProject = (isBest: boolean) => {
    return {
      isBest,
      title: getFakeSentence(),
      description: getFakeSentences(),
      links: [
        {
          title: getFakeSentence(),
          url: getFakeUrl(),
        },
        {
          title: getFakeSentence(),
          url: getFakeDirectoryPath(), // for internal link check
        },
      ],
      imageUrl: getFakeImageUrl(),
      imageWidth: getFakeNumber({ min: 1 }),
      imageHeight: getFakeNumber({ min: 1 }),
      gifUrl: getFakeImageUrl(),
    };
  };

  describe('all props defined', () => {
    const project = createProject(true);

    beforeEach(() => {
      jest.spyOn(customHooks, 'useMotionSafe').mockReturnValue(true);

      renderComponent({
        project,
        headingLevel: getRandomHeadingLevel(),
      });
    });

    it('should render the highlight', () => {
      const highlightEl = screen.queryByText('Best Project');

      expect(highlightEl).toBeInTheDocument();
    });

    it('should render the title', () => {
      const titleEl = screen.queryByText(project.title);

      expect(titleEl).toBeInTheDocument();
    });

    it('should render the description', () => {
      const descEl = screen.queryByText(project.description);

      expect(descEl).toBeInTheDocument();
    });

    it('should render the image', () => {
      const { imageWidth, imageHeight } = project;
      const imgEl = screen.queryByAltText(`Screenshot of ${project.title}`);

      expect(imgEl).toHaveAttribute('src', project.imageUrl);
      expect(imgEl).toHaveAttribute('width', `${imageWidth}`);
      expect(imgEl).toHaveAttribute('height', `${imageHeight}`);
      expect(imgEl).toHaveAttribute('loading', 'lazy');

      // .toHaveStyle() not working properly with aspectRatio
      expect(imgEl?.style.aspectRatio).toBe(`${imageWidth} / ${imageHeight}`);
    });

    it('should render the links', () => {
      project.links.forEach((link) => {
        const linkEl = screen.queryByText(link.title);

        expect(linkEl?.tagName).toBe('A');
        expect(linkEl).toHaveAttribute('href', link.url);
        expect(linkEl).toHaveAttribute('target', '_blank');

        if (link.url.startsWith('/')) {
          expect(linkEl).not.toHaveAttribute('rel');
        } else {
          expect(linkEl).toHaveAttribute('rel', 'noopener noreferrer nofollow');
        }
      });
    });
  });

  describe('some props NOT defined', () => {
    const project = createProject(false);

    beforeEach(() => {
      jest.spyOn(customHooks, 'useMotionSafe').mockReturnValue(true);

      renderComponent({
        project,
        headingLevel: getRandomHeadingLevel(),
      });
    });

    it('should NOT render the highlight', () => {
      const highlightEl = screen.queryByText('Best Project');

      expect(highlightEl).not.toBeInTheDocument();
    });

    it('should render the title', () => {
      const titleEl = screen.queryByText(project.title);

      expect(titleEl).toBeInTheDocument();
    });

    it('should render the description', () => {
      const descEl = screen.queryByText(project.description);

      expect(descEl).toBeInTheDocument();
    });

    it('should render the image', () => {
      const imgEl = screen.queryByAltText(`Screenshot of ${project.title}`);

      expect(imgEl).toHaveAttribute('src', project.imageUrl);
      expect(imgEl).toHaveAttribute('loading', 'lazy');
    });

    it('should render the links', () => {
      project.links.forEach((link) => {
        const linkEl = screen.queryByText(link.title);

        expect(linkEl?.tagName).toBe('A');
        expect(linkEl).toHaveAttribute('href', link.url);
        expect(linkEl).toHaveAttribute('target', '_blank');

        if (link.url.startsWith('/')) {
          expect(linkEl).not.toHaveAttribute('rel');
        } else {
          expect(linkEl).toHaveAttribute('rel', 'noopener noreferrer nofollow');
        }
      });
    });
  });

  describe('<Info />', () => {
    beforeEach(() => {
      jest.spyOn(customHooks, 'useMotionSafe').mockReturnValue(true);
    });

    it('should have expected heading tag for level 2', () => {
      const project = createProject(getFakeBoolean());

      renderComponent({ project, headingLevel: 2 });

      const titleEl = screen.queryByText(project.title);

      expect(titleEl?.tagName).toBe('H2');
    });

    it('should have expected heading tag for level 3', () => {
      const project = createProject(getFakeBoolean());

      renderComponent({ project, headingLevel: 3 });

      const titleEl = screen.queryByText(project.title);

      expect(titleEl?.tagName).toBe('H3');
    });
  });

  describe('<LinkItem />', () => {
    const project = createProject(getFakeBoolean());
    const projectTitle = project.title;
    const projectLinks = project.links;

    beforeEach(() => {
      jest.spyOn(customHooks, 'useMotionSafe').mockReturnValue(true);

      renderComponent({
        project,
        headingLevel: getRandomHeadingLevel(),
      });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should track click', () => {
      projectLinks.forEach((link) => {
        const trackEventSpy = jest.spyOn(ga, 'trackEvent');

        const linkTitle = link.title;
        const linkEl = screen.queryByText(linkTitle) as HTMLAnchorElement;

        fireEvent.click(linkEl);

        expect(trackEventSpy).toBeCalledTimes(1);
        expect(trackEventSpy).toBeCalledWith({
          projectTitle,
          event: 'project_click',
          linkText: linkTitle,
          linkUrl: link.url,
        });

        trackEventSpy.mockClear();
      });
    });
  });

  describe('GIF logic', () => {
    const windowHeightOrig = window.innerHeight;
    const scrollYOrig = window.scrollY;

    afterEach(() => {
      jest.restoreAllMocks();

      setReadOnlyProperty(window, 'innerHeight', windowHeightOrig);
      setReadOnlyProperty(window, 'scrollY', scrollYOrig);
    });

    it('should NOT display GIF by default', () => {
      jest.spyOn(customHooks, 'useMotionSafe').mockReturnValue(true);

      const project = createProject(getFakeBoolean());

      renderComponent({
        project,
        headingLevel: getRandomHeadingLevel(),
      });

      const gifEl = screen.queryByAltText(`GIF of ${project.title}`);

      expect(gifEl).not.toBeInTheDocument();
    });

    it('should NOT display Downloading GIF by default', () => {
      jest.spyOn(customHooks, 'useMotionSafe').mockReturnValue(true);

      const project = createProject(getFakeBoolean());

      renderComponent({
        project,
        headingLevel: getRandomHeadingLevel(),
      });

      const tooltipEl = screen.queryByText('Downloading GIF...');

      expect(tooltipEl).toHaveClass('opacity-0');
    });

    it('should download GIF if project is in view', async () => {
      const startDownloadGifMock = jest.fn();
      const cancelDownloadGifMock = jest.fn();
      let onStartMock = () => {};
      let onCancelMock = (_res: { durationMs: number; progress: number }) => {};
      let onProgressMock = (_progress: number) => {};
      let onSuccessMock = (_res: { durationMs: number; data: string }) => {};
      let onErrorMock = (_err: any) => {};

      jest
        .spyOn(customHooks, 'useDownloadGif')
        .mockImplementation(
          ({ onStart, onCancel, onProgress, onSuccess, onError }) => {
            onStartMock = onStart;
            onCancelMock = onCancel;
            onProgressMock = onProgress;
            onSuccessMock = onSuccess;
            onErrorMock = onError;

            return {
              startDownloadGif: startDownloadGifMock,
              cancelDownloadGif: cancelDownloadGifMock,
            };
          }
        );

      // mock HTML properties that makes image to be in view
      setReadOnlyProperty(window, 'scrollY', 1);
      setReadOnlyProperty(window, 'innerHeight', 2);

      jest.spyOn(hooks, 'getRefValue').mockReturnValue({
        getBoundingClientRect: jest.fn(() => ({
          top: 0,
          height: 2,
        })),

        // for Tooltip component
        offsetTop: 0,
        offsetHeight: 0,
      });

      jest.spyOn(customHooks, 'useMotionSafe').mockReturnValue(true);

      const trackEventSpy = jest.spyOn(ga, 'trackEvent');
      const consoleErrorMock = jest
        .spyOn(console, 'error')
        .mockImplementation();

      const project = createProject(getFakeBoolean());

      renderComponent({
        project,
        headingLevel: getRandomHeadingLevel(),
      });

      // set isImgLoaded to "true"
      const imgEl = screen.queryByAltText(
        `Screenshot of ${project.title}`
      ) as HTMLImageElement;

      fireEvent.load(imgEl);

      cancelDownloadGifMock.mockClear(); // clear call on mount

      // set isImgInView to "true"
      act(() => {
        Window.emit('scroll');
      });

      // expect startDownloadGif is called
      await waitFor(() => expect(startDownloadGifMock).toBeCalledTimes(1));
      expect(cancelDownloadGifMock).not.toBeCalled();

      act(() => {
        jest.runOnlyPendingTimers(); // set isScrolling to "false"
        onStartMock();
      });

      // expect "Downloading GIF..." and progress to be displayed if project is in view
      const downloadingText = 'Downloading GIF...';

      expect(screen.queryByText(downloadingText)).toBeInTheDocument();

      onStartMock();

      expect(screen.queryByText('0')).toBeInTheDocument();

      // expect progress to be updated
      const downloadProgress = getFakeNumber({ min: 1, max: 99 });

      act(() => {
        onProgressMock(downloadProgress);
      });

      expect(screen.queryByText(downloadProgress)).toBeInTheDocument();

      // expect "Downloading GIF..." and progress NOT to be displayed if cancelled
      act(() => {
        Window.emit('scroll');
      });

      const cancelDurationMs = getFakeNumber({ min: 1 });
      const cancelProgress = getFakeNumber({ min: 1, max: 99 });

      onCancelMock({ durationMs: cancelDurationMs, progress: cancelProgress });

      await waitFor(() =>
        expect(screen.queryByText(downloadProgress)).not.toBeInTheDocument()
      );

      // expect to track GIF download cancel
      const projectTitle = project.title;

      expect(trackEventSpy).toBeCalledTimes(1);
      expect(trackEventSpy).toBeCalledWith({
        projectTitle,
        event: 'gif_auto_play_cancel',
        gifCancelTime: cancelDurationMs,
        gifCancelProgress: cancelProgress,
      });

      trackEventSpy.mockClear();

      // expect GIF to be displayed on download success
      const successDurationMs = getFakeNumber({ min: 1 });
      const gifData = getFakeImageUrl();

      act(() => {
        jest.runOnlyPendingTimers(); // set isScrolling to "false"
        onSuccessMock({ durationMs: successDurationMs, data: gifData });
      });

      const gifImgEl = screen.queryByAltText(`GIF of ${projectTitle}`);

      expect(gifImgEl).toHaveAttribute('src', gifData);

      // expect to track GIF download success
      expect(trackEventSpy).toBeCalledTimes(1);
      expect(trackEventSpy).toBeCalledWith({
        projectTitle,
        event: 'gif_auto_play_start',
        gifLoadTime: successDurationMs,
      });

      // expect to log error
      const errorMsg = getFakeSentence();

      onErrorMock(errorMsg);

      expect(consoleErrorMock).toBeCalledTimes(1);
      expect(consoleErrorMock).toBeCalledWith(
        'Error on Work GIF download:',
        errorMsg
      );
    });

    it('should NOT download GIF if project is in view and motion safe is false', async () => {
      jest.spyOn(customHooks, 'useMotionSafe').mockReturnValue(false);

      const startDownloadGifMock = jest.fn();

      jest.spyOn(customHooks, 'useDownloadGif').mockReturnValue({
        startDownloadGif: startDownloadGifMock,
        cancelDownloadGif: jest.fn(),
      });

      // mock HTML properties that makes image to be in view
      setReadOnlyProperty(window, 'scrollY', 1);
      setReadOnlyProperty(window, 'innerHeight', 2);

      jest.spyOn(hooks, 'getRefValue').mockReturnValue({
        getBoundingClientRect: jest.fn(() => ({
          top: 0,
          height: 2,
        })),

        // for Tooltip component
        offsetTop: 0,
        offsetHeight: 0,
      });

      const project = createProject(getFakeBoolean());

      renderComponent({
        project,
        headingLevel: getRandomHeadingLevel(),
      });

      // set isImgLoaded to "true"
      const imgEl = screen.queryByAltText(
        `Screenshot of ${project.title}`
      ) as HTMLImageElement;

      fireEvent.load(imgEl);

      // set isImgInView to "true"
      act(() => {
        Window.emit('scroll');
        jest.runOnlyPendingTimers();
      });

      expect(startDownloadGifMock).not.toBeCalled();
    });

    it('should cancel download GIF if project is NOT in view', async () => {
      jest.spyOn(customHooks, 'useMotionSafe').mockReturnValue(true);

      const startDownloadGifMock = jest.fn();
      const cancelDownloadGifMock = jest.fn();

      jest.spyOn(customHooks, 'useDownloadGif').mockReturnValue({
        startDownloadGif: startDownloadGifMock,
        cancelDownloadGif: cancelDownloadGifMock,
      });

      setReadOnlyProperty(window, 'scrollY', 0);
      setReadOnlyProperty(window, 'innerHeight', 2);

      jest.spyOn(hooks, 'getRefValue').mockReturnValue({
        getBoundingClientRect: jest.fn(() => ({
          top: -1,
          height: 1,
        })),

        // for Tooltip component
        offsetTop: 0,
        offsetHeight: 0,
      });

      const project = createProject(getFakeBoolean());

      renderComponent({
        project,
        headingLevel: getRandomHeadingLevel(),
      });

      act(() => {
        Window.emit('scroll');
        jest.runOnlyPendingTimers();
      });

      await waitFor(() => expect(startDownloadGifMock).not.toBeCalled());
      expect(cancelDownloadGifMock).toBeCalledTimes(1);
    });

    it('should handle container not found when route changes before request animation frame gets executed', () => {
      jest.spyOn(customHooks, 'useMotionSafe').mockReturnValue(true);

      const project = createProject(getFakeBoolean());
      const { container } = renderComponent({
        project,
        headingLevel: getRandomHeadingLevel(),
      });

      jest.spyOn(hooks, 'getRefValue').mockReturnValue(null);

      act(() => {
        Window.emit('scroll');
        jest.runOnlyPendingTimers();
      });

      expect(container).toBeInTheDocument();
    });
  });
});
