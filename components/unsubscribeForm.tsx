import React, { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { useMounted } from '../lib/custom-hooks';
import { useUnsubscribe } from '../lib/api-hooks';
import { trackEvent } from '../lib/google-analytics';
import Input from './input';
import Button from './button';
import ModalTitle from './modalTitle';
import ModalDescription from './modalDescription';
import InputGroup from './inputGroup';
import ModalDialog from './modalDialog';
import ModalContent from './modalContent';
import ButtonLoader from './buttonLoader';
import ErrorText from './errorText';
import { FetchState, GoogleAnalyticsEvent } from '../lib/types';
import { MAIN_TITLE, MODAL_TRANSITION_PROPS } from '../lib/constants';

type Props = { onSuccess: () => void };

export default function UnsubscribeForm({ onSuccess }: Props) {
  const shouldDisplay = useMounted();
  const [fetchState, unsubscribe] = useUnsubscribe();
  const isLoading = fetchState === FetchState.LOADING;
  const btnText = 'Confirm';
  const formOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formEl = e.currentTarget as HTMLFormElement;
    const isSuccess = await unsubscribe(formEl.email.value);

    if (isSuccess) {
      onSuccess();

      trackEvent({
        event: GoogleAnalyticsEvent.SUBSCRIBE_FORM_SUBMIT,
        projectTitle: MAIN_TITLE,
        buttonText: btnText,
      });
    }
  };

  return (
    <Transition {...MODAL_TRANSITION_PROPS} show={shouldDisplay} as={Fragment}>
      <ModalDialog>
        <ModalContent>
          <form onSubmit={formOnSubmit}>
            <ModalTitle>Unsubscribe</ModalTitle>
            <ModalDescription>
              To unsubscribe, please enter your email in the form below and
              confirm. Thank you for your interest in my content.
            </ModalDescription>
            <InputGroup>
              <Input
                type="email"
                autoComplete="email"
                name="email"
                placeholder="Email address"
                disabled={isLoading}
                required
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <ButtonLoader />}
                {btnText}
              </Button>
            </InputGroup>
            {fetchState === FetchState.ERROR && (
              <ErrorText>
                Oops! Something went wrong. Please try again.
              </ErrorText>
            )}
          </form>
        </ModalContent>
      </ModalDialog>
    </Transition>
  );
}
