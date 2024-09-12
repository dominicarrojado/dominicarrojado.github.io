import { TransitionEvent, useState } from 'react';
import cn from 'classnames';
import { DialogDisclosure, DialogDismiss, DialogState } from 'ariakit/dialog';
import { useMounted } from '../lib/custom-hooks';
import { trackEvent } from '../lib/google-analytics';
import { GoogleAnalyticsEvent } from '../lib/types';

export type Props = {
  dialog: DialogState;
  isDisclosure: boolean;
};

export default function HeaderMenuButton({ dialog, isDisclosure }: Props) {
  const isMenuOpen = dialog.open;
  const stacks = Array.from(Array(3).keys());
  const shouldDisplay = useMounted();
  const [animationDone, setAnimationDone] = useState(
    isDisclosure ? false : true
  );
  const text = !isMenuOpen ? 'Menu' : 'Close';
  const onTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName === 'opacity') {
      setAnimationDone(true);
    }
  };
  const btnOnClick = () => {
    setAnimationDone(true); // in case it was clicked during initial transitioning
    trackEvent({
      event: GoogleAnalyticsEvent.HEADER_BTN_CLICK,
      linkText: text,
    });
  };
  const Wrapper = isDisclosure ? DialogDisclosure : DialogDismiss;

  return (
    <Wrapper
      state={dialog}
      className={cn(
        'group flex min-w-8 flex-col items-center outline-none',
        'md:min-w-10',
        'xl:min-w-11'
      )}
      aria-label="Toggle menu"
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
              'h-0.5 w-6 rounded bg-gray-400',
              'dark:bg-gray-300',
              'transform transition group-hover:bg-gray-500 group-focus-visible:bg-gray-500',
              'motion-reduce:transition-none',
              'dark:group-hover:bg-white dark:group-focus-visible:bg-white',
              'md:h-1 md:w-7',
              'xl:w-8',
              { 'mt-1.5': !isTop },
              !animationDone
                ? {
                    'duration-700': true,
                    'opacity-0': !shouldDisplay,
                    'translate-x-1/2': (isTop || isBottom) && !shouldDisplay,
                    '-translate-x-1/2': isMid && !shouldDisplay,
                  }
                : {
                    'duration-200': true,
                    'translate-y-2 -rotate-45 md:translate-y-3':
                      isTop && isMenuOpen,
                    '-translate-y-2 rotate-45': isBottom && isMenuOpen,
                    'translate-x-7 opacity-0': isMid && isMenuOpen,
                  }
            )}
            style={
              !animationDone
                ? {
                    transitionDelay: `${stack * 100}ms`,
                  }
                : undefined
            }
            data-testid="menu-stack"
          />
        );
      })}
      <div
        className={cn(
          'mt-1.5 select-none text-3xs font-normal uppercase text-gray-400',
          'dark:text-gray-300',
          'transform transition-transform-opacity-color duration-700 group-hover:text-gray-500',
          'motion-reduce:transition-none',
          'dark:group-hover:text-gray-100',
          'md:mt-2 md:text-2xs',
          'xl:text-xs',
          shouldDisplay
            ? 'translate-y-0 opacity-100'
            : '-translate-y-3 opacity-0'
        )}
        onTransitionEnd={!animationDone ? onTransitionEnd : undefined}
      >
        {text}
      </div>
    </Wrapper>
  );
}
