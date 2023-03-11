import { useRef } from 'react';
import cn from 'classnames';
import { Dialog, DialogBackdrop, DialogStateReturn } from 'reakit/Dialog';
import { checkShouldAnimate } from '../lib/transition-group';
import Transition from './transition';
import HeaderMenuItems from './headerMenuItems';
import HeaderSocialItems from './headerSocialItems';

export default function HeaderMenu({ dialog }: { dialog: DialogStateReturn }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Transition in={dialog.visible} nodeRef={containerRef} timeout={100}>
      {(state) => {
        const shouldDisplay = checkShouldAnimate(state);

        return (
          <DialogBackdrop
            {...dialog}
            className={cn(
              'fixed top-0 right-0 z-30 w-full h-full bg-gray-550',
              'dark:bg-gray-750',
              'transition-opacity duration-500',
              {
                ['opacity-0 pointer-events-none delay-100']: !shouldDisplay,
              }
            )}
            data-testid="menu-background"
          >
            <Dialog
              {...dialog}
              ref={containerRef}
              className={cn(
                'fixed inset-0 z-40 overflow-y-auto overflow-x-hidden',
                {
                  'w-0 h-0 pointer-events-none': !shouldDisplay,
                }
              )}
              hideOnClickOutside={false}
              aria-label="Menu"
              data-testid="menu-container"
            >
              <div className="flex justify-center items-center min-h-full">
                <div className={cn('py-10 pl-8', 'sm:pl-0')}>
                  <HeaderMenuItems
                    isMenuOpen={shouldDisplay}
                    closeMenu={dialog.hide}
                  />
                  <HeaderSocialItems isMenuOpen={shouldDisplay} />
                </div>
              </div>
            </Dialog>
          </DialogBackdrop>
        );
      }}
    </Transition>
  );
}
