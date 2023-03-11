import { TransitionEvent, useRef, useState } from 'react';
import cn from 'classnames';
import { SwitchTransition } from 'react-transition-group';
import { DialogDisclosure, DialogStateReturn } from 'reakit/Dialog';
import { getRefValue } from '../lib/hooks';
import { useMounted } from '../lib/custom-hooks';
import { trackEvent } from '../lib/google-analytics';
import { checkShouldAnimate } from '../lib/transition-group';
import Transition from './transition';
import { GoogleAnalyticsEvent } from '../lib/types';

export default function HeaderMenuButton({
  dialog,
}: {
  dialog: DialogStateReturn;
}) {
  const isMenuOpen = dialog.visible;
  const textRef = useRef<HTMLDivElement>(null);
  const isBtnClickedRef = useRef(false);
  const stacks = Array.from(Array(3).keys());
  const shouldDisplay = useMounted();
  const [animationDone, setAnimationDone] = useState(false);
  const text = !isMenuOpen ? 'Menu' : 'Close';
  const onTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName === 'opacity') {
      setAnimationDone(true);
    }
  };
  const btnOnMouseLeave = () => {
    if (!getRefValue(isBtnClickedRef)) {
      trackEvent({
        event: GoogleAnalyticsEvent.HEADER_BTN_HOVER,
        hoverText: text,
      });
    }
  };
  const btnOnClick = () => {
    isBtnClickedRef.current = true;
    setAnimationDone(true); // in case it was clicked during initial transitioning
    trackEvent({
      event: GoogleAnalyticsEvent.HEADER_BTN_CLICK,
      linkText: text,
    });
  };

  return (
    <DialogDisclosure
      state={dialog}
      className={cn(
        'group flex items-center flex-col min-w-8 outline-none',
        'md:min-w-10',
        'xl:min-w-11'
      )}
      onMouseLeave={btnOnMouseLeave}
      onClick={btnOnClick}
    >
      {stacks.map((stack) => {
        const isTop = stack === 0;
        const isMid = stack === 1;
        const isBottom = stack === 2;

        return (
          <div
            key={stack}
            className={cn(
              'w-6 h-0.5 bg-gray-400 rounded',
              'dark:bg-gray-300',
              'transform transition group-hover:bg-gray-500 group-focus-visible:bg-gray-500',
              'motion-reduce:transition-none',
              'dark:group-hover:bg-white dark:group-focus-visible:bg-white',
              'md:w-7 md:h-1',
              'xl:w-8',
              { 'mt-1.5': !isTop },
              !animationDone
                ? {
                    'duration-1000': true,
                    'opacity-0': !shouldDisplay,
                    'translate-x-1/2': (isTop || isBottom) && !shouldDisplay,
                    '-translate-x-1/2': isMid && !shouldDisplay,
                  }
                : {
                    'duration-300': true,
                    'translate-y-2 -rotate-45 md:translate-y-3':
                      isTop && isMenuOpen,
                    '-translate-y-2 rotate-45': isBottom && isMenuOpen,
                    'translate-x-7 opacity-0': isMid && isMenuOpen,
                  }
            )}
            style={
              !animationDone
                ? {
                    transitionDelay: `${stack * 150 + 500}ms`,
                  }
                : undefined
            }
            data-testid="menu-stack"
          />
        );
      })}
      <SwitchTransition>
        <Transition key={text} nodeRef={textRef} timeout={200}>
          {(state) => (
            <div
              ref={textRef}
              className={cn(
                'mt-1.5 text-gray-400 text-3xs font-normal uppercase select-none',
                'dark:text-gray-300',
                'transform transition-transform-opacity-color group-hover:text-gray-500',
                'motion-reduce:transition-none',
                'dark:group-hover:text-gray-100',
                'md:mt-2 md:text-2xs',
                'xl:text-xs',
                !animationDone
                  ? {
                      'duration-700 delay-1000': true,
                      [shouldDisplay
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 -translate-y-3']: true,
                    }
                  : {
                      'duration-200': true,
                      [checkShouldAnimate(state)
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 -translate-y-3']: true,
                    }
              )}
              onTransitionEnd={!animationDone ? onTransitionEnd : undefined}
            >
              {text}
            </div>
          )}
        </Transition>
      </SwitchTransition>
    </DialogDisclosure>
  );
}
