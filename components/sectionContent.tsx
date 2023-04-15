import cn from 'classnames';
import { ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
};

export default function SectionContent({ className, children }: Props) {
  return <p className={cn('mt-6 text-center', className)}>{children}</p>;
}
