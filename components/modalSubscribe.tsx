import React from 'react';
import { DialogState } from 'ariakit/dialog';
import { useSubmitSubscribeRequest } from '../lib/api-hooks';
import { getRefValue } from '../lib/hooks';
import Button from './button';
import ButtonLoader from './buttonLoader';
import ErrorText from './errorText';
import Input from './input';
import Modal from './modal';
import ModalDescription from './modalDescription';
import InputGroup from './inputGroup';
import { FetchState } from '../lib/types';

export type Props = {
  dialog: DialogState;
  onSuccess: (email: string) => void;
};

export default function ModalSubscribe({ dialog, onSuccess }: Props) {
  const inputEmailRef = React.useRef<HTMLInputElement>(null);
  const [fetchState, submitSubscriptionRequest] = useSubmitSubscribeRequest();
  const isLoading = fetchState === FetchState.LOADING;
  const focusOnInputEmail = () => {
    const inputEmail = getRefValue(inputEmailRef);

    inputEmail.focus();
  };
  const formOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputEmail = getRefValue(inputEmailRef);
    const isSuccess = await submitSubscriptionRequest(inputEmail.value);

    if (isSuccess) {
      onSuccess(inputEmail.value);
      dialog.hide();
    }
  };

  return (
    <Modal
      dialog={dialog}
      title="Stay up to date"
      afterEnter={focusOnInputEmail}
    >
      <form onSubmit={formOnSubmit}>
        <ModalDescription>
          Get notified when I publish something new, and unsubscribe at any
          time.
        </ModalDescription>
        <InputGroup>
          <Input
            ref={inputEmailRef}
            type="email"
            autoComplete="email"
            name="email"
            placeholder="Email address"
            disabled={isLoading}
            required
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading && <ButtonLoader />}
            Join
          </Button>
        </InputGroup>
        {fetchState === FetchState.ERROR && (
          <ErrorText>Oops! Something went wrong. Please try again.</ErrorText>
        )}
      </form>
    </Modal>
  );
}
