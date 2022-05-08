import { useRef, useState, RefObject, useEffect } from 'react';
import { AxiosStatic, CancelTokenSource } from 'axios';
import Window from '../modules/Window';
import DarkMode from '../modules/DarkMode';
import { getImageDataFromResponse } from './axios';
import { getRefValue } from './hooks';

export function useMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    window.requestAnimationFrame(() => setIsMounted(true));
  }, []);

  return isMounted;
}

export function useWindowLoaded() {
  const [isWindowLoaded, setIsWindowLoaded] = useState(false);

  useEffect(() => {
    setIsWindowLoaded(Window.loaded);

    const windowOnLoad = () => setIsWindowLoaded(true);

    Window.on('load', windowOnLoad);

    return () => {
      Window.off('load', windowOnLoad);
    };
  }, []);

  return isWindowLoaded;
}

export function useWindowSize() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const windowOnResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    windowOnResize();

    Window.on('resize', windowOnResize);

    return () => {
      Window.off('resize', windowOnResize);
    };
  });

  return { windowWidth, windowHeight };
}

export function useDarkModeEnabled() {
  const [isDarkModeReady, setIsDarkModeReady] = useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

  useEffect(() => {
    const darkModeOnReady = () => {
      setIsDarkModeReady(DarkMode.initialized);
      setIsDarkModeEnabled(DarkMode.enabled);
    };
    const darkModeOnChange = (enabled: boolean) =>
      setIsDarkModeEnabled(enabled);

    DarkMode.on('init', darkModeOnReady);
    DarkMode.on('change', darkModeOnChange);

    darkModeOnReady();

    return () => {
      DarkMode.off('init', darkModeOnReady);
      DarkMode.off('change', darkModeOnChange);
    };
  });

  return {
    isDarkModeReady,
    isDarkModeEnabled,
    toggleDarkMode: DarkMode.toggle,
  };
}

export function useMotionSafe() {
  const [isMotionSafe, setIsMotionSafe] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(prefers-reduced-motion: no-preference)'
    );
    const mediaQueryOnChange = () => setIsMotionSafe(mediaQuery.matches);

    mediaQueryOnChange();

    mediaQuery.addEventListener('change', mediaQueryOnChange);

    return () => {
      mediaQuery.removeEventListener('change', mediaQueryOnChange);
    };
  }, []);

  return isMotionSafe;
}

export function useScrollOpacityEffect(ref: RefObject<HTMLElement>) {
  const isMotionSafe = useMotionSafe();
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const windowOnScroll = () => {
      const element = getRefValue(ref);

      if (!element) {
        return;
      }

      const { offsetTop, offsetHeight } = element;
      const newOpacity = Math.max(
        1 - window.pageYOffset / (offsetTop + offsetHeight),
        0
      );

      setOpacity(newOpacity);
    };

    if (isMotionSafe) {
      Window.on('scroll', windowOnScroll);
    } else {
      setOpacity(1);
    }

    return () => {
      Window.off('scroll', windowOnScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMotionSafe]);

  return opacity;
}

export function useDownloadGif({
  url,
  onStart,
  onProgress,
  onSuccess,
  onCancel,
  onError,
}: {
  url: string;
  onStart: () => void;
  onProgress: (progress: number) => void;
  onSuccess: (e: { durationMs: number; data: string }) => void;
  onCancel: (e: { durationMs: number; progress: number }) => void;
  onError: (err: any) => void;
}) {
  const isDownloadingRef = useRef(false);
  const axiosSourceRef = useRef<CancelTokenSource | null>(null);

  const startDownloadGif = async () => {
    if (getRefValue(isDownloadingRef)) {
      return;
    }

    isDownloadingRef.current = true;

    onStart();

    let axios: AxiosStatic | undefined;
    let downloadStartMs = 0;
    let progress = 0;

    try {
      downloadStartMs = Date.now();

      // dynamically import axios
      axios = (await import('axios')).default;

      axiosSourceRef.current = axios.CancelToken.source();

      const res = await axios.get(url, {
        responseType: 'arraybuffer',
        cancelToken: getRefValue(axiosSourceRef).token,
        onDownloadProgress: (e) => {
          progress = Math.round((e.loaded / e.total) * 100);
          onProgress(progress);
        },
      });

      onSuccess({
        durationMs: Date.now() - downloadStartMs,
        data: getImageDataFromResponse(res),
      });
    } catch (err) {
      if (axios && axios.isCancel(err)) {
        onCancel({
          progress,
          durationMs: Date.now() - downloadStartMs,
        });
      } else {
        onError(err);
      }
    } finally {
      isDownloadingRef.current = false;
    }
  };
  const cancelDownloadGif = () => {
    const axiosSource = getRefValue(axiosSourceRef);

    if (axiosSource) {
      axiosSource.cancel();
      axiosSourceRef.current = null;
    }
  };

  return { startDownloadGif, cancelDownloadGif };
}
