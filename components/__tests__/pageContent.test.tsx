import { render, screen } from '@testing-library/react';
import { getFakeSentences, getFakeWord } from '../../lib/test-helpers';
import * as customHooks from '../../lib/custom-hooks';
import PageContent, { Props } from '../pageContent';

describe('<PageContent />', () => {
  const renderComponent = ({ children, ...props }: Props) => {
    // mock to prevent re-render
    jest.spyOn(customHooks, 'useMounted').mockReturnValue(true);

    return render(<PageContent {...props}>{children}</PageContent>);
  };

  it('should display about on mount', () => {
    renderComponent({ children: getFakeSentences() });

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
