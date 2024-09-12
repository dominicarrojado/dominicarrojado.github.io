import cn from 'classnames';
import { ReactNode } from 'react';

export type Props = {
  children: ReactNode;
  isMinHeightFull?: boolean;
};

export default function HeroSection({ isMinHeightFull, children }: Props) {
  return (
    <section
      className={cn(
        'relative flex flex-col items-center justify-center overflow-hidden bg-gray-550 px-6 text-center',
        'dark:bg-gray-650',
        'sm:px-20',
        'lg:px-32',
        !isMinHeightFull ? 'min-h-96 py-28' : 'min-h-full py-32'
      )}
    >
      {children}
    </section>
  );
}
