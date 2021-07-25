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
  const [shouldShow, setShouldShow] = useState(false);
  const [style, setStyle] = useState<CSSProperties>({});
  const repositionTooltip = useCallback(() => {
    const containerEl = getRefValue(containerRef);
    const wrapperEl = getRefValue(wrapperRef);
    const newStyle: CSSProperties = {};

    // center align tooltip based on position
    if (position === 'right' || position === 'left') {
      newStyle.top =
        (wrapperEl.offsetHeight / 2 - containerEl.offsetHeight / 2) * -1;
    } else {
      newStyle.left =
        (wrapperEl.offsetWidth / 2 - containerEl.offsetWidth / 2) * -1;
    }

    setStyle(newStyle);
  }, [position]);
  const showTooltip = () => {
    setShouldShow(true);
  };
  const hideTooltip = () => setShouldShow(false);

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
            ['opacity-0']: !shouldShow,
            ['bottom-full']: position === 'top',
            ['top-full']: position === 'bottom',
            ['left-full']: position === 'right',
            ['right-full']: position === 'left',
            ['translate-y-2']: position === 'top' && !shouldShow,
            ['-translate-y-2']: position === 'bottom' && !shouldShow,
            ['-translate-x-2']: position === 'right' && !shouldShow,
            ['translate-x-2']: position === 'left' && !shouldShow,
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
