import { ReactNode } from 'react';
import cn from 'classnames';

export type Props = { children: ReactNode };

export default function HeroMainSection({ children }: Props) {
  return (
    <section
      className={cn(
        'relative flex flex-col bg-gray-550 items-center justify-center overflow-hidden min-h-full py-32',
        'dark:bg-gray-650',
        'sm:px-20',
        'lg:px-32'
      )}
      data-testid="container"
    >
      {children}
    </section>
  );
}
