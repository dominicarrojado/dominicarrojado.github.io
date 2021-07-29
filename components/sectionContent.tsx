import cn from 'classnames';
import { ReactNode } from 'react';

function SectionContent({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <p className={cn('mt-6 text-center', className)}>{children}</p>;
}

export default SectionContent;
