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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [shouldDisplay, setShouldDisplay] = useState(show);
  const [style, setStyle] = useState<CSSProperties>({});
  const isTop = position === TooltipPosition.TOP;
  const isRight = position === TooltipPosition.RIGHT;
  const isBottom = position === TooltipPosition.BOTTOM;
  const isLeft = position === TooltipPosition.LEFT;
  const repositionTooltip = useCallback(() => {
    const containerEl = getRefValue(containerRef);
    const wrapperEl = getRefValue(wrapperRef);
    const newStyle: CSSProperties = {};

    // center align tooltip based on position
    if (isRight || isLeft) {
      newStyle.top =
        (wrapperEl.offsetHeight / 2 - containerEl.offsetHeight / 2) * -1;
    } else {
      newStyle.left =
        (wrapperEl.offsetWidth / 2 - containerEl.offsetWidth / 2) * -1;
    }

    setStyle(newStyle);
  }, [isRight, isLeft]);
  const showTooltip = () => setShouldDisplay(true);
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
  }, [show]);

  useEffect(() => {
    repositionTooltip();
  }, [show, children, repositionTooltip]);

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 m-auto z-50', className)}
      onMouseEnter={typeof show === 'undefined' ? showTooltip : undefined}
      onMouseLeave={typeof show === 'undefined' ? hideTooltip : undefined}
    >
      <div
        ref={wrapperRef}
        className={cn(
          'absolute max-w-xs bg-black py-1.5 px-3 text-center text-white text-sm whitespace-nowrap pointer-events-none',
          'transform transition duration-300',
          'lg:text-base',
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
          }
        )}
        style={style}
        onTransitionEnd={onTransitionEnd}
      >
        {children}
      </div>
    </div>
  );
}

export default Tooltip;
