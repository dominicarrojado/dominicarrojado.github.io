import { getFakeNumber } from '../test-helpers';
import { PAGINATION_MAX_LENGTH } from '../constants';
import { getPagination } from '../common';

describe('common utils', () => {
  describe('getPagination()', () => {
    it('should handle pagination less than max', () => {
      const lastPage = getFakeNumber({
        min: 1,
        max: PAGINATION_MAX_LENGTH - 1,
      });
      const currentPage = getFakeNumber({ min: 1, max: lastPage });
      const paginationItems = getPagination(currentPage, lastPage);
      const res: Array<number> = [];

      for (let i = 1; i <= lastPage; i++) {
        res.push(i);
      }

      expect(paginationItems).toEqual(res);
      expect(paginationItems).toHaveLength(lastPage);
    });

    it('should handle pagination equal to max', () => {
      const lastPage = PAGINATION_MAX_LENGTH;
      const currentPage = getFakeNumber({ min: 1, max: lastPage });
      const paginationItems = getPagination(currentPage, lastPage);
      const res: Array<number> = [];

      for (let i = 1; i <= lastPage; i++) {
        res.push(i);
      }

      expect(paginationItems).toEqual(res);
      expect(paginationItems).toHaveLength(lastPage);
    });

    it('should handle current page in the front', () => {
      const lastPage = getFakeNumber({ min: PAGINATION_MAX_LENGTH + 1 });
      const currentPage = getFakeNumber({ min: 1, max: 4 });
      const paginationItems = getPagination(currentPage, lastPage);

      expect(paginationItems).toEqual([1, 2, 3, 4, 5, NaN, lastPage]);
      expect(paginationItems).toHaveLength(PAGINATION_MAX_LENGTH);
    });

    it('should handle current page in the rear', () => {
      const lastPage = getFakeNumber({ min: PAGINATION_MAX_LENGTH + 1 });
      const currentPage = getFakeNumber({ min: lastPage - 3, max: lastPage });
      const paginationItems = getPagination(currentPage, lastPage);
      const res = [lastPage];

      for (let i = lastPage - 1; i > lastPage - 5; i--) {
        res.unshift(i);
      }

      expect(paginationItems).toEqual([1, NaN, ...res]);
      expect(paginationItems).toHaveLength(PAGINATION_MAX_LENGTH);
    });

    it('should handle current page in the middle', () => {
      const lastPage = getFakeNumber({ min: PAGINATION_MAX_LENGTH + 2 });
      const currentPage = 5;
      const paginationItems = getPagination(currentPage, lastPage);

      expect(paginationItems).toEqual([1, NaN, 4, 5, 6, NaN, lastPage]);
    });
  });
});
