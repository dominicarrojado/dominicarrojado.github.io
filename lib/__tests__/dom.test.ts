import { getFakeNumber, setReadOnlyProperty } from '../test-helpers';
import { getScrollWidth, getTouchEventData } from '../dom';

describe('dom utilities', () => {
  describe('getTouchEventData()', () => {
    it('should return first of changed touches', () => {
      const changedTouch = {
        clientX: getFakeNumber(),
        clientY: getFakeNumber(),
      };
      const touchEvent = {
        changedTouches: [changedTouch],
      } as any;

      expect(getTouchEventData(touchEvent)).toEqual(changedTouch);
    });

    it('should handle undefined changedTouches', () => {
      const mouseEvent = {
        clientX: getFakeNumber(),
        clientY: getFakeNumber(),
      } as any;

      expect(getTouchEventData(mouseEvent)).toEqual(mouseEvent);
    });
  });

  describe('getScrollWidth()', () => {
    const windowWidthOrig = window.innerWidth;
    const bodyWidthOrig = document.body.offsetWidth;

    afterEach(() => {
      setReadOnlyProperty(window, 'innerWidth', windowWidthOrig);
      setReadOnlyProperty(document.body, 'offsetWidth', bodyWidthOrig);
    });

    it('should return expected value', () => {
      const windowWidth = getFakeNumber({ min: 1 });
      const bodyWidth = getFakeNumber({ min: windowWidth + 1 });

      setReadOnlyProperty(window, 'innerWidth', windowWidth);
      setReadOnlyProperty(document.body, 'offsetWidth', bodyWidth);

      const res = getScrollWidth();

      expect(res).toBe(windowWidth - bodyWidth);
    });
  });
});
