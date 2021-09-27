import { MAIN_URL } from '../constants';
import {
  getFakeDirectoryPath,
  getFakeDomainWord,
  getFakeUrl,
  setReadOnlyProperty,
} from '../test-helpers';
import { checkIsLocalhost, checkIsUrlInternal } from '../location';

describe('location utilities', () => {
  describe('checkIsLocalhost()', () => {
    const locationOrig = window.location;

    beforeEach(() => {
      // delete window.location in order to override it
      delete (window as any).location;
    });

    afterEach(() => {
      setReadOnlyProperty(window, 'location', locationOrig);
    });

    it('should return true if localhost', () => {
      setReadOnlyProperty(window, 'location', {
        hostname: 'localhost',
      });

      expect(checkIsLocalhost()).toBe(true);
    });

    it('should return false if NOT localhost', () => {
      setReadOnlyProperty(window, 'location', {
        hostname: getFakeDomainWord(),
      });

      expect(checkIsLocalhost()).toBe(false);
    });
  });

  describe('checkIsUrlInternal()', () => {
    it('should return true if internal', () => {
      const url = `${MAIN_URL}${getFakeDirectoryPath()}`;

      expect(checkIsUrlInternal(url)).toBe(true);
    });

    it('should return false if NOT internal', () => {
      const url = getFakeUrl();

      expect(checkIsUrlInternal(url)).toBe(false);
    });
  });
});
