import { ForwardedRef, forwardRef, HTMLProps } from 'react';
import cn from 'classnames';

type Props = HTMLProps<HTMLElement>;

export default function Section({ className, children, ...props }: Props) {
  return (
    <section
      className={cn(
        'px-6 pb-20 pt-16',
        'sm:px-8 sm:pb-24 sm:pt-20',
        'md:pb-28 md:pt-24 lg:px-10',
        'xl:pb-32 xl:pt-28',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
