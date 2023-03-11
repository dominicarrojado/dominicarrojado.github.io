import { ReactNode } from 'react';
import cn from 'classnames';
import { useMounted } from '../lib/custom-hooks';

export type Props = { children: ReactNode };

export default function HeroMainSection({ children }: Props) {
  const shouldDisplay = useMounted();

  return (
    <section
      className={cn(
        'relative flex flex-col bg-gray-550 items-center justify-center overflow-hidden min-h-full py-32',
        'dark:bg-gray-750',
        'transform transition-transform ease-in-out duration-700',
        'motion-reduce:transition-none',
        'sm:px-20',
        'lg:px-32',
        {
          [shouldDisplay ? 'translate-y-0' : '-translate-y-full']: true,
        }
      )}
      data-testid="container"
    >
      {children}
    </section>
  );
}
