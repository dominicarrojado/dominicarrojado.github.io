import { render, screen } from '@testing-library/react';
import { getFakeColor, getFakeWord } from '../../lib/test-helpers';
import Spinner from '../spinner';

describe('<Spinner />', () => {
  it('should accept className and color props', () => {
    const className = getFakeWord();
    const color = getFakeColor();

    render(<Spinner className={className} color={color} />);

    const spinner = screen.queryByTestId('spinner');

    expect(spinner).toHaveClass(className);
    expect(spinner).toHaveStyle({ borderRightColor: color });
  });
});
