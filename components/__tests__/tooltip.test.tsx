import { render, screen } from '@testing-library/react';
import { getFakeSentence, getFakeWord } from '../../lib/test-helpers';
import Tooltip, { Props } from '../tooltip';

describe('<Tooltip />', () => {
  const placements = ['top', 'bottom', 'left', 'right'];
  const renderComponent = ({ children, ...props }: Props) =>
    render(<Tooltip {...props}>{children}</Tooltip>);

  it('should NOT display by default', () => {
    const text = getFakeSentence();

    renderComponent({
      tooltip: { placement: 'top', visible: false } as any,
      children: text,
    });

    expect(screen.queryByText(text)).toHaveClass('opacity-0');
  });

  it('should display on visible true', () => {
    const text = getFakeSentence();
    const className = getFakeWord();

    renderComponent({
      tooltip: { placement: 'top', visible: true } as any,
      children: text,
    });

    expect(screen.queryByText(text)).not.toHaveClass('opacity-0');
  });

  it('should render text', () => {
    placements.forEach((placement) => {
      const text = getFakeSentence();

      const component = renderComponent({
        tooltip: { placement, visible: true } as any,
        children: text,
      });

      expect(screen.queryByText(text)).toBeInTheDocument();

      component.unmount();
    });
  });

  it('should accept className prop', () => {
    const text = getFakeSentence();
    const className = getFakeWord();

    renderComponent({
      className,
      tooltip: { placement: 'top', visible: true } as any,
      children: text,
    });

    const contentEl = screen.queryByText(text);

    expect(contentEl).toHaveClass(className);
  });
});
