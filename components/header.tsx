import cn from 'classnames';
import { useDialogState } from 'ariakit/dialog';
import { SCROLLBAR_WIDTH_CSS_VAR } from '../lib/constants';
import HeaderProgressBar from './headerProgressBar';
import HeaderThemeButton from './headerThemeButton';
import HeaderLogo from './headerLogo';
import HeaderMenuButton from './headerMenuButton';
import HeaderMenu from './headerMenu';
import SkipToMainContentAnchor from './skipToMainContentAnchor';

export default function Header() {
  const dialog = useDialogState({
    animated: 500,
  });

  return (
    <>
      <HeaderProgressBar />
      <header className={cn('fixed flex items-center top-0 w-full z-40')}>
        <SkipToMainContentAnchor />
        <HeaderLogo onClick={dialog.hide} />
        <div
          className={cn(
            'absolute top-3.5 right-3.5 flex items-end gap-3 ml-auto',
            'sm:top-4 sm:right-4 sm:gap-4',
            'md:top-5 md:right-5 md:gap-5',
            'lg:top-8 lg:right-8 lg:gap-6'
          )}
          style={{ paddingRight: `var(${SCROLLBAR_WIDTH_CSS_VAR}, 0)` }}
          data-testid="header-buttons"
        >
          <HeaderThemeButton />
          <HeaderMenuButton dialog={dialog} isDisclosure />
        </div>
      </header>
      <HeaderMenu dialog={dialog} />
    </>
  );
}
