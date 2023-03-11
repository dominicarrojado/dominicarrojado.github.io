import { useRef } from 'react';
import cn from 'classnames';
import { useMounted, useScrollOpacityEffect } from '../lib/custom-hooks';

export default function HeroMainTitle() {
  const titleRef = useRef<HTMLDivElement>(null);
  const shouldDisplay = useMounted();
  const opacity = useScrollOpacityEffect(titleRef);

  return (
    <div ref={titleRef} className="overflow-hidden" style={{ opacity }}>
      <h1
        className={cn(
          'mt-2 px-4 text-base font-light text-white',
          'transform transition duration-1000 delay-1250',
          'motion-reduce:transition-none',
          'sm:text-lg',
          'md:mt-3 md:text-2xl',
          'xl:mt-4 xl:text-3xl',
          {
            ['opacity-0 translate-y-full']: !shouldDisplay,
          }
        )}
        data-testid="title"
      >
        Guides, Tips and Tricks to Web Development
      </h1>
    </div>
  );
}
