import { TransitionEvent, useEffect, useState } from 'react';
import cn from 'classnames';
import { DialogDisclosure, useDialogState } from 'reakit/Dialog';
import { useMounted, useUpdateVisibleDialogs } from '../lib/custom-hooks';
import ModalSubscribe from './modalSubscribe';
import ModalSubscribeSuccess from './modalSubscribeSuccess';
import SvgBell from './svgBell';
import { DialogName } from '../lib/types';

export default function SubscribeButton() {
  const shouldDisplay = useMounted();
  const dialogSubscribe = useDialogState({
    baseId: 'dialog-subscribe',
    animated: 300,
  });
  const dialogSubscribeVisible = dialogSubscribe.visible;
  const dialogSubscribeSuccess = useDialogState({
    baseId: 'dialog-subscribe-success',
    animated: 300,
  });
  const dialogSubscribeSuccessVisible = dialogSubscribeSuccess.visible;
  const updateVisibleDialogs = useUpdateVisibleDialogs();
  const [animationDone, setAnimationDone] = useState(false);
  const [email, setEmail] = useState('');
  const text = 'Subscribe';
  const onTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName === 'opacity') {
      setAnimationDone(true);
    }
  };
  const subscribeOnSuccess = (value: string) => {
    setEmail(value);

    dialogSubscribeSuccess.show();
  };

  useEffect(() => {
    updateVisibleDialogs(DialogName.SUBSCRIBE, dialogSubscribeVisible);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogSubscribeVisible]);

  useEffect(() => {
    updateVisibleDialogs(
      DialogName.SUBSCRIBE_SUCCESS,
      dialogSubscribeSuccessVisible
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogSubscribeSuccessVisible]);

  return (
    <>
      <DialogDisclosure
        {...dialogSubscribe}
        className={cn(
          'group text-gray-400 outline-none',
          'dark:text-gray-300',
          'hover:text-gray-500 focus-visible:text-gray-500',
          'dark:hover:text-white dark:focus-visible:text-white'
        )}
        aria-label={text}
      >
        <div className="flex items-center flex-col">
          <div
            className={cn(
              'relative w-5 h-5',
              'transform transition-transform-opacity-color',
              'motion-reduce:transition-none',
              'md:w-7 md:h-7',
              !animationDone
                ? {
                    'duration-700 delay-700': true,
                    [shouldDisplay
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 -translate-y-2']: true,
                  }
                : 'duration-200'
            )}
          >
            <SvgBell className="absolute inset-0 m-auto" />
          </div>
          <div
            className={cn(
              'mt-2 text-3xs font-normal uppercase select-none',
              'transform transition-transform-opacity-color',
              'motion-reduce:transition-none',
              'md:text-2xs',
              'xl:text-xs',
              !animationDone
                ? {
                    'duration-700 delay-1000': true,
                    [shouldDisplay
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 -translate-y-3']: true,
                  }
                : 'duration-200'
            )}
            onTransitionEnd={!animationDone ? onTransitionEnd : undefined}
          >
            {text}
          </div>
        </div>
      </DialogDisclosure>
      <ModalSubscribe dialog={dialogSubscribe} onSuccess={subscribeOnSuccess} />
      <ModalSubscribeSuccess dialog={dialogSubscribeSuccess} email={email} />
    </>
  );
}
