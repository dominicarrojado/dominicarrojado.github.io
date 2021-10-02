import { getFormattedDate } from '../date';

describe('date utilities', () => {
  describe('getFormattedDate()', () => {
    it('should return formatted date', () => {
      const dateStringObj = {
        '2021-01-13': 'January 13, 2021',
        '2020-10-02': 'October 2, 2020',
        '2022-12-25': 'December 25, 2022',
      };

      Object.entries(dateStringObj).forEach(([dateString, formattedDate]) => {
        const res = getFormattedDate(dateString);

        expect(res).toBe(formattedDate);
      });
    });
  });
});
