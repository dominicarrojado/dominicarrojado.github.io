import { useRef } from 'react';
import cn from 'classnames';
import { useScrollOpacityEffect } from '../lib/custom-hooks';
import SvgLogo from './svgLogo';
import HeroMainLogoPart from './heroMainLogoPart';

export default function HeroMainLogo() {
  const titleRef = useRef<HTMLDivElement>(null);
  const opacity = useScrollOpacityEffect(titleRef);

  return (
    <div ref={titleRef} className="relative inline-flex" style={{ opacity }}>
      <HeroMainLogoPart isLeft />
      <SvgLogo
        className={cn(
          'h-40 w-40 text-white',
          'motion-safe:animate-hero-logo-in',
          'sm:h-60 sm:w-60',
          'md:h-80 md:w-80',
          'xl:h-96 xl:w-96'
        )}
        role="img"
        aria-hidden="false"
        aria-label="Dominic Arrojado logo"
      />
      <HeroMainLogoPart />
    </div>
  );
}
