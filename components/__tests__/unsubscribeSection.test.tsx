import React from 'react';
import { act, render } from '@testing-library/react';
import * as UnsubscribeForm from '../unsubscribeForm';
import * as UnsubscribeSuccess from '../unsubscribeSuccess';
import UnsubscribeSection from '../unsubscribeSection';

jest.mock('../unsubscribeForm', () => ({
  __esModule: true,
  ...jest.requireActual('../unsubscribeForm'),
}));
jest.mock('../unsubscribeSuccess', () => ({
  __esModule: true,
  ...jest.requireActual('../unsubscribeSuccess'),
}));

describe('<UnsubscribeSection />', () => {
  const renderComponent = () => render(<UnsubscribeSection />);

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render form component by default', () => {
    const unsubscribeFormSpy = jest.spyOn(UnsubscribeForm, 'default');
    const unsubscribeSuccessSpy = jest.spyOn(UnsubscribeSuccess, 'default');

    renderComponent();

    expect(unsubscribeFormSpy).toBeCalledTimes(1);
    expect(unsubscribeSuccessSpy).not.toBeCalled();
  });

  it('should render success component on success', () => {
    let onSuccessFunc = () => {};

    const unsubscribeFormMock = jest
      .spyOn(UnsubscribeForm, 'default')
      .mockImplementation(({ onSuccess }) => {
        onSuccessFunc = onSuccess;
        return <></>;
      });

    const unsubscribeSuccessSpy = jest.spyOn(UnsubscribeSuccess, 'default');

    renderComponent();

    unsubscribeFormMock.mockClear();

    act(() => {
      onSuccessFunc();
    });

    expect(unsubscribeFormMock).not.toBeCalled();
    expect(unsubscribeSuccessSpy).toBeCalledTimes(1);
  });
});
