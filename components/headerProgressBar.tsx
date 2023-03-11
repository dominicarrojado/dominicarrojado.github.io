import { useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import cn from 'classnames';
import { checkShouldAnimate } from '../lib/transition-group';
import Transition from './transition';

export default function HeaderProgressBar() {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isChanging, setIsChanging] = useState(false);
  const onChangeStart = () => setIsChanging(true);
  const onChangeEnd = () => setIsChanging(false);

  useEffect(() => {
    const routerEvents = Router.events;

    routerEvents.on('routeChangeStart', onChangeStart);
    routerEvents.on('routeChangeComplete', onChangeEnd);
    routerEvents.on('routeChangeError', onChangeEnd);

    return () => {
      routerEvents.off('routeChangeStart', onChangeStart);
      routerEvents.off('routeChangeComplete', onChangeEnd);
      routerEvents.off('routeChangeError', onChangeEnd);
    };
  }, []);

  return (
    <Transition
      in={isChanging}
      nodeRef={progressBarRef}
      timeout={300}
      mountOnEnter
      unmountOnExit
    >
      {(state) => (
        <div
          ref={progressBarRef}
          className={cn(
            'fixed top-0 left-0 flex w-full h-1.5 overflow-hidden z-50',
            'transition-transform duration-300',
            'motion-reduce:transition-none',
            checkShouldAnimate(state) ? 'translate-y-0' : '-translate-y-2'
          )}
        >
          <div
            className={cn(
              'w-full flex flex-col justify-center overflow-hidden bg-gray-600',
              'bg-[length:1rem_1rem]',
              'motion-safe:animate-stripes'
            )}
            style={{
              backgroundImage:
                'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)',
            }}
            role="progressbar"
          />
        </div>
      )}
    </Transition>
  );
}
