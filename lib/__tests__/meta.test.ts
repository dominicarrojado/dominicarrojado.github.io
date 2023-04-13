import { getFakeSentence, getRandomRouteExceptHome } from '@/lib/test-helpers';
import { Route } from '@/lib/types';
import { MAIN_TITLE, MAIN_URL } from '@/lib/constants';
import { getMetaTitle, getRouteCanonical } from '../meta';

describe('meta utilities', () => {
  describe('getMetaTitle()', () => {
    it('should return expected value', () => {
      const title = getFakeSentence();
      const res = getMetaTitle(title);

      expect(res).toBe(`${title} | ${MAIN_TITLE}`);
    });
  });

  describe('getRouteCanonical()', () => {
    it('should return expected value', () => {
      const route = getRandomRouteExceptHome();
      const res = getRouteCanonical(route);

      expect(res).toBe(`${MAIN_URL}${route}/`);
    });
  });
});
