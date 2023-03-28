import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import {
  fireEventTransitionEnd,
  getFakeEmail,
  getFakeWord,
  getStoreContextMock,
} from '../../lib/test-helpers';
import { StoreContext } from '../../lib/store';
import { StoreContextType } from '../../lib/types';
import * as customHooks from '../../lib/custom-hooks';
import * as ga from '../../lib/google-analytics';
import * as ModalSubscribe from '../modalSubscribe';
import SubscribeButton from '../subscribeButton';

describe('<SubscribeButton />', () => {
  const renderComponent = ({
    storeContext,
  }: {
    storeContext?: StoreContextType;
  }) =>
    render(
      <StoreContext.Provider value={getStoreContextMock(storeContext)}>
        <SubscribeButton />
      </StoreContext.Provider>
    );

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should display subscribe modal on click', async () => {
    renderComponent({});

    const btnEl = screen.queryByText('Subscribe') as HTMLDivElement;
    const modalLabelText = 'Stay up to date';
    let modalEl = screen.queryByLabelText(modalLabelText);

    expect(modalEl).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.click(btnEl);
    });

    modalEl = screen.queryByLabelText(modalLabelText);

    expect(modalEl).toBeInTheDocument();
  });

  it('should display subscribe modal on click', async () => {
    const trackEventSpy = jest.spyOn(ga, 'trackEvent');

    renderComponent({});

    const labelText = 'Subscribe';
    const btnEl = screen.queryByText(labelText) as HTMLDivElement;
    const modalLabelText = 'Stay up to date';
    let modalEl = screen.queryByLabelText(modalLabelText);

    expect(modalEl).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.click(btnEl);
    });

    modalEl = screen.queryByLabelText(modalLabelText);

    expect(modalEl).toBeInTheDocument();

    expect(trackEventSpy).toBeCalledTimes(1);
    expect(trackEventSpy).toBeCalledWith({
      event: 'modal_open',
      projectTitle: 'Dominic Arrojado',
      modalTitle: labelText,
      buttonText: labelText,
    });
  });

  it('should hide subscribe modal on close click', async () => {
    const trackEventSpy = jest.spyOn(ga, 'trackEvent');

    renderComponent({});

    const labelText = 'Subscribe';
    const subscribeLabelEl = screen.queryByText(labelText) as HTMLDivElement;

    await act(async () => {
      fireEvent.click(subscribeLabelEl);
    });

    trackEventSpy.mockClear();

    const closeBtnEl = screen.queryByText('close') as HTMLButtonElement;

    await act(async () => {
      fireEvent.click(closeBtnEl);
    });

    const modalEl = screen.queryByLabelText('Stay up to date');

    expect(modalEl).not.toBeInTheDocument();

    expect(trackEventSpy).toBeCalledTimes(1);
    expect(trackEventSpy).toBeCalledWith({
      event: 'modal_close',
      projectTitle: 'Dominic Arrojado',
      modalTitle: labelText,
      buttonText: labelText,
    });
  });

  it('should have expected class on transition end (opacity)', () => {
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(false);

    renderComponent({});

    const subscribeLabelEl = screen.queryByText('Subscribe') as HTMLDivElement;

    fireEventTransitionEnd(subscribeLabelEl, 'opacity');

    expect(subscribeLabelEl).not.toHaveClass('opacity-0');
    expect(subscribeLabelEl).toHaveClass('duration-200');
  });

  it('should have expected class on transition end (other prop name)', () => {
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(false);

    renderComponent({});

    const subscribeLabelEl = screen.queryByText('Subscribe') as HTMLDivElement;

    fireEventTransitionEnd(subscribeLabelEl, getFakeWord());

    expect(subscribeLabelEl).toHaveClass('opacity-0 duration-700');
  });

  it('should track on success', async () => {
    const trackEventSpy = jest.spyOn(ga, 'trackEvent');

    let onSuccessMock = (email: string) => {};

    jest
      .spyOn(ModalSubscribe, 'default')
      .mockImplementation(({ onSuccess }) => {
        onSuccessMock = onSuccess;
        return <></>;
      });

    renderComponent({});

    const email = getFakeEmail();

    await act(async () => {
      onSuccessMock(email);
    });

    expect(trackEventSpy).toBeCalledTimes(1);
    expect(trackEventSpy).toBeCalledWith({
      event: 'subscribe_form_submit',
      projectTitle: 'Dominic Arrojado',
      buttonText: 'Subscribe',
    });
  });
});
