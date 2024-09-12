import cn from 'classnames';
import { Button } from 'ariakit/button';
import { Checkbox } from 'ariakit/checkbox';
import { useDarkModeEnabled, useMounted } from '../lib/custom-hooks';
import { trackEvent } from '../lib/google-analytics';
import SvgSun from './svgSun';
import SvgMoon from './svgMoon';
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
  const shouldDisplay = useMounted();
  const Icon = !isDarkModeEnabled ? SvgSun : SvgMoon;
  const iconStyle = !isDarkModeEnabled
    ? 'w-6 h-6 md:w-8 md:h-8'
    : 'w-5 h-5 my-0.5 md:w-7 md:h-7';
  const text = !isDarkModeEnabled ? 'Light' : 'Dark';
  const btnOnClick = () => {
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
        'group flex min-w-8 flex-col items-center text-gray-400 outline-none',
        'dark:text-gray-300',
        'md:min-w-9',
        'xl:min-w-10',
        'hover:text-gray-500 focus-visible:text-gray-500',
        'dark:hover:text-white dark:focus-visible:text-white'
      )}
      aria-label="Switch between dark and light mode"
      onChange={btnOnClick}
    >
      <div className="flex flex-col items-center">
        <div
          className={cn(
            iconStyle,
            'relative',
            'transform transition-transform-opacity-color duration-700',
            'motion-reduce:transition-none',
            shouldDisplay
              ? 'translate-y-0 opacity-100'
              : 'translate-y-2 opacity-0'
          )}
        >
          <Icon className="absolute inset-0 m-auto" />
        </div>
        <div
          className={cn(
            'mt-1 select-none text-3xs font-normal uppercase',
            'transform transition-transform-opacity-color duration-700',
            'motion-reduce:transition-none',
            'md:text-2xs',
            'xl:text-xs',
            shouldDisplay
              ? 'translate-y-0 opacity-100'
              : '-translate-y-3 opacity-0'
          )}
        >
          {text}
        </div>
      </div>
    </Checkbox>
  );
}
