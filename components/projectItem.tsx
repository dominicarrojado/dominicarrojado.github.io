import cn from 'classnames';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { Transition } from 'react-transition-group';
import Window from '../modules/Window';
import { trackEvent } from '../lib/google-analytics';
import { getRefValue } from '../lib/hooks';
import { useDownloadGif, useMounted, useWindowSize } from '../lib/custom-hooks';
import { checkIsUrlInternal } from '../lib/location';
import SvgStar from './svgStar';
import TextArrowLink from './textArrowLink';
import Spinner from './spinner';
import Tooltip from './tooltip';
import {
  GoogleAnalyticsEvents,
  Project,
  ProjectLink,
  TooltipPosition,
} from '../lib/types';

export default function ProjectItem({
  project,
  className,
  style,
}: {
  project: Project;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <li
      className={cn(
        'flex flex-col items-center mt-16 first:mt-0',
        'sm:mt-24',
        'lg:mt-48 lg:flex-row',
        'xl:mt-52',
        className
      )}
      style={style}
    >
      <ImageContainer
        imageUrl={project.imageUrl}
        gifUrl={project.gifUrl}
        title={project.title}
      />
      <Info
        title={project.title}
        description={project.description}
        links={project.links}
        isBest={project.isBest}
      />
    </li>
  );
}

function ImageContainer({
  imageUrl,
  gifUrl,
  title,
}: {
  imageUrl: string;
  gifUrl: string;
  title: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const { windowHeight } = useWindowSize();
  const [isScrolling, setIsScrolling] = useState(false);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [isImgInView, setIsImgInView] = useState(false);
  const [gifProgress, setGifProgress] = useState(0);
  const [gifData, setGifData] = useState('');
  const { startDownloadGif, cancelDownloadGif } = useDownloadGif({
    url: gifUrl,
    onStart: () => {
      setGifProgress(0);
    },
    onProgress: (progress) => {
      setGifProgress(progress);
    },
    onSuccess: ({ durationMs, data }) => {
      setGifProgress(100);
      setGifData(data);

      trackEvent({
        event: GoogleAnalyticsEvents.GIF_AUTO_PLAY_START,
        projectTitle: title,
        gifLoadTime: durationMs,
      });
    },
    onCancel: ({ durationMs, progress }) => {
      trackEvent({
        event: GoogleAnalyticsEvents.GIF_AUTO_PLAY_CANCEL,
        projectTitle: title,
        gifCancelTime: durationMs,
        gifCancelProgress: progress,
      });
    },
    onError: (err: any) => {
      console.error('Error on Work GIF download:', err);
    },
  });
  const imgOnLoad = () => setIsImgLoaded(true);
  const shouldDisplayGifLoader = Boolean(
    isImgLoaded && isImgInView && !isScrolling && gifProgress !== 100
  );
  const shouldDisplayGifImg = Boolean(gifData && isImgInView && !isScrolling);

  useEffect(() => {
    let timeout: number;

    const onScroll = () => {
      window.requestAnimationFrame(() => {
        const containerEl = getRefValue(containerRef);

        if (!containerEl) {
          return;
        }

        const { pageYOffset, innerHeight } = window;
        const { top, height } = containerEl.getBoundingClientRect();

        setIsScrolling(true);

        if (
          pageYOffset !== 0 && // to prevent showing GIF when switching to projects page
          top >= 0 &&
          top + height <= innerHeight
        ) {
          setIsImgInView(true);
        } else {
          setIsImgInView(false);
        }

        clearTimeout(timeout);
        timeout = window.setTimeout(() => {
          setIsScrolling(false);
        }, 200);
      });
    };

    Window.on('scroll', onScroll);

    return () => {
      clearTimeout(timeout);
      Window.off('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!gifData) {
      if (isImgInView) {
        startDownloadGif();
      } else {
        cancelDownloadGif();
      }
    }
  }, [startDownloadGif, cancelDownloadGif, isImgInView, gifData]);

  return (
    <div className={cn('flex justify-center items-center w-full', 'lg:w-4/6')}>
      <div
        ref={containerRef}
        className="relative inline-flex min-w-11 min-h-24"
      >
        {!isImgLoaded && <ImageLoader />}
        <LazyLoad offset={windowHeight} once>
          <img
            src={imageUrl}
            alt={`Screenshot of ${title}`}
            className="max-w-full h-auto shadow-3xl z-10"
            draggable={false}
            onLoad={imgOnLoad}
          />
        </LazyLoad>
        <Transition
          in={shouldDisplayGifImg}
          nodeRef={imgRef}
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          {(state) => (
            <img
              ref={imgRef}
              src={gifData}
              alt={`GIF of ${title}`}
              className={cn(
                'absolute top-0 left-0 w-full h-full z-20',
                'transition-opacity duration-300',
                {
                  [state === 'entered' ? 'opacity-100 delay-300' : 'opacity-0']:
                    true,
                }
              )}
              draggable={false}
            />
          )}
        </Transition>
        <GifLoader
          shouldDisplay={shouldDisplayGifLoader}
          progress={gifProgress}
          title={title}
        />
      </div>
    </div>
  );
}

function ImageLoader() {
  return (
    <Spinner
      className={cn(
        'absolute inset-0 w-7 h-7 my-10 mx-auto border-2 z-0',
        'sm:w-9 sm:h-9',
        'md:w-11 md:h-11 md:border-4'
      )}
      color="#999999"
    />
  );
}

function GifLoader({
  shouldDisplay,
  progress,
  title,
}: {
  shouldDisplay: boolean;
  progress: number;
  title: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMounted = useMounted();
  const text = 'Downloading GIF...';
  const loaderOnMouseEnter = () => {
    trackEvent({
      event: GoogleAnalyticsEvents.PROJECT_INFO_HOVER,
      projectTitle: title,
      hoverText: text,
    });
  };

  return (
    <Transition
      in={isMounted && shouldDisplay}
      nodeRef={containerRef}
      timeout={300}
      mountOnEnter
      unmountOnExit
    >
      {(state) => (
        <div
          ref={containerRef}
          className={cn(
            'absolute top-3 right-3 bg-black bg-opacity-60 rounded-full p-1 z-30',
            'transition-opacity duration-300',
            'sm:top-4 sm:right-4',
            {
              [state === 'entered' ? 'opacity-100' : 'opacity-0']: true,
            }
          )}
          data-testid="gif-loader"
          onMouseEnter={loaderOnMouseEnter}
        >
          <Spinner
            className={cn(
              'w-7 h-7 border-2',
              'transition-opacity duration-1000',
              'sm:w-9 sm:h-9',
              'md:w-11 md:h-11 md:border-4'
            )}
            color="#ffffff"
          />
          <div
            className={cn(
              'absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-xs',
              'sm:text-sm',
              'md:text-base'
            )}
          >
            {progress}
          </div>
          <Tooltip position={TooltipPosition.LEFT} className="mr-3">
            {text}
          </Tooltip>
        </div>
      )}
    </Transition>
  );
}

function Info({
  title,
  description,
  links,
  isBest,
}: {
  title: string;
  description: string;
  links: Array<ProjectLink>;
  isBest?: boolean;
}) {
  return (
    <div
      className={cn(
        'w-full mt-8 text-center',
        'md:mt-10',
        'lg:w-2/6 lg:mt-0 lg:pl-10 lg:text-left',
        'xl:px-14'
      )}
    >
      <h3
        className={cn(
          'inline-flex items-center font-bold text-lg',
          'sm:text-xl',
          'md:text-2xl',
          'xl:text-3xl'
        )}
      >
        {title}
      </h3>
      {isBest && <Highlight />}
      <p className={cn('mt-1', 'md:mt-4')}>{description}</p>
      <div className={cn('mt-6', 'md:mt-8')}>
        <ul>
          {links.map((link, idx) => (
            <LinkItem key={idx} {...link} projectTitle={title} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function Highlight() {
  return (
    <div
      className={cn(
        'flex justify-center items-center mt-1 text-xs text-yellow-400 font-normal uppercase select-none',
        'md:text-sm',
        'lg:justify-start'
      )}
    >
      <SvgStar
        className={cn(
          'inline-block w-2.5 h-2.5 mr-1 -mt-0.5',
          'md:w-3.5 md:h-3.5'
        )}
      />
      Best Project
    </div>
  );
}

function LinkItem({
  title,
  url,
  projectTitle,
}: ProjectLink & { projectTitle: string }) {
  const isClickedRef = useRef(false);
  const isExternal = !checkIsUrlInternal(url);
  const onMouseLeave = () => {
    if (!getRefValue(isClickedRef)) {
      trackEvent({
        projectTitle,
        event: GoogleAnalyticsEvents.PROJECT_HOVER,
        hoverText: title,
        hoverUrl: url,
      });
    }
  };
  const onClick = () => {
    isClickedRef.current = true;
    trackEvent({
      projectTitle,
      event: GoogleAnalyticsEvents.PROJECT_CLICK,
      linkText: title,
      linkUrl: url,
    });
  };

  return (
    <li className={cn('mt-4', 'sm:mt-2', 'lg:mt-1')}>
      <TextArrowLink
        href={url}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        target={!isExternal ? '_blank' : undefined}
        isExternal={isExternal}
      >
        {title}
      </TextArrowLink>
    </li>
  );
}