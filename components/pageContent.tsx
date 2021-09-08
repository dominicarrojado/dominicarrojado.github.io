import cn from 'classnames';
import { HTMLProps } from 'react';
import { useWindowLoaded } from '../lib/custom-hooks';
import Content from './content';

function PageContent({
  className,
  children,
  ...props
}: HTMLProps<HTMLElement>) {
  const shouldDisplay = useWindowLoaded();

  return (
    <Content
      className={cn(
        'transform transition-transform-opacity duration-700 delay-1500',
        {
          ['opacity-0 translate-y-10']: !shouldDisplay,
        },
        className
      )}
      data-testid="page-content"
      {...props}
    >
      {children}
    </Content>
  );
}

export default PageContent;
