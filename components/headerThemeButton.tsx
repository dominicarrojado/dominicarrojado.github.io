import { TransitionEvent, useRef, useState } from 'react';
import cn from 'classnames';
import { SwitchTransition } from 'react-transition-group';
import { Button } from 'ariakit/button';
import { Checkbox } from 'ariakit/checkbox';
import { useDarkModeEnabled, useMounted } from '../lib/custom-hooks';
import { trackEvent } from '../lib/google-analytics';
import { checkShouldAnimate } from '../lib/transition-group';
import SvgSun from './svgSun';
import SvgMoon from './svgMoon';
import Transition from './transition';
import { GoogleAnalyticsEvent } from '../lib/types';

export default function HeaderThemeButton() {
  const { isDarkModeReady, isDarkModeEnabled, toggleDarkMode } =
    useDarkModeEnabled();

  return isDarkModeReady ? (
    <ThemeButtonChildren
      isDarkModeEnabled={isDarkModeEnabled}
      toggleDarkMode={toggleDarkMode}
    />
  ) : null;
}

function ThemeButtonChildren({
  isDarkModeEnabled,
  toggleDarkMode,
}: {
  isDarkModeEnabled: boolean;
  toggleDarkMode: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldDisplay = useMounted();
  const [animationDone, setAnimationDone] = useState(false);
  const Icon = !isDarkModeEnabled ? SvgSun : SvgMoon;
  const iconStyle = !isDarkModeEnabled
    ? 'w-6 h-6 md:w-8 md:h-8'
    : 'w-5 h-5 my-0.5 md:w-7 md:h-7';
  const text = !isDarkModeEnabled ? 'Light' : 'Dark';
  const onTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName === 'opacity') {
      setAnimationDone(true);
    }
  };
  const btnOnClick = () => {
    setAnimationDone(true); // in case it was clicked during initial transitioning
    toggleDarkMode();
    trackEvent({
      event: GoogleAnalyticsEvent.THEME_BTN_CLICK,
      linkText: text,
    });
  };

  return (
    <Checkbox
      as={Button}
      checked={isDarkModeEnabled}
      className={cn(
        'group group flex items-center flex-col min-w-8 text-gray-400 outline-none',
        'dark:text-gray-300',
        'md:min-w-9',
        'xl:min-w-10',
        'hover:text-gray-500 focus-visible:text-gray-500',
        'dark:hover:text-white dark:focus-visible:text-white'
      )}
      aria-label="Switch between dark and light mode"
      onChange={btnOnClick}
    >
      <SwitchTransition>
        <Transition key={text} nodeRef={containerRef} timeout={300}>
          {(state) => (
            <div ref={containerRef} className="flex items-center flex-col">
              <div
                className={cn(
                  iconStyle,
                  'relative',
                  'transform transition-transform-opacity-color',
                  'motion-reduce:transition-none',
                  !animationDone
                    ? {
                        'duration-700': true,
                        [shouldDisplay
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-2']: true,
                      }
                    : {
                        'duration-200': true,
                        [checkShouldAnimate(state)
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-2']: true,
                      }
                )}
              >
                <Icon className="absolute inset-0 m-auto" />
              </div>
              <div
                className={cn(
                  'mt-1 text-3xs font-normal uppercase select-none',
                  'transform transition-transform-opacity-color',
                  'motion-reduce:transition-none',
                  'md:text-2xs',
                  'xl:text-xs',
                  !animationDone
                    ? {
                        'duration-700': true,
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
            </div>
          )}
        </Transition>
      </SwitchTransition>
    </Checkbox>
  );
}
