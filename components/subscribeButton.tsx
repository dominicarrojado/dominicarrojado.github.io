import { TransitionEvent, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { DialogDisclosure, useDialogState } from 'reakit/Dialog';
import { useMounted, useUpdateVisibleDialogs } from '../lib/custom-hooks';
import { getRefValue } from '../lib/hooks';
import { trackEvent } from '../lib/google-analytics';
import ModalSubscribe from './modalSubscribe';
import ModalSubscribeSuccess from './modalSubscribeSuccess';
import SvgBell from './svgBell';
import { DialogName, GoogleAnalyticsEvent } from '../lib/types';
import { MAIN_TITLE } from '../lib/constants';

export default function SubscribeButton() {
  const isMountedRef = useRef(false);
  const shouldDisplay = useMounted();
  const dialogSubscribe = useDialogState({
    baseId: 'dialog-subscribe',
    animated: 300,
  });
  const dialogSubscribeHide = () => {
    dialogSubscribe.hide();
    trackEvent({
      event: GoogleAnalyticsEvent.MODAL_CLOSE,
      projectTitle: MAIN_TITLE,
      modalTitle: text,
      buttonText: text,
    });
  };
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
  const btnOnClick = () => {
    setAnimationDone(true); // in case it was clicked during initial transitioning
    trackEvent({
      event: GoogleAnalyticsEvent.MODAL_OPEN,
      projectTitle: MAIN_TITLE,
      modalTitle: text,
      buttonText: text,
    });
  };
  const subscribeOnSuccess = (value: string) => {
    setEmail(value);

    dialogSubscribeSuccess.show();

    trackEvent({
      event: GoogleAnalyticsEvent.SUBSCRIBE_FORM_SUBMIT,
      projectTitle: MAIN_TITLE,
      buttonText: text,
    });
  };

  useEffect(() => {
    updateVisibleDialogs(DialogName.SUBSCRIBE, dialogSubscribeVisible);

    isMountedRef.current = true;

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
        onClick={btnOnClick}
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
      <ModalSubscribe
        dialog={{ ...dialogSubscribe, hide: dialogSubscribeHide }}
        onSuccess={subscribeOnSuccess}
      />
      <ModalSubscribeSuccess dialog={dialogSubscribeSuccess} email={email} />
    </>
  );
}
