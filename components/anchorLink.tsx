import { ForwardedRef, forwardRef, HTMLProps } from 'react';
import cn from 'classnames';
import SvgChevronRight from './svgChevronRight';

const AnchorLink = forwardRef(
  (
    { children, ...props }: HTMLProps<HTMLAnchorElement>,
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    return (
      <a
        ref={ref}
        className={cn(
          'group inline-block items-center font-normal',
          'transition-colors duration-300 hover:text-black'
        )}
        {...props}
      >
        {children}
        <SvgChevronRight
          className={cn(
            'inline-block w-3 h-3 -mt-px ml-1 text-black opacity-30',
            'transform transition duration-300 group-hover:translate-x-1.5 group-hover:opacity-100',
            'sm:w-4 sm:h-4',
            'xl:w-5 xl:h-5'
          )}
        />
      </a>
    );
  }
);

AnchorLink.displayName = 'AnchorLink';

export default AnchorLink;
