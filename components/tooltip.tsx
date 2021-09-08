import {
  ReactNode,
  useRef,
  CSSProperties,
  useState,
  useEffect,
  useCallback,
  TransitionEvent,
} from 'react';
import cn from 'classnames';
import { getRefValue } from '../lib/hooks';
import { TooltipPosition } from '../lib/types';

function Tooltip({
  position = TooltipPosition.TOP,
  show,
  className,
  onHidden,
  children,
}: {
  position?: TooltipPosition;
  show?: boolean;
  className?: string;
  onHidden?: () => void;
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<TooltipPosition>(position);
  const [shouldDisplay, setShouldDisplay] = useState(show);
  const [style, setStyle] = useState<CSSProperties>({});
  const isTop = position === TooltipPosition.TOP;
  const isRight = position === TooltipPosition.RIGHT;
  const isBottom = position === TooltipPosition.BOTTOM;
  const isLeft = position === TooltipPosition.LEFT;
  const repositionTooltip = useCallback(() => {
    const containerEl = getRefValue(containerRef);
    const contentEl = getRefValue(contentRef);
    const contentWidth = contentEl.offsetWidth;
    const contentHeight = contentEl.offsetHeight;
    const newStyle: CSSProperties = {
      width: contentWidth,
      height: contentHeight,
    };

    // center align tooltip based on position
    const currentPosition = positionRef.current;

    if (
      currentPosition === TooltipPosition.RIGHT ||
      currentPosition === TooltipPosition.LEFT
    ) {
      newStyle.top = (contentHeight / 2 - containerEl.offsetHeight / 2) * -1;
    } else {
      newStyle.left = (contentWidth / 2 - containerEl.offsetWidth / 2) * -1;
    }

    setStyle(newStyle);
  }, []);
  const showTooltip = () => {
    repositionTooltip();
    setShouldDisplay(true);
  };
  const hideTooltip = () => setShouldDisplay(false);
  const onTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (
      e.propertyName === 'opacity' &&
      !shouldDisplay &&
      typeof onHidden === 'function'
    ) {
      onHidden();
    }
  };

  useEffect(() => {
    if (typeof show === 'boolean') {
      if (show) {
        showTooltip();
      } else {
        hideTooltip();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-50 m-auto"
      onMouseEnter={typeof show === 'undefined' ? showTooltip : undefined}
      onMouseLeave={typeof show === 'undefined' ? hideTooltip : undefined}
    >
      <div
        className={cn(
          'absolute flex items-center pointer-events-none',
          {
            ['justify-center']: isTop || isBottom,
            ['bottom-full']: isTop,
            ['top-full']: isBottom,
            ['left-full']: isRight,
            ['right-full']: isLeft,
          },
          className
        )}
        style={style}
      >
        <div
          ref={contentRef}
          className={cn(
            'border border-white bg-gray-750 py-1.5 px-3 text-center text-white text-sm font-normal whitespace-nowrap',
            'dark:bg-gray-850 dark:border-gray-400',
            'transform transition duration-300',
            'lg:py-2 lg:px-4 lg:text-base',
            {
              ['opacity-0']: !shouldDisplay,
              ['bottom-full']: isTop,
              ['top-full']: isBottom,
              ['left-full']: isRight,
              ['right-full']: isLeft,
              ['translate-y-2']: isTop && !shouldDisplay,
              ['-translate-y-2']: isBottom && !shouldDisplay,
              ['-translate-x-2']: isRight && !shouldDisplay,
              ['translate-x-2']: isLeft && !shouldDisplay,
            },
            className
          )}
          onTransitionEnd={onTransitionEnd}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Tooltip;
