import { render, screen } from '@testing-library/react';
import {
  getFakeCompanyName,
  getFakeJobTitle,
  getFakeName,
  getFakeNumber,
  getFakeSentences,
} from '../../lib/test-helpers';
import { Testimonial } from '../../lib/types';
import TestimonialItem from '../testimonialItem';

describe('<TestimonialItem />', () => {
  const testimonial = {
    order: getFakeNumber(),
    name: getFakeName(),
    jobTitle: getFakeJobTitle(),
    companyName: getFakeCompanyName(),
    contentHtml: `<p>${getFakeSentences()}</p>`,
  } as Testimonial;

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
    const textContent = testimonial.contentHtml.replace(/<p>|\<\/p>/g, '');
    const quoteEl = screen.queryByText(textContent);

    expect(quoteEl).toBeInTheDocument();
  });
});
