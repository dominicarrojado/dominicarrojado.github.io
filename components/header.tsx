import { useEffect } from 'react';
import cn from 'classnames';
import { useDialogState } from 'ariakit/dialog';
import {
  useDialogOffsetWidth,
  useUpdateVisibleDialogs,
} from '../lib/custom-hooks';
import HeaderProgressBar from './headerProgressBar';
import HeaderThemeButton from './headerThemeButton';
import HeaderLogo from './headerLogo';
import HeaderMenuButton from './headerMenuButton';
import HeaderMenu from './headerMenu';
import SkipToMainContentAnchor from './skipToMainContentAnchor';
import { DialogName } from '../lib/types';
import { MENU_ITEMS_LENGTH } from '../lib/constants';

export default function Header() {
  const dialog = useDialogState({
    animated: MENU_ITEMS_LENGTH * 75 + 100,
  });
  const dialogVisible = dialog.open;
  const updateVisibleDialogs = useUpdateVisibleDialogs();
  const dialogOffsetWidth = useDialogOffsetWidth();

  useEffect(() => {
    updateVisibleDialogs(DialogName.MENU, dialogVisible);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogVisible]);

  return (
    <>
      <HeaderProgressBar />
      <header className={cn('fixed flex items-center top-0 w-full z-50')}>
        <SkipToMainContentAnchor />
        <HeaderLogo onClick={dialog.hide} />
        <div
          className={cn(
            'absolute top-3.5 right-3.5 flex items-end gap-3 ml-auto',
            'sm:top-4 sm:right-4 sm:gap-4',
            'md:top-5 md:right-5 md:gap-5',
            'lg:top-8 lg:right-8 lg:gap-6'
          )}
          style={{ paddingRight: `${dialogOffsetWidth}px` }}
          data-testid="header-buttons"
        >
          <HeaderThemeButton />
          <HeaderMenuButton dialog={dialog} />
        </div>
      </header>
      <HeaderMenu dialog={dialog} />
    </>
  );
}
