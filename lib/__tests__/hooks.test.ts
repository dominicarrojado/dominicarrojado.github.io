import { renderHook, act } from '@testing-library/react-hooks';
import { getFakeString } from '../test-helpers';
import { getRefValue, useStateRef } from '../hooks';

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
});
