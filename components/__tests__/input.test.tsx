import { render } from '@testing-library/react';
import { getFakeWord } from '@/lib/test-helpers';
import Input, { Props } from '../input';

describe('<Input />', () => {
  const renderComponent = (props: Props) => render(<Input {...props} />);

  it('should have expected tagName', () => {
    const { container } = renderComponent({ name: getFakeWord() });
    const inputEl = container.firstElementChild;

    expect(inputEl?.tagName).toBe('INPUT');
  });

  it('should have accept type prop', () => {
    const type = 'text';
    const { container } = renderComponent({ type, name: getFakeWord() });
    const inputEl = container.firstElementChild;

    expect(inputEl).toHaveAttribute('type', type);
  });

  it('should have accept className prop', () => {
    const className = getFakeWord();
    const { container } = renderComponent({ className, name: getFakeWord() });
    const inputEl = container.firstElementChild;

    expect(inputEl).toHaveClass(className);
  });
});
