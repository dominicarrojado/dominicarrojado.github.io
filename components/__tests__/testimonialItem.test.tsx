import { render, screen } from '@testing-library/react';
import {
  getFakeCompanyName,
  getFakeJobTitle,
  getFakeName,
  getFakeSentences,
} from '@/lib/test-helpers';
import TestimonialItem from '../testimonialItem';

describe('<TestimonialItem />', () => {
  const testimonial = {
    name: getFakeName(),
    jobTitle: getFakeJobTitle(),
    companyName: getFakeCompanyName(),
    quote: getFakeSentences(),
  };

  beforeEach(() => {
    render(<TestimonialItem testimonial={testimonial} />);
  });

  it('should render the name', () => {
    const nameEl = screen.queryByText(testimonial.name);

    expect(nameEl).toBeInTheDocument();
  });

  it('should render the job title', () => {
    const jobTitleEl = screen.queryByText(testimonial.jobTitle);

    expect(jobTitleEl).toBeInTheDocument();
  });

  it('should render the company name', () => {
    const companyNameEl = screen.queryByText(testimonial.companyName);

    expect(companyNameEl).toBeInTheDocument();
  });

  it('should render the quote', () => {
    const textContent = testimonial.quote.replace(/<p>|\<\/p>/g, '');
    const quoteEl = screen.queryByText(textContent);

    expect(quoteEl).toBeInTheDocument();
  });
});
