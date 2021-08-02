import { HTMLProps } from 'react';
import cn from 'classnames';

function Section({ className, children, ...props }: HTMLProps<HTMLElement>) {
  return (
    <section
      className={cn(
        'pt-16 pb-20 px-6',
        'sm:pt-20 sm:pb-24 sm:px-8',
        'md:pt-24 md:pb-28 lg:px-10',
        'xl:pt-28 xl:pb-32',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export default Section;
