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
          'transition-colors duration-300 hover:text-black group-hover:text-black'
        )}
        target={!isExternal ? target : '_blank'}
        rel={!isExternal ? rel : 'noopener noreferrer nofollow'}
        {...props}
      >
        {children}
        <SvgChevronRight
          className={cn(
            'inline-block w-3 h-3 ml-1 text-black opacity-30',
            'transform transition duration-300 group-hover:translate-x-1.5 group-hover:opacity-100',
            'sm:w-4 sm:h-4',
            'xl:w-5 xl:h-5 xl:ml-2'
          )}
        />
      </a>
    );
  }
);

TextArrowLink.displayName = 'TextArrowLink';

export default TextArrowLink;
