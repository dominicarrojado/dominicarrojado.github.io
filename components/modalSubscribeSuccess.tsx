import React from 'react';
import { DialogStateReturn } from 'reakit/Dialog';
import Modal from './modal';
import ModalDescription from './modalDescription';

type Props = {
  dialog: DialogStateReturn;
  email: string;
};

export default function ModalSubscribeSuccess({ dialog, email }: Props) {
  return (
    <Modal dialog={dialog} title="Verify your email" tabIndex={0}>
      <ModalDescription>
        Thanks for subscribing with <strong>{email}</strong>! Please check your
        email to verify and get notified when I publish something new.
      </ModalDescription>
    </Modal>
  );
}
