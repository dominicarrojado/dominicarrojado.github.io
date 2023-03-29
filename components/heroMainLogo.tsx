import { useRef } from 'react';
import cn from 'classnames';
import { useMounted, useScrollOpacityEffect } from '../lib/custom-hooks';
import SvgLogo from './svgLogo';
import HeroMainLogoPart from './heroMainLogoPart';

export default function HeroMainLogo() {
  const titleRef = useRef<HTMLDivElement>(null);
  const shouldDisplay = useMounted();
  const opacity = useScrollOpacityEffect(titleRef);

  return (
    <div ref={titleRef} className="relative inline-flex" style={{ opacity }}>
      <HeroMainLogoPart isLeft />
      <SvgLogo
        className={cn(
          'w-40 h-40 text-white',
          'transform transition-transform-opacity duration-1250',
          'motion-reduce:transition-none',
          'sm:w-60 sm:h-60',
          'md:w-80 md:h-80',
          'xl:w-96 xl:h-96',
          {
            ['opacity-0 -translate-y-4']: !shouldDisplay,
          }
        )}
        role="img"
        aria-label="Dominic Arrojado logo"
      />
      <HeroMainLogoPart />
    </div>
  );
}
