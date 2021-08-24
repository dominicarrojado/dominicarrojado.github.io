import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import { forceVisible } from 'react-lazyload';
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
import { MAIN_URL } from '../../lib/constants';
import ProjectItem from '../projectItem';

jest.useFakeTimers();

config.disabled = true; // disable react-transitions-group transitions

describe('<ProjectItem />', () => {
  describe('all props defined', () => {
    const project = createProject(true);

    beforeEach(() => {
      render(<ProjectItem project={project} />);

      forceVisible();
    });

    it('should render the highlight', () => {
      const highlightEl = screen.queryByText('Best Project');

      expect(highlightEl).toBeInTheDocument();
    });

    it('should render the title', () => {
      const titleEl = screen.queryByText(project.title);

      expect(titleEl?.tagName).toBe('H3');
    });

    it('should render the description', () => {
      const descEl = screen.queryByText(project.description);

      expect(descEl).toBeInTheDocument();
    });

    it('should render the image', () => {
      const imgEl = screen.queryByAltText(`Screenshot of ${project.title}`);

      expect(imgEl).toHaveAttribute('src', project.imageUrl);
    });

    it('should render the links', () => {
      project.links.forEach((link) => {
        const linkEl = screen.queryByText(link.title);

        expect(linkEl?.tagName).toBe('A');
        expect(linkEl).toHaveAttribute('href', link.url);
        expect(linkEl).toHaveAttribute('target', '_blank');

        if (link.url.startsWith(MAIN_URL)) {
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
      render(<ProjectItem project={project} />);

      forceVisible();
    });

    it('should NOT render the highlight', () => {
      const highlightEl = screen.queryByText('Best Project');

      expect(highlightEl).not.toBeInTheDocument();
    });

    it('should render the title', () => {
      const titleEl = screen.queryByText(project.title);

      expect(titleEl?.tagName).toBe('H3');
    });

    it('should render the description', () => {
      const descEl = screen.queryByText(project.description);

      expect(descEl).toBeInTheDocument();
    });

    it('should render the image', () => {
      const imgEl = screen.queryByAltText(`Screenshot of ${project.title}`);

      expect(imgEl).toHaveAttribute('src', project.imageUrl);
    });

    it('should render the links', () => {
      project.links.forEach((link) => {
        const linkEl = screen.queryByText(link.title);

        expect(linkEl?.tagName).toBe('A');
        expect(linkEl).toHaveAttribute('href', link.url);
        expect(linkEl).toHaveAttribute('target', '_blank');

        if (link.url.startsWith(MAIN_URL)) {
          expect(linkEl).not.toHaveAttribute('rel');
        } else {
          expect(linkEl).toHaveAttribute('rel', 'noopener noreferrer nofollow');
        }
      });
    });
  });

  describe('<LinkItem />', () => {
    const project = createProject(getFakeBoolean());
    const projectTitle = project.title;
    const projectLinks = project.links;

    beforeEach(() => {
      render(<ProjectItem project={project} />);

      forceVisible();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should track as hover if NOT clicked', () => {
      projectLinks.forEach((link) => {
        const trackEventSpy = jest.spyOn(ga, 'trackEvent');

        const linkTitle = link.title;
        const linkEl = screen.queryByText(linkTitle) as HTMLAnchorElement;

        fireEvent.mouseLeave(linkEl);

        expect(trackEventSpy).toBeCalledTimes(1);
        expect(trackEventSpy).toBeCalledWith({
          projectTitle,
          event: 'project_hover',
          hoverText: linkTitle,
          hoverUrl: link.url,
        });

        trackEventSpy.mockClear();
      });
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

    it('should NOT track as hover if clicked', () => {
      projectLinks.forEach((link) => {
        const trackEventSpy = jest.spyOn(ga, 'trackEvent');

        const linkTitle = link.title;
        const linkEl = screen.queryByText(linkTitle) as HTMLAnchorElement;

        fireEvent.click(linkEl);

        trackEventSpy.mockClear();

        fireEvent.mouseLeave(linkEl);

        expect(trackEventSpy).not.toBeCalled();
      });
    });
  });

  describe('GIF logic', () => {
    const project = createProject(getFakeBoolean());
    const windowHeightOrig = window.innerHeight;
    const requestAnimationFrameOrig = window.requestAnimationFrame;
    const renderComponent = () => {
      render(<ProjectItem project={project} />);

      forceVisible();
    };

    beforeEach(() => {
      window.requestAnimationFrame = jest.fn((callback: any) => callback());
    });

    afterEach(() => {
      jest.restoreAllMocks();

      setReadOnlyProperty(window, 'innerHeight', windowHeightOrig);
      window.requestAnimationFrame = requestAnimationFrameOrig;
    });

    it('should NOT display GIF by default', () => {
      renderComponent();

      const gifEl = screen.queryByAltText(`GIF of ${project.title}`);

      expect(gifEl).not.toBeInTheDocument();
    });

    it('should NOT display Downloading GIF by default', () => {
      renderComponent();

      const tooltipEl = screen.queryByText('Downloading GIF...');

      expect(tooltipEl).not.toBeInTheDocument();
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

      const trackEventSpy = jest.spyOn(ga, 'trackEvent');
      const consoleErrorMock = jest
        .spyOn(console, 'error')
        .mockImplementation();

      renderComponent();

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

      // expect to track mouse enter on GIF loader
      const gifLoaderEl = screen.queryByTestId('gif-loader') as HTMLDivElement;

      fireEvent.mouseEnter(gifLoaderEl);

      const projectTitle = project.title;

      expect(trackEventSpy).toBeCalledTimes(1);
      expect(trackEventSpy).toBeCalledWith({
        projectTitle,
        event: 'project_info_hover',
        hoverText: downloadingText,
      });

      trackEventSpy.mockClear();

      // expect "Downloading GIF..." and progress NOT to be displayed if cancelled
      act(() => {
        Window.emit('scroll');
      });

      const cancelDurationMs = getFakeNumber({ min: 1 });
      const cancelProgress = getFakeNumber({ min: 1, max: 99 });

      onCancelMock({ durationMs: cancelDurationMs, progress: cancelProgress });

      expect(screen.queryByText(downloadingText)).not.toBeInTheDocument();
      expect(screen.queryByText(downloadProgress)).not.toBeInTheDocument();

      // expect to track GIF download cancel
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

    it('should cancel download GIF if project is NOT in view', async () => {
      const startDownloadGifMock = jest.fn();
      const cancelDownloadGifMock = jest.fn();

      jest.spyOn(customHooks, 'useDownloadGif').mockReturnValue({
        startDownloadGif: startDownloadGifMock,
        cancelDownloadGif: cancelDownloadGifMock,
      });

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

      renderComponent();

      act(() => {
        Window.emit('scroll');
      });

      await waitFor(() => expect(startDownloadGifMock).not.toBeCalled());
      expect(cancelDownloadGifMock).toBeCalledTimes(1);
    });
  });
});

function createProject(isBest: boolean) {
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
        url: `${MAIN_URL}${getFakeDirectoryPath()}`, // for internal link check
      },
    ],
    imageUrl: getFakeImageUrl(),
    gifUrl: getFakeImageUrl(),
  };
}
