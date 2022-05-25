import { render } from '@testing-library/react';
import { getFakeWord } from '../../lib/test-helpers';
import AdUnit, { Props } from '../adUnit';

describe('<AdUnit />', () => {
  const renderComponent = (props: Props) => render(<AdUnit {...props} />);

  it('should accept className prop', () => {
    const className = getFakeWord();

    const { container } = renderComponent({ className });

    expect(container.firstChild).toHaveClass(className);
  });
});
