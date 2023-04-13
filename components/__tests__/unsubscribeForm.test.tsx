import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { getFakeEmail } from '@/lib/test-helpers';
import { FetchState } from '@/lib/types';
import * as customHooks from '@/lib/custom-hooks';
import * as apiHooks from '@/lib/api-hooks';
import UnsubscribeForm, { Props } from '../unsubscribeForm';

jest.mock('@/lib/custom-hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/custom-hooks'),
}));
jest.mock('@/lib/api-hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/api-hooks'),
}));

describe('<UnsubscribeForm />', () => {
  const renderComponent = (props: Props) =>
    render(<UnsubscribeForm {...props} />);

  describe('content', () => {
    beforeEach(() => {
      jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

      renderComponent({ onSuccess: jest.fn() });
    });

    it('should render expected title', async () => {
      const titleEl = screen.queryByText('Unsubscribe');

      expect(titleEl?.tagName).toBe('H5');
    });

    it('should render expected description', async () => {
      const descEl = screen.queryByText(
        'To unsubscribe, please enter your email in the form below and confirm. Thank you for your interest in my content.'
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
      const btnEl = screen.queryByText('Confirm');

      expect(btnEl?.tagName).toBe('BUTTON');
      expect(btnEl).toHaveAttribute('type', 'submit');
      expect(btnEl).not.toBeDisabled();
    });
  });

  it('should call API on submit', () => {
    const unsubscribeMock = jest.fn().mockResolvedValue(true);

    jest
      .spyOn(apiHooks, 'useUnsubscribe')
      .mockReturnValue([FetchState.DEFAULT, unsubscribeMock]);

    renderComponent({ onSuccess: jest.fn() });

    const inputEl = screen.queryByPlaceholderText(
      'Email address'
    ) as HTMLInputElement;
    const email = getFakeEmail();

    inputEl.value = email;

    const btnEl = screen.queryByText('Confirm') as HTMLButtonElement;

    fireEvent.click(btnEl);

    expect(unsubscribeMock).toBeCalledTimes(1);
    expect(unsubscribeMock).toBeCalledWith(email);
  });

  it('should should call onSuccess on success', async () => {
    jest
      .spyOn(apiHooks, 'useUnsubscribe')
      .mockReturnValue([FetchState.DEFAULT, jest.fn().mockResolvedValue(true)]);

    const onSuccessMock = jest.fn();

    renderComponent({ onSuccess: onSuccessMock });

    const inputEl = screen.queryByPlaceholderText(
      'Email address'
    ) as HTMLInputElement;
    const email = getFakeEmail();

    fireEvent.change(inputEl, { target: { value: email } });

    const btnEl = screen.queryByText('Confirm') as HTMLButtonElement;

    fireEvent.click(btnEl);

    await waitFor(() => expect(onSuccessMock).toBeCalledTimes(1));
  });

  it('should should NOT call onSuccess on error', async () => {
    jest
      .spyOn(apiHooks, 'useUnsubscribe')
      .mockReturnValue([
        FetchState.DEFAULT,
        jest.fn().mockResolvedValue(false),
      ]);

    const onSuccessMock = jest.fn();

    renderComponent({ onSuccess: onSuccessMock });

    const inputEl = screen.queryByPlaceholderText(
      'Email address'
    ) as HTMLInputElement;
    const email = getFakeEmail();

    fireEvent.change(inputEl, { target: { value: email } });

    const btnEl = screen.queryByText('Confirm') as HTMLButtonElement;

    fireEvent.click(btnEl);

    await waitFor(() => expect(onSuccessMock).not.toBeCalled());
  });

  it('should disable submit on loading', () => {
    jest
      .spyOn(apiHooks, 'useUnsubscribe')
      .mockReturnValue([FetchState.LOADING, jest.fn()]);

    renderComponent({ onSuccess: jest.fn() });

    const btnEl = screen.queryByText('Confirm');

    expect(btnEl).toBeDisabled();
  });

  it('should display error text on error', () => {
    jest
      .spyOn(apiHooks, 'useUnsubscribe')
      .mockReturnValue([FetchState.ERROR, jest.fn()]);

    renderComponent({ onSuccess: jest.fn() });

    const errorEl = screen.queryByText(
      'Oops! Something went wrong. Please try again.'
    );

    expect(errorEl).toBeInTheDocument();
  });
});
