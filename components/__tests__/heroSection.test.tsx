import { render, screen } from '@testing-library/react';
import { getFakeBoolean, getFakeSentence } from '@/lib/test-helpers';
import HeroSection, { Props } from '../heroSection';

describe('<HeroSection />', () => {
  const renderComponent = ({ children, ...props }: Props) =>
    render(<HeroSection {...props}>{children}</HeroSection>);

  it('should render children', () => {
    const text = getFakeSentence();

    renderComponent({
      children: text,
      isMinHeightFull: getFakeBoolean(),
    });

    const containerEl = screen.queryByText(text);

    expect(containerEl).toBeInTheDocument();
  });

  it('should have smaller min height by default', () => {
    const text = getFakeSentence();

    renderComponent({
      children: text,
      isMinHeightFull: false,
    });

    const containerEl = screen.queryByText(text);

    expect(containerEl).toHaveClass('min-h-96 py-28');
    expect(containerEl).not.toHaveClass('min-h-full');
  });

  it('should have full min height if isMinHeightFull is true', () => {
    const text = getFakeSentence();

    renderComponent({
      children: text,
      isMinHeightFull: true,
    });

    const containerEl = screen.queryByText(text);

    expect(containerEl).toHaveClass('min-h-full');
    expect(containerEl).not.toHaveClass('min-h-96 py-32');
  });
});
