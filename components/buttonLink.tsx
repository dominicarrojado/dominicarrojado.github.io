import { ForwardedRef, forwardRef, HTMLAttributes } from 'react';
import cn from 'classnames';
import SvgChevronRight from './svgChevronRight';

const ButtonLink = forwardRef(
  (
    {
      children,
      withIcon = true,
      ...props
    }: HTMLAttributes<HTMLButtonElement> & { withIcon?: boolean },
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'group inline-block items-center font-normal select-none',
          'transition-colors duration-300 hover:text-black group-hover:text-black'
        )}
        {...props}
      >
        {children}
        {withIcon && (
          <SvgChevronRight
            className={cn(
              'inline-block w-3 h-3 -mt-px ml-1 text-black opacity-30',
              'transform transition duration-300 group-hover:translate-x-1.5 group-hover:opacity-100',
              'sm:w-4 sm:h-4',
              'xl:w-5 xl:h-5 xl:-mt-1'
            )}
          />
        )}
      </button>
    );
  }
);

ButtonLink.displayName = 'ButtonLink';

export default ButtonLink;
