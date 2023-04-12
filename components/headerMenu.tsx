import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Dialog, DialogState } from 'ariakit/dialog';
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
        'w-0 h-0 pointer-events-none': !dialogVisible,
      })}
      aria-label="Menu"
      data-testid="menu-container"
    >
      <div className="flex justify-center items-center min-h-full">
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
