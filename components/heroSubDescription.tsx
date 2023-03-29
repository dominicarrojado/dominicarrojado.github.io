import { ReactNode, useRef } from 'react';
import cn from 'classnames';
import { useMounted, useScrollOpacityEffect } from '../lib/custom-hooks';

export type Props = {
  children: ReactNode;
};

export default function HeroSubDescription({ children }: Props) {
  const shouldDisplay = useMounted();
  const descRef = useRef<HTMLDivElement>(null);
  const opacity = useScrollOpacityEffect(descRef);

  return (
    <div ref={descRef} className="overflow-hidden" style={{ opacity }}>
      <p
        className={cn(
          'font-light text-white',
          'transform transition duration-700',
          'motion-reduce:transition-none',
          'xl:text-2xl',
          {
            [shouldDisplay
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-full']: true,
          }
        )}
      >
        {children}
      </p>
    </div>
  );
}
