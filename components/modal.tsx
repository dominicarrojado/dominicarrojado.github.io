import React, { Fragment, ReactNode } from 'react';
import { Transition } from '@headlessui/react';
import cn from 'classnames';
import { Dialog, DialogStateReturn } from 'reakit/Dialog';
import ModalCloseButton from './modalCloseButton';
import ModalContent from './modalContent';
import ModalDialog from './modalDialog';
import ModalTitle from './modalTitle';
import { MODAL_TRANSITION_PROPS } from '../lib/constants';

type Props = {
  dialog: DialogStateReturn;
  title: string;
  tabIndex?: number;
  children: ReactNode;
  afterEnter?: () => void;
};

export default function Modal({
  dialog,
  tabIndex,
  title,
  children,
  afterEnter,
}: Props) {
  return (
    <Transition.Root
      show={dialog.visible}
      as={Fragment}
      afterEnter={afterEnter}
    >
      <Dialog
        {...dialog}
        tabIndex={tabIndex}
        aria-label={title}
        className="relative z-50"
      >
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className={cn(
              'flex min-h-full items-end justify-center p-4 text-center',
              'sm:items-center sm:p-0'
            )}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-75"
              leave="ease-in duration-200"
              leaveFrom="opacity-75"
              leaveTo="opacity-0"
            >
              <div
                className={cn('fixed inset-0 bg-gray-850 transition-opacity')}
                onClick={dialog.hide}
              />
            </Transition.Child>
            <Transition.Child {...MODAL_TRANSITION_PROPS} as={Fragment}>
              <ModalDialog>
                <ModalContent>
                  <div className="flex justify-between items-start">
                    <ModalTitle>{title}</ModalTitle>
                    <ModalCloseButton onClick={dialog.hide} />
                  </div>
                  {children}
                </ModalContent>
              </ModalDialog>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
