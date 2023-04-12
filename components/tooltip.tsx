import { ReactNode, useRef } from 'react';
import cn from 'classnames';
import { Tooltip as AriakitTooltip, TooltipState } from 'ariakit/tooltip';

export type Props = {
  tooltip: TooltipState;
  children: ReactNode;
  className?: string;
};

export default function Tooltip({ tooltip, children, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipAnimated = tooltip.open && !tooltip.animating;
  const isTop = tooltip.placement.includes('top');
  const isBottom = tooltip.placement.includes('bottom');
  const isRight = tooltip.placement.includes('right');
  const isLeft = tooltip.placement.includes('left');

  return (
    <AriakitTooltip state={tooltip}>
      <div
        ref={containerRef}
        className={cn(
          'border border-white bg-gray-750 py-1.5 px-3 text-center text-white text-sm font-normal whitespace-nowrap',
          'dark:bg-gray-850 dark:border-gray-400',
          'transform transition duration-300',
          'motion-reduce:transition-none',
          'lg:py-2 lg:px-4 lg:text-base',
          {
            ['opacity-0 translate-none']: !tooltipAnimated,
            ['translate-y-2']: isTop && !tooltipAnimated,
            ['-translate-y-2']: isBottom && !tooltipAnimated,
            ['-translate-x-2']: isRight && !tooltipAnimated,
            ['translate-x-2']: isLeft && !tooltipAnimated,
          },
          className
        )}
      >
        {children}
      </div>
    </AriakitTooltip>
  );
}
