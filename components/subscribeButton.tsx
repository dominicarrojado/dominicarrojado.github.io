import { TransitionEvent, useState } from 'react';
import cn from 'classnames';
import { DialogDisclosure, useDialogState } from 'ariakit/dialog';
import { useMounted } from '../lib/custom-hooks';
import { trackEvent } from '../lib/google-analytics';
import ModalSubscribe from './modalSubscribe';
import ModalSubscribeSuccess from './modalSubscribeSuccess';
import SvgBell from './svgBell';
import { GoogleAnalyticsEvent } from '../lib/types';
import { MAIN_TITLE } from '../lib/constants';

export default function SubscribeButton() {
  const shouldDisplay = useMounted();
  const dialogSubscribe = useDialogState({
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
  const dialogSubscribeSuccess = useDialogState({
    animated: 300,
  });
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

  return (
    <>
      <DialogDisclosure
        state={dialogSubscribe}
        className={cn(
          'group text-gray-400 outline-none',
          'dark:text-gray-300',
          'hover:text-gray-500 focus-visible:text-gray-500',
          'dark:hover:text-white dark:focus-visible:text-white'
        )}
        onClick={btnOnClick}
        aria-label={text}
      >
        <div className="flex flex-col items-center">
          <div
            className={cn(
              'relative h-5 w-5',
              'transform transition-transform-opacity-color',
              'motion-reduce:transition-none',
              'md:h-7 md:w-7',
              !animationDone
                ? {
                    'duration-700': true,
                    [shouldDisplay
                      ? 'translate-y-0 opacity-100'
                      : '-translate-y-2 opacity-0']: true,
                  }
                : 'duration-300'
            )}
          >
            <SvgBell className="absolute inset-0 m-auto" />
          </div>
          <div
            className={cn(
              'mt-2 select-none text-3xs font-normal uppercase',
              'transform transition-transform-opacity-color',
              'motion-reduce:transition-none',
              'md:text-2xs',
              'xl:text-xs',
              !animationDone
                ? {
                    'duration-700': true,
                    [shouldDisplay
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-3 opacity-0']: true,
                  }
                : 'duration-300'
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
