import { render, screen } from '@testing-library/react';
import { getFakeSentence } from '../../lib/test-helpers';
import AnchorLink from '../anchorLink';

describe('<AnchorLink />', () => {
  beforeEach(() => {
    render(<AnchorLink />);
  });

  it('should render children', () => {
    const text = getFakeSentence();

    render(<AnchorLink>{text}</AnchorLink>);

    const anchorEl = screen.queryByText(text);

    expect(anchorEl?.tagName).toBe('A');
  });
});
