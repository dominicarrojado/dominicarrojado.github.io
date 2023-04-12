import { getFakeNumber } from '../test-helpers';
import { getTouchEventData } from '../dom';

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
});
