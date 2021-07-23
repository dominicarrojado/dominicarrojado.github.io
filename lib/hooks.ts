import { useRef, useState, RefObject, useEffect } from 'react';
import Window from '../modules/Window';

export function getRefValue<C>(ref: RefObject<C>) {
  return ref.current as C;
}

export function useStateRef<S>(
  defaultValue: S
): [S, (value: S) => void, RefObject<S>] {
  const ref = useRef<S>(defaultValue);
  const [state, _setState] = useState<S>(defaultValue);
  const setState = (value: S) => {
    _setState(value);
    ref.current = value;
  };

  return [state, setState, ref];
}

export function useScrollOpacityEffect(ref: RefObject<HTMLElement>) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const windowOnScroll = () => {
      const element = getRefValue(ref);
      const { offsetTop, offsetHeight } = element;
      const newOpacity = Math.max(
        1 - window.pageYOffset / (offsetTop + offsetHeight),
        0
      );

      setOpacity(newOpacity);
    };

    Window.on('scroll', windowOnScroll);

    return () => {
      Window.off('scroll', windowOnScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return opacity;
}
