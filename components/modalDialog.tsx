import React, { forwardRef, ForwardedRef, ReactNode } from 'react';
import cn from 'classnames';

export type Props = { children: ReactNode };

const ModalDialog = forwardRef(
  ({ children }: Props, ref: ForwardedRef<HTMLDivElement>) => (
    <div
      ref={ref}
      className={cn(
        'relative transform overflow-hidden bg-white text-left shadow-xl transition-all',
        'dark:bg-gray-850',
        'sm:my-8 sm:w-full sm:max-w-lg',
        'xl:max-w-xl'
      )}
    >
      {children}
    </div>
  )
);

ModalDialog.displayName = 'ModalDialog';

export default ModalDialog;
