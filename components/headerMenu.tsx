import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Dialog, DialogState } from 'ariakit/dialog';
import { SCROLLBAR_WIDTH_CSS_VAR } from '@/lib/constants';
import HeaderMenuButton from './headerMenuButton';
import HeaderMenuItems from './headerMenuItems';
import HeaderSocialItems from './headerSocialItems';

export type Props = { dialog: DialogState };

export default function HeaderMenu({ dialog }: Props) {
  const dialogVisible = dialog.open;
  const [shouldDisplayMenu, setShouldDisplayMenu] = useState(false);

  useEffect(() => {
    window.requestAnimationFrame(() => {
      setShouldDisplayMenu(dialogVisible);
    });
  }, [dialogVisible]);

  return (
    <Dialog
      state={dialog}
      backdropProps={{
        className: cn(
          'fixed top-0 right-0 z-30 w-full h-full bg-gray-550',
          'dark:bg-gray-750',
          'transition-opacity duration-500',
          {
            ['opacity-0 pointer-events-none']: !dialogVisible,
          }
        ),
        'data-testid': 'menu-background',
      }}
      className={cn('fixed inset-0 z-40 overflow-y-auto overflow-x-hidden', {
        'pointer-events-none h-0 w-0': !dialogVisible,
      })}
      aria-label="Menu"
      data-testid="menu-container"
    >
      <div className={cn('fixed top-1 z-50 flex w-full items-center')}>
        <div
          className={cn(
            'absolute right-3.5 top-3.5 ml-auto flex items-end gap-3',
            'sm:right-4 sm:top-4 sm:gap-4',
            'md:right-5 md:top-5 md:gap-5',
            'lg:right-8 lg:top-8 lg:gap-6'
          )}
          style={{ paddingRight: `var(${SCROLLBAR_WIDTH_CSS_VAR}, 0)` }}
        >
          <HeaderMenuButton
            dialog={{ ...dialog, open: shouldDisplayMenu }}
            isDisclosure={false}
          />
        </div>
      </div>
      <div className="flex min-h-full items-center justify-center">
        <div className={cn('py-10 pl-8', 'sm:pl-0')}>
          <HeaderMenuItems
            shouldDisplay={shouldDisplayMenu}
            closeMenu={dialog.hide}
          />
          <HeaderSocialItems shouldDisplay={shouldDisplayMenu} />
        </div>
      </div>
    </Dialog>
  );
}
