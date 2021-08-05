import { copyTextToClipboard, getTouchEventData } from '../dom';
import { getFakeNumber } from '../test-helpers';

describe('dom utilities', () => {
  describe('copyTextToClipboard()', () => {
    const execCommandOrig = document.execCommand;

    afterEach(() => {
      document.execCommand = execCommandOrig;
    });

    it('should copy text to clipboard', () => {
      const execCommandMock = jest.fn();

      document.execCommand = execCommandMock;

      const res = copyTextToClipboard('Hello World');

      expect(res).toBe(true);
      expect(execCommandMock).toBeCalledTimes(1);
      expect(execCommandMock).toBeCalledWith('copy');
    });

    it('should handle unexpected error', () => {
      const consoleErrorOrig = console.error;
      const consoleErrorMock = jest.fn();

      console.error = consoleErrorMock;

      const unexpectedError = 'unexpected error';

      document.execCommand = jest.fn(() => {
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
