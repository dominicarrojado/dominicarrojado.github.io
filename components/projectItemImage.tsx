import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import Window from '../modules/Window';
import { trackEvent } from '../lib/google-analytics';
import { getRefValue } from '../lib/hooks';
import { useDownloadGif, useMotionSafe } from '../lib/custom-hooks';
import ProjectItemImageLoader from './projectItemImageLoader';
import ProjectItemGifLoader from './projectItemGifLoader';
import { GoogleAnalyticsEvent } from '../lib/types';

export type Props = {
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  gifUrl: string;
  title: string;
};

export default function ProjectItemImage({
  imageUrl,
  imageWidth,
  imageHeight,
  gifUrl,
  title,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [isImgInView, setIsImgInView] = useState(false);
  const [gifProgress, setGifProgress] = useState(0);
  const [gifData, setGifData] = useState('');
  const isMotionSafe = useMotionSafe();
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
        event: GoogleAnalyticsEvent.GIF_AUTO_PLAY_START,
        projectTitle: title,
        gifLoadTime: durationMs,
      });
    },
    onCancel: ({ durationMs, progress }) => {
      trackEvent({
        event: GoogleAnalyticsEvent.GIF_AUTO_PLAY_CANCEL,
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
  const imgCommonProps = {
    width: imageWidth,
    height: imageHeight,
    className: 'z-10 max-w-full h-auto shadow-3xl',
    style: { aspectRatio: `${imageWidth} / ${imageHeight}` },
    draggable: false,
  };
  const shouldDisplayGifLoader = Boolean(
    isMotionSafe &&
      isImgLoaded &&
      isImgInView &&
      !isScrolling &&
      gifProgress !== 100
  );
  const shouldDisplayGifImg = Boolean(
    isMotionSafe && gifData && isImgInView && !isScrolling
  );

  useEffect(() => {
    let timeout: number;

    const onScroll = () => {
      window.requestAnimationFrame(() => {
        const containerEl = getRefValue(containerRef);

        if (!containerEl) {
          return;
        }

        const { scrollY, innerHeight } = window;
        const { top, height } = containerEl.getBoundingClientRect();

        setIsScrolling(true);

        if (
          scrollY !== 0 && // to prevent showing GIF when switching to projects page
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
    if (isMotionSafe && !gifData) {
      if (isImgInView) {
        startDownloadGif();
      } else {
        cancelDownloadGif();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMotionSafe, isImgInView, gifData]);

  return (
    <div className={cn('flex justify-center items-center w-full', 'lg:w-4/6')}>
      <div
        ref={containerRef}
        className="relative inline-flex min-w-11 min-h-24"
      >
        {!isImgLoaded && <ProjectItemImageLoader />}
        <img
          {...imgCommonProps}
          src={imageUrl}
          alt={`Screenshot of ${title}`}
          onLoad={imgOnLoad}
          loading="lazy"
        />
        <img
          ref={imgRef}
          src={gifData}
          alt={`GIF of ${title}`}
          className={cn(
            'absolute top-0 left-0 w-full h-full z-20',
            'transition-opacity duration-300',
            'motion-reduce:transition-none',
            shouldDisplayGifImg ? 'opacity-100' : 'opacity-0'
          )}
          draggable={false}
        />
        {shouldDisplayGifLoader && (
          <ProjectItemGifLoader progress={gifProgress} />
        )}
      </div>
    </div>
  );
}
