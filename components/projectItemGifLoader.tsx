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
          'absolute top-3 right-3 bg-black bg-opacity-60 rounded-full p-1 z-30',
          'sm:top-4 sm:right-4'
        )}
        data-testid="gif-loader"
      >
        <Spinner
          className={cn(
            'w-7 h-7 border-2',
            'transition-opacity duration-700',
            'motion-reduce:transition-none',
            'sm:w-9 sm:h-9',
            'md:w-11 md:h-11 md:border-4'
          )}
          color="#ffffff"
        />
        <div
          className={cn(
            'absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-xs',
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
