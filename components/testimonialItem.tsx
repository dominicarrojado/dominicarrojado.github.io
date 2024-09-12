import cn from 'classnames';
import SvgQuote from './svgQuote';
import { Testimonial } from '../lib/types';

type Props = {
  testimonial: Testimonial;
};

export default function TestimonialItem({ testimonial }: Props) {
  return (
    <li
      className={cn(
        'group flex w-full shrink-0 px-3',
        'xs:w-11/12',
        'sm:w-5/6',
        'md:w-7/12',
        'lg:w-1/2',
        'xl:w-1/3',
        'transform transition-transform duration-300 odd:-rotate-1 even:rotate-1 hover:rotate-0',
        'motion-reduce:transition-none',
        'md:px-5'
      )}
    >
      <figure
        className={cn(
          'overflow-hidden rounded-lg border shadow-md',
          'dark:border-gray-400 dark:border-opacity-30',
          'transition-shadow hover:shadow-xl',
          'motion-reduce:transition-none'
        )}
      >
        <blockquote
          className={cn(
            'rounded-t-xl bg-white p-5',
            'dark:bg-gray-650',
            'sm:p-6',
            'md:p-8 md:text-xl md:leading-8'
          )}
        >
          <SvgQuote
            className={cn(
              'mb-2 mt-2 h-6 w-6 text-gray-300',
              'dark:text-gray-400 dark:text-opacity-40',
              '-translate-y-1.5 transform',
              'sm:h-7 sm:w-7',
              'md:h-8 md:w-8 md:-translate-y-2',
              'xl:h-9 xl:w-9 xl:-translate-y-2.5'
            )}
          />
          {testimonial.quote}
        </blockquote>
        <figcaption
          className={cn(
            'bg-gray-100 p-5',
            'dark:bg-gray-750',
            'sm:p-6',
            'md:p-8'
          )}
        >
          <div className="font-normal">{testimonial.name}</div>
          <small className="block">{testimonial.jobTitle}</small>
          <small className="block">{testimonial.companyName}</small>
        </figcaption>
      </figure>
    </li>
  );
}
