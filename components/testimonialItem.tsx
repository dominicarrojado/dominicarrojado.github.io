import cn from 'classnames';
import SvgQuote from './svgQuote';
import { Testimonial } from '../lib/types';

function TestimonialItem({ testimonial }: { testimonial: Testimonial }) {
  return (
    <li
      className={cn(
        'group w-full flex flex-shrink-0 px-3',
        'xs:w-11/12',
        'sm:w-5/6',
        'md:w-7/12',
        'lg:w-1/2',
        'xl:w-1/3',
        'transform transition-transform duration-300 even:rotate-1 odd:-rotate-1 hover:rotate-0',
        'md:px-5'
      )}
    >
      <figure
        className={cn(
          'border rounded-lg shadow-md overflow-hidden',
          'transition-shadow hover:shadow-xl'
        )}
      >
        <blockquote
          className={cn(
            'rounded-t-xl bg-white p-5',
            'sm:p-6',
            'md:p-8 md:text-xl md:leading-8'
          )}
        >
          <SvgQuote
            className={cn(
              'w-6 h-6 mt-2 mb-2 text-gray-300',
              'transform -translate-y-1.5',
              'sm:w-7 sm:h-7',
              'md:w-8 md:h-8 md:-translate-y-2',
              'xl:w-9 xl:h-9 xl:-translate-y-2.5'
            )}
          />
          {testimonial.quote}
        </blockquote>
        <figcaption className={cn('bg-gray-100 p-5', 'sm:p-6', 'md:p-8')}>
          <div className="font-normal">{testimonial.name}</div>
          <small className="block">{testimonial.jobTitle}</small>
          <small className="block">{testimonial.companyName}</small>
        </figcaption>
      </figure>
    </li>
  );
}

export default TestimonialItem;
