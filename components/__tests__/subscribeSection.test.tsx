import { render, screen } from '@testing-library/react';
import { FetchState } from '@/lib/types';
import * as apiHooks from '@/lib/api-hooks';
import SubscribeSection from '../subscribeSection';

jest.mock('@/lib/api-hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/api-hooks'),
}));

describe('<SubscribeSection />', () => {
  const renderComponent = () => render(<SubscribeSection />);

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should call API on mount', () => {
    const verifySubscriptionMock = jest.fn();

    jest
      .spyOn(apiHooks, 'useVerifySubscription')
      .mockReturnValue([FetchState.DEFAULT, verifySubscriptionMock]);

    renderComponent();

    expect(verifySubscriptionMock).toBeCalledTimes(1);
  });

  it('should have expected content on loading', () => {
    jest
      .spyOn(apiHooks, 'useVerifySubscription')
      .mockReturnValue([FetchState.LOADING, jest.fn()]);

    renderComponent();

    const titleEl = screen.queryByText('Verifying subscription...');
    const descEl = screen.queryByText(
      'Please wait while we verify your subscription. This process may take a few moments. Thank you for your patience and interest in my content.'
    );

    expect(titleEl?.tagName).toBe('H5');
    expect(descEl?.tagName).toBe('P');
  });

  it('should have expected content on success', () => {
    jest
      .spyOn(apiHooks, 'useVerifySubscription')
      .mockReturnValue([FetchState.SUCCESS, jest.fn()]);

    renderComponent();

    const titleEl = screen.queryByText('Subscription confirmed');
    const descEl = screen.queryByText(
      "You're now subscribed to my tech blog. Get ready to receive updates on new posts."
    );
    const anchorEl = screen.queryByText('See Latest Posts');

    expect(titleEl?.tagName).toBe('H5');
    expect(descEl?.tagName).toBe('P');
    expect(anchorEl?.tagName).toBe('A');
    expect(anchorEl).toHaveAttribute('href', '/posts');
    expect(anchorEl).not.toHaveAttribute('rel');
    expect(anchorEl).not.toHaveAttribute('target');
  });

  it('should have expected content if NOT found', () => {
    jest
      .spyOn(apiHooks, 'useVerifySubscription')
      .mockReturnValue([FetchState.NOT_FOUND, jest.fn()]);

    renderComponent();

    const titleEl = screen.queryByText('Token expired or not found');
    const descEl = screen.queryByText(
      'Your confirmation token has expired or cannot be found. If you have not confirmed your subscription yet, please resubscribe to receive updates on new posts.'
    );

    expect(titleEl?.tagName).toBe('H5');
    expect(descEl?.tagName).toBe('P');
  });

  it('should have expected content on error', () => {
    jest
      .spyOn(apiHooks, 'useVerifySubscription')
      .mockReturnValue([FetchState.ERROR, jest.fn()]);

    renderComponent();

    const titleEl = screen.queryByText('Something went wrong');
    const descEl = screen.queryByText(
      "Please try again later. If you continue to experience issues, please contact me and we'll do our best to assist you. Thank you for your patience and understanding."
    );

    expect(titleEl?.tagName).toBe('H5');
    expect(descEl?.tagName).toBe('P');
  });
});
