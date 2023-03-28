import { render } from '@testing-library/react';
import * as UnsubscribeSection from '../../components/unsubscribeSection';
import Unsubscribe from '../unsubscribe.page';

describe('<Unsubscribe />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render expected components', () => {
    const unsubscribeSectionSpy = jest.spyOn(UnsubscribeSection, 'default');

    render(<Unsubscribe />);

    expect(unsubscribeSectionSpy).toBeCalledTimes(1);
  });
});
