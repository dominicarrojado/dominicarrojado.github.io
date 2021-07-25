import {
  ReactNode,
  useRef,
  CSSProperties,
  useState,
  useEffect,
  useCallback,
} from 'react';
import cn from 'classnames';
import { getRefValue } from '../lib/hooks';

function Tooltip({
  position = 'top',
  children,
}: {
  position?: 'top' | 'bottom' | 'right' | 'left';
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [style, setStyle] = useState<CSSProperties>({});
  const isTop = position === 'top';
  const isBottom = position === 'bottom';
  const isRight = position === 'right';
  const isLeft = position === 'left';
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

  useEffect(() => {
    repositionTooltip();
  }, [children, repositionTooltip]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 m-auto z-50"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
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
      >
        {children}
      </div>
    </div>
  );
}

export default Tooltip;
