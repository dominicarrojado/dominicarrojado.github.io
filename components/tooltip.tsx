import { ReactNode, useRef } from 'react';
import cn from 'classnames';
import { Tooltip as ReakitTooltip, TooltipStateReturn } from 'reakit/Tooltip';
import { checkShouldAnimate } from '../lib/transition-group';
import Transition from './transition';

export type Props = {
  tooltip: TooltipStateReturn;
  children: ReactNode;
  className?: string;
};

export default function Tooltip({ tooltip, children, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isTop = tooltip.placement.includes('top');
  const isBottom = tooltip.placement.includes('bottom');
  const isRight = tooltip.placement.includes('right');
  const isLeft = tooltip.placement.includes('left');

  return (
    <Transition in={tooltip.visible} nodeRef={containerRef} timeout={100}>
      {(state) => {
        const shouldDisplay = checkShouldAnimate(state);

        return (
          <ReakitTooltip {...tooltip}>
            <div
              ref={containerRef}
              className={cn(
                'border border-white bg-gray-750 py-1.5 px-3 text-center text-white text-sm font-normal whitespace-nowrap',
                'dark:bg-gray-850 dark:border-gray-400',
                'transform transition duration-300',
                'motion-reduce:transition-none',
                'lg:py-2 lg:px-4 lg:text-base',
                {
                  ['opacity-0 translate-none']: !shouldDisplay,
                  ['translate-y-2']: isTop && !shouldDisplay,
                  ['-translate-y-2']: isBottom && !shouldDisplay,
                  ['-translate-x-2']: isRight && !shouldDisplay,
                  ['translate-x-2']: isLeft && !shouldDisplay,
                },
                className
              )}
            >
              {children}
            </div>
          </ReakitTooltip>
        );
      }}
    </Transition>
  );
}
