import { useEffect, useState } from 'react';
import Router from 'next/router';
import cn from 'classnames';
import HeadlessTransition from './headlessTransition';

export default function HeaderProgressBar() {
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
    <HeadlessTransition
      show={isChanging}
      enterFrom="-translate-y-2"
      enterTo="translate-y-0"
      leaveFrom="translate-y-0"
      leaveTo="-translate-y-2"
      className={cn(
        'fixed left-0 top-0 z-50 flex h-1.5 w-full overflow-hidden',
        'transition-transform duration-300 motion-reduce:transition-none'
      )}
    >
      <div
        className={cn(
          'flex w-full flex-col justify-center overflow-hidden bg-gray-600',
          'bg-[length:1rem_1rem]',
          'motion-safe:animate-stripes'
        )}
        style={{
          backgroundImage:
            'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)',
        }}
        role="progressbar"
      />
    </HeadlessTransition>
  );
}
