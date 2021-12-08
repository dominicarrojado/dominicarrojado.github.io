import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { getFakeSentences, getFakeWord } from '../../lib/test-helpers';
import Content from '../content';

describe('<Content />', () => {
  const renderComponent = ({
    className,
    children,
  }: {
    className?: string;
    children: ReactNode;
  }) => {
    render(<Content className={className}>{children}</Content>);
  };

  it('should accept className prop', () => {
    const className = getFakeWord();
    const children = getFakeSentences();

    renderComponent({ className, children });

    const contentEl = screen.queryByText(children);

    expect(contentEl).toHaveClass(className);
  });

  it('should have expected data attribute', () => {
    const children = getFakeSentences();

    renderComponent({ children });

    const contentEl = screen.queryByText(children);

    expect(contentEl).toHaveAttribute('data-clarity-region', 'article');
  });
});
