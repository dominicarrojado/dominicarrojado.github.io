import { useRef } from 'react';
import cn from 'classnames';
import { useTooltipState, TooltipAnchor } from 'ariakit/tooltip';
import Spinner from './spinner';
import Tooltip from './tooltip';

export type Props = {
  progress: number;
};

export default function ProjectItemGifLoader({ progress }: Props) {
  const tooltip = useTooltipState({
    animated: 300,
    placement: 'left',
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const text = 'Downloading GIF...';

  return (
    <>
      <TooltipAnchor
        state={tooltip}
        ref={containerRef}
        className={cn(
          'absolute right-3 top-3 z-30 rounded-full bg-black bg-opacity-60 p-1',
          'sm:right-4 sm:top-4'
        )}
        data-testid="gif-loader"
      >
        <Spinner
          className={cn(
            'h-7 w-7 border-2',
            'transition-opacity duration-700',
            'motion-reduce:transition-none',
            'sm:h-9 sm:w-9',
            'md:h-11 md:w-11 md:border-4'
          )}
          color="#ffffff"
        />
        <div
          className={cn(
            'absolute left-0 top-0 flex h-full w-full items-center justify-center text-xs text-white',
            'sm:text-sm',
            'md:text-base'
          )}
        >
          {progress}
        </div>
      </TooltipAnchor>
      <Tooltip tooltip={tooltip} className="mr-3">
        {text}
      </Tooltip>
    </>
  );
}
