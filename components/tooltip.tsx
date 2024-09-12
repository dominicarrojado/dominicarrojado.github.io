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
          'whitespace-nowrap border border-white bg-gray-750 px-3 py-1.5 text-center text-sm font-normal text-white',
          'dark:border-gray-400 dark:bg-gray-850',
          'transform transition duration-300',
          'motion-reduce:transition-none',
          'lg:px-4 lg:py-2 lg:text-base',
          {
            ['translate-none opacity-0']: !tooltipAnimated,
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
