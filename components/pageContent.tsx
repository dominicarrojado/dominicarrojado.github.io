import cn from 'classnames';
import { HTMLProps } from 'react';
import { useMounted } from '../lib/custom-hooks';
import Content from './content';

export type Props = HTMLProps<HTMLElement>;

export default function PageContent({ className, children, ...props }: Props) {
  const shouldDisplay = useMounted();

  return (
    <Content
      className={cn(
        'transform transition-transform-opacity duration-700 delay-1500',
        'motion-reduce:transition-none',
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
