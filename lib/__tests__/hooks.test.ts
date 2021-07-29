import { renderHook, act } from '@testing-library/react-hooks';
import Window from '../../modules/Window';
import { useStateRef, getRefValue, useScrollOpacityEffect } from '../hooks';
import {
  getFakeNumber,
  getFakeString,
  setReadOnlyProperty,
} from '../test-helpers';

describe('hooks utilities', () => {
  describe('getRefValue()', () => {
    it('should return expected value', () => {
      const node = 'node';
      const ref = { current: node };

      expect(getRefValue(ref)).toBe(node);
    });
  });

  describe('useStateRef()', () => {
    it('should return expected array', () => {
      const initialValue = getFakeString();
      const hook = renderHook(() => useStateRef(initialValue));
      const [state, setState, ref] = hook.result.current;

      expect(state).toBe(initialValue);
      expect(typeof setState).toBe('function');
      expect(ref).toEqual({ current: initialValue });
    });

    it('should update state and ref', () => {
      const initialValue = getFakeString();
      const newValue = getFakeString();
      const hook = renderHook(() => useStateRef(initialValue));
      const [_state, setState] = hook.result.current;

      act(() => {
        setState(newValue);
      });

      const [state, _setState, ref] = hook.result.current;

      expect(state).toBe(newValue);
      expect(ref).toEqual({ current: newValue });
    });
  });

  describe('useScrollOpacityEffect()', () => {
    const pageYOffsetOrig = window.pageYOffset;

    afterEach(() => {
      jest.restoreAllMocks();

      setReadOnlyProperty(window, 'pageYOffset', pageYOffsetOrig);
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
      const pageYOffset = getFakeNumber();

      setReadOnlyProperty(window, 'pageYOffset', pageYOffset);

      const offsetTop = getFakeNumber();
      const offsetHeight = getFakeNumber();
      const element = { offsetTop, offsetHeight } as HTMLElement;
      const elementRef = { current: element };
      const expectedOpacity = Math.max(
        1 - pageYOffset / (offsetTop + offsetHeight),
        0
      );
      const hook = renderHook(() => useScrollOpacityEffect(elementRef));

      act(() => {
        Window.emit('scroll');
      });

      expect(hook.result.current).toBe(expectedOpacity);
    });

    it('should handle element NOT found', () => {
      const pageYOffset = getFakeNumber();

      setReadOnlyProperty(window, 'pageYOffset', pageYOffset);

      const elementRef = { current: null };
      const hook = renderHook(() => useScrollOpacityEffect(elementRef));

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

      hook.unmount();

      expect(windowOffSpy).toBeCalledTimes(1);
      expect(windowOffSpy).toBeCalledWith('scroll', expect.any(Function));
    });
  });
});
