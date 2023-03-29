import React from 'react';
import { useUnsubscribe } from '../lib/api-hooks';
import { trackEvent } from '../lib/google-analytics';
import { getRefValue } from '../lib/hooks';
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
import { MAIN_TITLE } from '../lib/constants';

export type Props = { onSuccess: () => void };

export default function UnsubscribeForm({ onSuccess }: Props) {
  const inputEmailRef = React.useRef<HTMLInputElement>(null);
  const [fetchState, unsubscribe] = useUnsubscribe();
  const isLoading = fetchState === FetchState.LOADING;
  const btnText = 'Confirm';
  const formOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputEmail = getRefValue(inputEmailRef);
    const isSuccess = await unsubscribe(inputEmail.value);

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
              ref={inputEmailRef}
              type="email"
              autoComplete="email"
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
            <ErrorText>Oops! Something went wrong. Please try again.</ErrorText>
          )}
        </form>
      </ModalContent>
    </ModalDialog>
  );
}
