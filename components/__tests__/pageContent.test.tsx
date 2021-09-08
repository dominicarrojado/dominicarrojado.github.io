import { ReactNode } from 'react';
import { render, screen, act } from '@testing-library/react';
import { getFakeSentences, getFakeWord } from '../../lib/test-helpers';
import Window from '../../modules/Window';
import PageContent from '../pageContent';

describe('<PageContent />', () => {
  const renderComponent = ({
    className,
    children,
  }: {
    className?: string;
    children: ReactNode;
  }) => {
    render(<PageContent className={className}>{children}</PageContent>);
  };

  it('should NOT display about by default', () => {
    renderComponent({ children: getFakeSentences() });

    const pageContentEl = screen.queryByTestId('page-content');

    expect(pageContentEl).toHaveClass('opacity-0');
  });

  it('should display about on window load', () => {
    renderComponent({ children: getFakeSentences() });

    act(() => {
      Window.emit('load');
    });

    const pageContentEl = screen.queryByTestId('page-content');

    expect(pageContentEl).not.toHaveClass('opacity-0');
  });

  it('should accept className prop', () => {
    const className = getFakeWord();
    const children = getFakeSentences();

    renderComponent({ className, children });

    const pageContentEl = screen.queryByText(children);

    expect(pageContentEl).toHaveClass(className);
  });
});
