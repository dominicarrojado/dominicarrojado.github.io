import cn from 'classnames';
import { MAIN_ELEMENT_ID } from '../lib/constants';

export default function SkipToMainContentAnchor() {
  return (
    <a
      href={`#${MAIN_ELEMENT_ID}`}
      tabIndex={0}
      className={cn(
        'absolute -top-96 -left-96 w-px h-px text-center text-white overflow-hidden -z-50',
        'focus:top-4 focus:inset-x-0 focus:m-auto focus:w-44 focus:h-auto focus:z-50',
        'focus:sm:w-52',
        'focus:xl:w-56'
      )}
    >
      Skip to main content
    </a>
  );
}
