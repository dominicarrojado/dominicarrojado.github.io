import { getAllTestimonialsData } from '../testimonials';

describe('testimonials utilities', () => {
  describe('getAllTestimonialsData()', () => {
    it('should return expected value', async () => {
      const testimonials = await getAllTestimonialsData();

      expect(testimonials).toEqual(
        expect.arrayContaining([
          {
            order: expect.any(Number),
            name: expect.any(String),
            jobTitle: expect.any(String),
            companyName: expect.any(String),
            contentHtml: expect.any(String),
          },
        ])
      );

      // expect sorting is correct
      let maxOrder = -Infinity;

      testimonials.forEach(({ order }) => {
        expect(order).toBeGreaterThanOrEqual(maxOrder);

        maxOrder = order;
      });
    });
  });
});
