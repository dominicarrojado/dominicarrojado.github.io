import {
  getFakeDomainWord,
  getFakeWord,
  setReadOnlyProperty,
} from '../test-helpers';
import { checkIsLocalhost, getSearchParams } from '../location';

describe('location utilities', () => {
  const locationOrig = window.location;

  beforeEach(() => {
    // delete window.location in order to override it
    delete (window as any).location;
  });

  afterEach(() => {
    setReadOnlyProperty(window, 'location', locationOrig);
  });

  describe('checkIsLocalhost()', () => {
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

  describe('getSearchParams()', () => {
    it('should return expected value', () => {
      const key = getFakeWord();
      const value = getFakeWord();

      setReadOnlyProperty(window, 'location', {
        href: `${locationOrig.href}?${key}=${value}`,
      });

      const res = getSearchParams(key);

      expect(res).toBe(value);
    });
  });
});
