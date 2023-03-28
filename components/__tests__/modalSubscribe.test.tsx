import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { getDialogStateMock, getFakeEmail } from '../../lib/test-helpers';
import { FetchState } from '../../lib/types';
import * as apiHooks from '../../lib/api-hooks';
import * as Modal from '../modal';
import ModalSubscribe, { Props } from '../modalSubscribe';

describe('<ModalSubscribe />', () => {
  const renderComponent = (props: Props) =>
    render(<ModalSubscribe {...props} />);

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('content', () => {
    beforeEach(() => {
      renderComponent({
        dialog: { ...getDialogStateMock(), visible: true },
        onSuccess: jest.fn(),
      });
    });

    it('should have expected title', () => {
      const titleEl = screen.queryByText('Stay up to date');

      expect(titleEl?.tagName).toBe('H5');
    });

    it('should have expected description', () => {
      const descEl = screen.queryByText(
        'Get notified when I publish something new, and unsubscribe at any time.'
      );

      expect(descEl?.tagName).toBe('P');
    });

    it('should have expected input', () => {
      const inputEl = screen.queryByPlaceholderText('Email address');

      expect(inputEl?.tagName).toBe('INPUT');
      expect(inputEl).toHaveAttribute('type', 'email');
      expect(inputEl).toHaveAttribute('autocomplete', 'email');
    });

    it('should have expected submit button', () => {
      const btnEl = screen.queryByText('Join');

      expect(btnEl?.tagName).toBe('BUTTON');
      expect(btnEl).toHaveAttribute('type', 'submit');
      expect(btnEl).not.toBeDisabled();
    });
  });

  it('should focus on email input on after enter', () => {
    let afterEnterFunc = () => {};

    jest
      .spyOn(Modal, 'default')
      .mockImplementation(({ afterEnter, children }) => {
        if (afterEnter) {
          afterEnterFunc = afterEnter;
        }

        return <>{children}</>;
      });

    renderComponent({
      dialog: { ...getDialogStateMock(), visible: true },
      onSuccess: jest.fn(),
    });

    afterEnterFunc();

    const inputEl = screen.queryByPlaceholderText('Email address');

    expect(inputEl).toHaveFocus();
  });

  it('should call API on submit', () => {
    const submitSubscribeRequestMock = jest.fn().mockResolvedValue(true);

    jest
      .spyOn(apiHooks, 'useSubmitSubscribeRequest')
      .mockReturnValue([FetchState.DEFAULT, submitSubscribeRequestMock]);

    renderComponent({
      dialog: { ...getDialogStateMock(), visible: true },
      onSuccess: jest.fn(),
    });

    const inputEl = screen.queryByPlaceholderText(
      'Email address'
    ) as HTMLInputElement;
    const email = getFakeEmail();

    inputEl.value = email;

    const btnEl = screen.queryByText('Join') as HTMLButtonElement;

    fireEvent.submit(btnEl);

    expect(submitSubscribeRequestMock).toBeCalledTimes(1);
    expect(submitSubscribeRequestMock).toBeCalledWith(email);
  });

  it('should should call onSuccess on success', async () => {
    jest
      .spyOn(apiHooks, 'useSubmitSubscribeRequest')
      .mockReturnValue([FetchState.DEFAULT, jest.fn().mockResolvedValue(true)]);

    const onSuccessMock = jest.fn();

    renderComponent({
      dialog: { ...getDialogStateMock(), visible: true },
      onSuccess: onSuccessMock,
    });

    const inputEl = screen.queryByPlaceholderText(
      'Email address'
    ) as HTMLInputElement;
    const email = getFakeEmail();

    fireEvent.change(inputEl, { target: { value: email } });

    const btnEl = screen.queryByText('Join') as HTMLButtonElement;

    fireEvent.click(btnEl);

    await waitFor(() => expect(onSuccessMock).toBeCalledTimes(1));
    expect(onSuccessMock).toBeCalledWith(email);
  });

  it('should should NOT call onSuccess on error', async () => {
    jest
      .spyOn(apiHooks, 'useSubmitSubscribeRequest')
      .mockReturnValue([
        FetchState.DEFAULT,
        jest.fn().mockResolvedValue(false),
      ]);

    const onSuccessMock = jest.fn();

    renderComponent({
      dialog: { ...getDialogStateMock(), visible: true },
      onSuccess: onSuccessMock,
    });

    const inputEl = screen.queryByPlaceholderText(
      'Email address'
    ) as HTMLInputElement;
    const email = getFakeEmail();

    fireEvent.change(inputEl, { target: { value: email } });

    const btnEl = screen.queryByText('Join') as HTMLButtonElement;

    fireEvent.click(btnEl);

    await waitFor(() => expect(onSuccessMock).not.toBeCalled());
  });

  it('should disable submit on loading', () => {
    jest
      .spyOn(apiHooks, 'useSubmitSubscribeRequest')
      .mockReturnValue([FetchState.LOADING, jest.fn()]);

    renderComponent({
      dialog: { ...getDialogStateMock(), visible: true },
      onSuccess: jest.fn(),
    });

    const btnEl = screen.queryByText('Join');

    expect(btnEl).toBeDisabled();
  });

  it('should display error text on error', () => {
    jest
      .spyOn(apiHooks, 'useSubmitSubscribeRequest')
      .mockReturnValue([FetchState.ERROR, jest.fn()]);

    renderComponent({
      dialog: { ...getDialogStateMock(), visible: true },
      onSuccess: jest.fn(),
    });

    const errorEl = screen.queryByText(
      'Oops! Something went wrong. Please try again.'
    );

    expect(errorEl).toBeInTheDocument();
  });
});
