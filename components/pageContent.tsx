import cn from 'classnames';
import { HTMLProps } from 'react';
import { useWindowLoaded } from '../lib/custom-hooks';

function PageContent({
  className,
  children,
  ...props
}: HTMLProps<HTMLElement>) {
  const shouldDisplay = useWindowLoaded();

  return (
    <article
      className={cn(
        'w-11/12 max-w-screen-3xl mx-auto prose',
        'transform transition duration-700 delay-1500',
        'sm:prose-lg',
        'lg:w-5/6',
        'xl:prose-xl',
        {
          ['opacity-0 translate-y-10']: !shouldDisplay,
        },
        className
      )}
      data-testid="content"
      {...props}
    >
      {children}
    </article>
  );
}

export default PageContent;
