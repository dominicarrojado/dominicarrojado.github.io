import React, { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { useMounted } from '../lib/custom-hooks';
import ModalTitle from './modalTitle';
import ModalDescription from './modalDescription';
import ModalDialog from './modalDialog';
import ModalContent from './modalContent';
import { MODAL_TRANSITION_PROPS } from '../lib/constants';

export default function UnsubscribeSuccess() {
  const shouldDisplay = useMounted();

  return (
    <Transition {...MODAL_TRANSITION_PROPS} show={shouldDisplay} as={Fragment}>
      <ModalDialog>
        <ModalContent>
          <ModalTitle>Unsubscribed</ModalTitle>
          <ModalDescription>
            You have been successfully unsubscribed from my tech blog. I'm sorry
            to see you go, but I appreciate your time and interest in my
            content. If you change your mind and would like to resubscribe in
            the future, please don't hesitate to do so. Thank you!
          </ModalDescription>
        </ModalContent>
      </ModalDialog>
    </Transition>
  );
}
