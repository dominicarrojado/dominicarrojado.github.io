import { ReactNode, useRef } from 'react';
import cn from 'classnames';
import { useMounted, useScrollOpacityEffect } from '../lib/custom-hooks';

export type Props = {
  children: ReactNode;
};

export default function HeroSubTitle({ children }: Props) {
  const shouldDisplay = useMounted();
  const titleRef = useRef<HTMLDivElement>(null);
  const opacity = useScrollOpacityEffect(titleRef);

  return (
    <div ref={titleRef} className="overflow-hidden py-2" style={{ opacity }}>
      <h1
        className={cn(
          'text-3xl font-bold leading-tight text-white',
          'transform transition duration-700',
          'motion-reduce:transition-none',
          'sm:text-4xl',
          'md:text-5xl',
          'lg:text-6xl',
          'xl:text-7xl',
          {
            [shouldDisplay
              ? 'translate-y-0 opacity-100'
              : 'translate-y-full opacity-0']: true,
          }
        )}
      >
        {children}
      </h1>
    </div>
  );
}
