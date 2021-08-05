import cn from 'classnames';
import SvgQuote from './svgQuote';
import { Testimonial } from '../lib/types';

function TestimonialItem({ testimonial }: { testimonial: Testimonial }) {
  return (
    <li
      className={cn(
        'group w-full flex px-3',
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
              'w-10 h-10 text-gray-300',
              'transform -translate-y-1.5 rotate-180',
              'sm:w-11 sm:h-11',
              'md:w-14 md:h-14 md:-translate-y-2',
              'xl:w-16 xl:h-16 xl:-translate-y-2.5'
            )}
          />
          <div
            dangerouslySetInnerHTML={{ __html: testimonial.contentHtml }}
          ></div>
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
