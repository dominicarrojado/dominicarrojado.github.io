import { ForwardedRef, forwardRef, HTMLProps } from 'react';
import cn from 'classnames';
import SvgChevronRight from './svgChevronRight';

const TextArrowLink = forwardRef(
  (
    {
      target,
      rel,
      children,
      isExternal,
      ...props
    }: HTMLProps<HTMLAnchorElement> & { isExternal?: boolean },
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    return (
      <a
        ref={ref}
        className={cn(
          'group inline-flex items-center font-normal select-none',
          'dark:hover:text-white',
          'transition-colors duration-300 hover:text-black group-hover:text-black'
        )}
        target={!isExternal ? target : '_blank'}
        rel={!isExternal ? rel : 'noopener noreferrer nofollow'}
        {...props}
      >
        {children}
        <SvgChevronRight
          className={cn(
            'inline-block w-2 h-2 ml-2 text-black opacity-30',
            'dark:text-white',
            'transform transition duration-300 group-hover:translate-x-1.5 group-hover:opacity-100',
            'sm:w-2.5 sm:h-2.5 sm:ml-2.5',
            'md:w-3 md:h-3 md:ml-3',
            'xl:w-3.5 xl:h-3.5'
          )}
        />
      </a>
    );
  }
);

TextArrowLink.displayName = 'TextArrowLink';

export default TextArrowLink;
