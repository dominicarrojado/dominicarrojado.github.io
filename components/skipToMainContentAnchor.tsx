import cn from 'classnames';
import { MAIN_ELEMENT_ID } from '../lib/constants';

export default function SkipToMainContentAnchor() {
  return (
    <a
      href={`#${MAIN_ELEMENT_ID}`}
      tabIndex={0}
      className={cn(
        'absolute -left-96 -top-96 -z-50 h-px w-px overflow-hidden text-center text-white',
        'focus:inset-x-0 focus:top-4 focus:z-50 focus:m-auto focus:h-auto focus:w-44',
        'focus:sm:w-52',
        'focus:xl:w-56'
      )}
    >
      Skip to main content
    </a>
  );
}
