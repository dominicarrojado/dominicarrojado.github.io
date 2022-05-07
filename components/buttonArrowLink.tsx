import { ForwardedRef, forwardRef, HTMLAttributes } from 'react';
import cn from 'classnames';
import { Button } from 'reakit/Button';
import SvgChevronRight from './svgChevronRight';

export type Props = HTMLAttributes<HTMLButtonElement> & {
  as?: 'button' | 'span';
  withIcon?: boolean;
};

const ButtonArrowLink = forwardRef(
  (
    { children, as = 'button', withIcon = true, ...props }: Props,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const combinedProps = {
      ...props,
      ref,
      className: cn(
        'group inline-block items-center font-normal select-none',
        'transition-colors duration-300 hover:text-black group-hover:text-black',
        'motion-reduce:transition-none',
        'dark:hover:text-white dark:group-hover:text-white'
      ),
    };
    const body = (
      <>
        {children}
        {withIcon && (
          <SvgChevronRight
            className={cn(
              'inline-block w-2 h-2 ml-2 text-black opacity-30',
              'dark:text-white',
              'transform transition duration-300 group-hover:translate-x-1.5 group-hover:opacity-100',
              'motion-reduce:transition-none',
              'sm:w-2.5 sm:h-2.5 sm:ml-2.5',
              'md:w-3 md:h-3 md:ml-3',
              'xl:w-3.5 xl:h-3.5'
            )}
          />
        )}
      </>
    );

    if (as === 'button') {
      return <Button {...combinedProps}>{body}</Button>;
    } else {
      return <span {...combinedProps}>{body}</span>;
    }
  }
);

ButtonArrowLink.displayName = 'ButtonArrowLink';

export default ButtonArrowLink;
