import cn from 'classnames';
import { HTMLProps } from 'react';

export default function Content({
  className,
  children,
  ...props
}: HTMLProps<HTMLElement>) {
  return (
    <article
      className={cn(
        'prose mx-auto w-11/12 max-w-screen-3xl dark:prose-dark',
        'sm:prose-lg',
        'lg:w-5/6',
        'xl:prose-xl',
        className
      )}
      data-clarity-region="article"
      data-testid="content"
      {...props}
    >
      {children}
    </article>
  );
}
