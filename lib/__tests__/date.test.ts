import { getFormattedDate, getMonthName } from '../date';

describe('date utilities', () => {
  describe('getMonthName()', () => {
    it('should return month name', () => {
      const monthNameObj = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December',
      };

      Object.entries(monthNameObj).forEach(([monthIdx, monthName]) => {
        const res = getMonthName(Number(monthIdx));

        expect(res).toBe(monthName);
      });
    });
  });

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
