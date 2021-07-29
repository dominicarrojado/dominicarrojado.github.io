import cn from 'classnames';
import { ReactNode } from 'react';

function SectionTitle({ children }: { children: ReactNode }) {
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

export default SectionTitle;
