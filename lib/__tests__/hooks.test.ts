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

    beforeEach(() => {
      jest.restoreAllMocks();

      setReadOnlyProperty(window, 'pageYOffset', pageYOffsetOrig);
    });

    it('should return initial value', () => {
      const element = {
        offsetTop: getFakeNumber(),
        offsetHeight: getFakeNumber(),
      } as HTMLElement;
      const hook = renderHook(() =>
        useScrollOpacityEffect({ current: element })
      );

      expect(hook.result.current).toBe(1);
    });

    it('should update value on scroll', () => {
      const pageYOffset = getFakeNumber();

      setReadOnlyProperty(window, 'pageYOffset', pageYOffset);

      const offsetTop = getFakeNumber();
      const offsetHeight = getFakeNumber();
      const element = { offsetTop, offsetHeight } as HTMLElement;
      const expectedOpacity = Math.max(
        1 - pageYOffset / (offsetTop + offsetHeight),
        0
      );
      const hook = renderHook(() =>
        useScrollOpacityEffect({ current: element })
      );

      act(() => {
        Window.emit('scroll');
      });

      expect(hook.result.current).toBe(expectedOpacity);
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
