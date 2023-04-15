import cn from 'classnames';
import { ReactNode } from 'react';

type Props = { children: ReactNode };

export default function SectionTitle({ children }: Props) {
  return (
    <h2
      className={cn(
        'text-center text-2xl font-bold',
        'sm:text-3xl',
        'md:text-4xl',
        'xl:text-5xl'
      )}
    >
      {children}
    </h2>
  );
}
