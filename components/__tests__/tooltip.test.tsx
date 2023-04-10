import { render, screen } from '@testing-library/react';
import {
  getFakeSentence,
  getFakeWord,
  getTooltipStateMock,
} from '../../lib/test-helpers';
import { TOOLTIP_PLACEMENTS } from '../../lib/constants';
import Tooltip, { Props } from '../tooltip';

describe('<Tooltip />', () => {
  const placements = ['top', 'bottom', 'left', 'right'];
  const renderComponent = ({ children, ...props }: Props) =>
    render(<Tooltip {...props}>{children}</Tooltip>);

  it('should NOT display by default', () => {
    const text = getFakeSentence();

    renderComponent({
      tooltip: getTooltipStateMock({ open: false }),
      children: text,
    });

    expect(screen.queryByText(text)).toHaveClass('opacity-0');
  });

  it('should display on visible true', () => {
    const text = getFakeSentence();

    renderComponent({
      tooltip: getTooltipStateMock({ open: true }),
      children: text,
    });

    expect(screen.queryByText(text)).not.toHaveClass('opacity-0');
  });

  it('should render text', () => {
    TOOLTIP_PLACEMENTS.forEach((placement) => {
      const text = getFakeSentence();

      const component = renderComponent({
        tooltip: getTooltipStateMock({
          placement: placement as any,
          open: true,
        }),
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
      tooltip: getTooltipStateMock({ open: true }),
      children: text,
    });

    const contentEl = screen.queryByText(text);

    expect(contentEl).toHaveClass(className);
  });
});
