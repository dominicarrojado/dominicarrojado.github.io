import { act, renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import Window from '@/modules/Window';
import DarkMode from '@/modules/DarkMode';
import {
  getFakeBoolean,
  getFakeNumber,
  getFakeSentence,
  getMatchMediaMock,
  setReadOnlyProperty,
} from '../test-helpers';
import * as axiosHelpers from '../axios';
import * as hooks from '../hooks';
import {
  useDarkModeEnabled,
  useDownloadGif,
  useMounted,
  useMotionSafe,
  useScrollOpacityEffect,
  useWindowLoaded,
  useWindowSize,
} from '../custom-hooks';

jest.mock('../axios', () => ({
  __esModule: true,
  ...jest.requireActual('../axios'),
}));
jest.mock('../hooks', () => ({
  __esModule: true,
  ...jest.requireActual('../hooks'),
}));

describe('hooks utilities', () => {
  describe('useMounted()', () => {
    it('should return true on mount', () => {
      const hook = renderHook(() => useMounted());

      return waitFor(() => expect(hook.result.current).toBe(true));
    });
  });

  describe('useWindowLoaded()', () => {
    beforeEach(() => {
      Window.init();
      Window.loaded = false;
    });

    afterEach(() => {
      Window.loaded = false;
    });

    it('should return initial value', () => {
      const hook = renderHook(() => useWindowLoaded());

      expect(hook.result.current).toBe(false);
    });

    it('should return true if window is loaded', () => {
      Window.loaded = true;

      const hook = renderHook(() => useWindowLoaded());

      expect(hook.result.current).toBe(true);
    });

    it('should update value on window load', () => {
      const hook = renderHook(() => useWindowLoaded());

      act(() => {
        Window.emit('load');
      });

      expect(hook.result.current).toBe(true);
    });
  });

  describe('useWindowSize()', () => {
    const windowWidthOrig = window.innerWidth;
    const windowHeightOrig = window.innerHeight;

    afterEach(() => {
      setReadOnlyProperty(window, 'innerWidth', windowWidthOrig);
      setReadOnlyProperty(window, 'innerHeight', windowHeightOrig);
    });

    it('should return initial value', () => {
      const windowWidth = getFakeNumber();
      const windowHeight = getFakeNumber();

      setReadOnlyProperty(window, 'innerWidth', windowWidth);
      setReadOnlyProperty(window, 'innerHeight', windowHeight);

      const hook = renderHook(() => useWindowSize());

      expect(hook.result.current).toEqual({ windowWidth, windowHeight });
    });

    it('should update value on window resize', () => {
      setReadOnlyProperty(window, 'innerWidth', getFakeNumber());
      setReadOnlyProperty(window, 'innerHeight', getFakeNumber());

      const hook = renderHook(() => useWindowSize());

      const windowWidth = getFakeNumber();
      const windowHeight = getFakeNumber();

      setReadOnlyProperty(window, 'innerWidth', windowWidth);
      setReadOnlyProperty(window, 'innerHeight', windowHeight);

      act(() => {
        Window.emit('resize');
      });

      expect(hook.result.current).toEqual({ windowWidth, windowHeight });
    });
  });

  describe('useDarkModeEnabled()', () => {
    const matchMediaOrig = window.matchMedia;

    beforeEach(() => {
      window.matchMedia = getMatchMediaMock({ matches: false });

      DarkMode.init();
      DarkMode.initialized = false;
      DarkMode.enabled = false;
    });

    afterEach(() => {
      jest.restoreAllMocks();

      DarkMode.initialized = false;
      DarkMode.enabled = false;
      DarkMode._documentElement = null;
      document.documentElement.classList.remove('dark');
      localStorage.clear();
      window.matchMedia = matchMediaOrig;
    });

    it('should return initial value', () => {
      const hook = renderHook(() => useDarkModeEnabled());
      const { isDarkModeReady, isDarkModeEnabled, toggleDarkMode } =
        hook.result.current;

      expect(isDarkModeReady).toBe(false);
      expect(isDarkModeEnabled).toBe(false);
      expect(typeof toggleDarkMode).toBe('function');
    });

    it('should return updated values if initialized', () => {
      const isEnabled = getFakeBoolean();

      DarkMode.initialized = true;
      DarkMode.enabled = isEnabled;

      const hook = renderHook(() => useDarkModeEnabled());
      const { isDarkModeReady, isDarkModeEnabled } = hook.result.current;

      expect(isDarkModeReady).toBe(true);
      expect(isDarkModeEnabled).toBe(isEnabled);
    });

    it('should update values on initialize', () => {
      const hook = renderHook(() => useDarkModeEnabled());
      const isEnabled = getFakeBoolean();

      act(() => {
        DarkMode.initialized = true;
        DarkMode.enabled = isEnabled;
        DarkMode.emit('init');
      });

      const { isDarkModeReady, isDarkModeEnabled } = hook.result.current;

      expect(isDarkModeReady).toBe(true);
      expect(isDarkModeEnabled).toBe(isEnabled);
    });

    it('should update value on toggle', () => {
      const hook = renderHook(() => useDarkModeEnabled());
      const { toggleDarkMode } = hook.result.current;

      act(() => {
        toggleDarkMode();
      });

      const { isDarkModeEnabled } = hook.result.current;

      expect(isDarkModeEnabled).toBe(true);
    });
  });

  describe('useMotionSafe()', () => {
    const matchMediaOrig = window.matchMedia;

    afterEach(() => {
      jest.restoreAllMocks();

      window.matchMedia = matchMediaOrig;
    });

    it('should return true if matches is true', () => {
      const matchMediaMock = getMatchMediaMock({ matches: true });

      window.matchMedia = matchMediaMock;

      const hook = renderHook(() => useMotionSafe());

      expect(hook.result.current).toBe(true);
      expect(matchMediaMock).toBeCalledTimes(1);
      expect(matchMediaMock).toBeCalledWith(
        '(prefers-reduced-motion: no-preference)'
      );
    });

    it('should return false if matches is false', () => {
      const matchMediaMock = getMatchMediaMock({ matches: false });

      window.matchMedia = matchMediaMock;

      const hook = renderHook(() => useMotionSafe());

      expect(hook.result.current).toBe(false);
      expect(matchMediaMock).toBeCalledTimes(1);
      expect(matchMediaMock).toBeCalledWith(
        '(prefers-reduced-motion: no-preference)'
      );
    });
  });

  describe('useScrollOpacityEffect()', () => {
    const scrollYOrig = window.scrollY;
    const matchMediaOrig = window.matchMedia;

    beforeEach(() => {
      window.matchMedia = getMatchMediaMock({ matches: true });
    });

    afterEach(() => {
      jest.restoreAllMocks();

      setReadOnlyProperty(window, 'scrollY', scrollYOrig);

      window.matchMedia = matchMediaOrig;
    });

    it('should return initial value', () => {
      const element = {
        offsetTop: getFakeNumber(),
        offsetHeight: getFakeNumber(),
      } as HTMLElement;
      const elementRef = { current: element };
      const hook = renderHook(() => useScrollOpacityEffect(elementRef));

      expect(hook.result.current).toBe(1);
    });

    it('should update value on scroll', () => {
      const scrollY = getFakeNumber();

      setReadOnlyProperty(window, 'scrollY', scrollY);

      const offsetTop = getFakeNumber();
      const offsetHeight = getFakeNumber();
      const element = { offsetTop, offsetHeight } as HTMLElement;
      const elementRef = { current: element };
      const expectedOpacity = Math.max(
        1 - scrollY / (offsetTop + offsetHeight),
        0
      );
      const hook = renderHook(() => useScrollOpacityEffect(elementRef));

      act(() => {
        Window.emit('scroll');
      });

      expect(hook.result.current).toBe(expectedOpacity);
    });

    it('should handle element NOT found', () => {
      setReadOnlyProperty(window, 'scrollY', getFakeNumber());

      const elementRef = { current: null };
      const hook = renderHook(() => useScrollOpacityEffect(elementRef));

      act(() => {
        Window.emit('scroll');
      });

      expect(hook.result.current).toBe(1);
    });

    it('should handle isMotionSafe is false', () => {
      setReadOnlyProperty(window, 'scrollY', getFakeNumber());

      window.matchMedia = getMatchMediaMock({ matches: false });

      const element = {
        offsetTop: getFakeNumber(),
        offsetHeight: getFakeNumber(),
      } as HTMLElement;
      const hook = renderHook(() =>
        useScrollOpacityEffect({ current: element })
      );

      act(() => {
        Window.emit('scroll');
      });

      expect(hook.result.current).toBe(1);
    });

    it('should destroy listener on unmount', () => {
      const windowOffSpy = jest.spyOn(Window, 'off');

      const element = {
        offsetTop: getFakeNumber(),
        offsetHeight: getFakeNumber(),
      } as HTMLElement;
      const hook = renderHook(() =>
        useScrollOpacityEffect({ current: element })
      );

      windowOffSpy.mockClear();

      hook.unmount();

      expect(windowOffSpy).toBeCalledTimes(1);
      expect(windowOffSpy).toBeCalledWith('scroll', expect.any(Function));
    });
  });

  describe('useDownloadGif()', () => {
    const axiosCancelTokenOrig = axios.CancelToken;

    beforeEach(() => {
      jest.spyOn(axios, 'get').mockImplementation();
      jest.spyOn(axios, 'isCancel').mockImplementation();
      setReadOnlyProperty(axios, 'CancelToken', {
        source: () => ({ token: null }),
      });
    });

    afterEach(() => {
      jest.restoreAllMocks();
      setReadOnlyProperty(axios, 'CancelToken', axiosCancelTokenOrig);
    });

    it('should return expected the functions', () => {
      const hook = renderHook(() =>
        useDownloadGif({
          url: 'test.gif',
          onStart: jest.fn(),
          onProgress: jest.fn(),
          onSuccess: jest.fn(),
          onCancel: jest.fn(),
          onError: jest.fn(),
        })
      );
      const { startDownloadGif, cancelDownloadGif } = hook.result.current;

      expect(typeof startDownloadGif).toBe('function');
      expect(typeof cancelDownloadGif).toBe('function');
    });

    it('should call onStart function', () => {
      const onStartMock = jest.fn();
      const hook = renderHook(() =>
        useDownloadGif({
          url: 'test.gif',
          onStart: onStartMock,
          onProgress: jest.fn(),
          onSuccess: jest.fn(),
          onCancel: jest.fn(),
          onError: jest.fn(),
        })
      );
      const { startDownloadGif } = hook.result.current;

      expect(onStartMock).toBeCalledTimes(0);

      startDownloadGif();

      expect(onStartMock).toBeCalledTimes(1);
    });

    it('should NOT call onStart twice', () => {
      const onStartMock = jest.fn();
      const hook = renderHook(() =>
        useDownloadGif({
          url: 'test.gif',
          onStart: onStartMock,
          onProgress: jest.fn(),
          onSuccess: jest.fn(),
          onCancel: jest.fn(),
          onError: jest.fn(),
        })
      );
      const { startDownloadGif } = hook.result.current;

      startDownloadGif();
      startDownloadGif();

      expect(onStartMock).toBeCalledTimes(1);
    });

    it('should call onProgress', async () => {
      const progressEvent = { loaded: 33, total: 100 };

      jest
        .spyOn(axios, 'get')
        .mockImplementation(async (_url, { onDownloadProgress }: any) => {
          onDownloadProgress(progressEvent);
        });

      const onProgressMock = jest.fn();
      const hook = renderHook(() =>
        useDownloadGif({
          url: 'test.gif',
          onStart: jest.fn(),
          onProgress: onProgressMock,
          onSuccess: jest.fn(),
          onCancel: jest.fn(),
          onError: jest.fn(),
        })
      );
      const { startDownloadGif } = hook.result.current;

      await startDownloadGif();

      expect(onProgressMock).toBeCalledTimes(1);
      expect(onProgressMock).toBeCalledWith(
        Math.round((progressEvent.loaded / progressEvent.total) * 100)
      );
    });

    it('should call onProgress (total is undefined)', async () => {
      const progressEvent = { loaded: 33, total: undefined };

      jest
        .spyOn(axios, 'get')
        .mockImplementation(async (_url, { onDownloadProgress }: any) => {
          onDownloadProgress(progressEvent);
        });

      const onProgressMock = jest.fn();
      const hook = renderHook(() =>
        useDownloadGif({
          url: 'test.gif',
          onStart: jest.fn(),
          onProgress: onProgressMock,
          onSuccess: jest.fn(),
          onCancel: jest.fn(),
          onError: jest.fn(),
        })
      );
      const { startDownloadGif } = hook.result.current;

      await startDownloadGif();

      expect(onProgressMock).toBeCalledTimes(1);
      expect(onProgressMock).toBeCalledWith(
        Math.round((progressEvent.loaded / 0) * 100)
      );
    });

    it('should call onSuccess', async () => {
      const gifData = 'data:image/gif;base64';

      jest
        .spyOn(axiosHelpers, 'getImageDataFromResponse')
        .mockImplementation(() => gifData);

      const onSuccessMock = jest.fn();
      const hook = renderHook(() =>
        useDownloadGif({
          url: 'test.gif',
          onStart: jest.fn(),
          onProgress: jest.fn(),
          onSuccess: onSuccessMock,
          onCancel: jest.fn(),
          onError: jest.fn(),
        })
      );
      const { startDownloadGif } = hook.result.current;

      await startDownloadGif();

      expect(onSuccessMock).toBeCalledTimes(1);
      expect(onSuccessMock).toBeCalledWith({
        data: gifData,
        durationMs: expect.any(Number),
      });
    });

    it('should call onCancel', async () => {
      const progressEvent = { loaded: 33, total: 100 };

      jest
        .spyOn(axios, 'get')
        .mockImplementation((_url, { onDownloadProgress }: any) => {
          onDownloadProgress(progressEvent);
          throw 'unexpected error';
        });

      jest.spyOn(axios, 'isCancel').mockReturnValue(true);

      const onCancelMock = jest.fn();
      const hook = renderHook(() =>
        useDownloadGif({
          url: 'test.gif',
          onStart: jest.fn(),
          onProgress: jest.fn(),
          onSuccess: jest.fn(),
          onCancel: onCancelMock,
          onError: jest.fn(),
        })
      );

      const { startDownloadGif } = hook.result.current;

      await startDownloadGif();

      expect(onCancelMock).toBeCalledTimes(1);
      expect(onCancelMock).toBeCalledWith({
        progress: Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        ),
        durationMs: expect.any(Number),
      });
    });

    it('should call onError', async () => {
      const unexpectedError = getFakeSentence();

      jest.spyOn(axios, 'get').mockRejectedValue(unexpectedError);

      const onErrorMock = jest.fn();
      const hook = renderHook(() =>
        useDownloadGif({
          url: 'test.gif',
          onStart: jest.fn(),
          onProgress: jest.fn(),
          onSuccess: jest.fn(),
          onCancel: jest.fn(),
          onError: onErrorMock,
        })
      );

      const { startDownloadGif } = hook.result.current;

      await startDownloadGif();

      expect(onErrorMock).toBeCalledTimes(1);
      expect(onErrorMock).toBeCalledWith(unexpectedError);
    });

    it('should cancel request', () => {
      const cancelMock = jest.fn();
      jest
        .spyOn(hooks, 'getRefValue')
        .mockImplementation(() => ({ cancel: cancelMock }));

      const hook = renderHook(() =>
        useDownloadGif({
          url: 'test.gif',
          onStart: jest.fn(),
          onProgress: jest.fn(),
          onSuccess: jest.fn(),
          onCancel: jest.fn(),
          onError: jest.fn(),
        })
      );
      const { cancelDownloadGif } = hook.result.current;

      cancelDownloadGif();

      expect(cancelMock).toBeCalledTimes(1);
    });

    it('should NOT cancel twice', () => {
      jest.spyOn(hooks, 'getRefValue').mockImplementation(() => null);

      const hook = renderHook(() =>
        useDownloadGif({
          url: 'test.gif',
          onStart: jest.fn(),
          onProgress: jest.fn(),
          onSuccess: jest.fn(),
          onCancel: jest.fn(),
          onError: jest.fn(),
        })
      );
      const { cancelDownloadGif } = hook.result.current;

      expect(() => {
        cancelDownloadGif();
      }).not.toThrow();
    });
  });
});
