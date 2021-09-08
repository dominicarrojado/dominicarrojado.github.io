import cn from 'classnames';
import { HTMLProps } from 'react';

function Content({ className, children, ...props }: HTMLProps<HTMLElement>) {
  return (
    <article
      className={cn(
        'w-11/12 max-w-screen-3xl mx-auto prose dark:prose-dark',
        'sm:prose-lg',
        'lg:w-5/6',
        'xl:prose-xl',
        className
      )}
      data-testid="content"
      {...props}
    >
      {children}
    </article>
  );
}

export default Content;
