import { getFakeNumber, setReadOnlyProperty } from '../test-helpers';
import { copyTextToClipboard, getTouchEventData } from '../dom';

describe('dom utilities', () => {
  describe('copyTextToClipboard()', () => {
    const clipboardOrig = navigator.clipboard;

    beforeEach(() => {
      setReadOnlyProperty(navigator, 'clipboard', {});
    });

    afterEach(() => {
      setReadOnlyProperty(navigator, 'clipboard', clipboardOrig);
    });

    it('should copy text to clipboard', () => {
      const writeTextMock = jest.fn();

      navigator.clipboard.writeText = writeTextMock;

      const text = 'Hello World';
      const res = copyTextToClipboard(text);

      expect(res).toBe(true);
      expect(writeTextMock).toBeCalledTimes(1);
      expect(writeTextMock).toBeCalledWith(text);
    });

    it('should handle unexpected error', () => {
      const consoleErrorOrig = console.error;
      const consoleErrorMock = jest.fn();

      console.error = consoleErrorMock;

      const unexpectedError = 'unexpected error';

      navigator.clipboard.writeText = jest.fn(() => {
        throw unexpectedError;
      });

      const res = copyTextToClipboard('Hello World');

      expect(res).toBe(false);
      expect(consoleErrorMock).toBeCalledTimes(1);
      expect(consoleErrorMock).toBeCalledWith(
        'Error on copy text to clipboard:',
        unexpectedError
      );

      console.error = consoleErrorOrig;
    });
  });

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
