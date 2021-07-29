import { render, screen } from '@testing-library/react';
import TestimonialsSection from '../testimonialsSection';

describe('<TestimonialsSection />', () => {
  beforeEach(() => {
    render(<TestimonialsSection />);
  });

  it('should have expected title', () => {
    const titleEl = screen.queryByText('Testimonials');

    expect(titleEl?.tagName).toBe('H2');
  });

  it('should have expected content', () => {
    const content =
      "Kind words from people I've worked with and currently working with.";

    expect(screen.queryByText(content)).toBeInTheDocument();
  });
});
