import { render, screen, act } from '@testing-library/react';
import { getFakeSentences } from '../../lib/test-helpers';
import Window from '../../modules/Window';
import PageContent from '../pageContent';

describe('<PageContent />', () => {
  const children = getFakeSentences();

  beforeEach(() => {
    render(<PageContent>{children}</PageContent>);
  });

  it('should NOT display about by default', () => {
    const contentEl = screen.queryByTestId('content');

    expect(contentEl).toHaveClass('opacity-0');
  });

  it('should display about on window load', () => {
    act(() => {
      Window.emit('load');
    });

    const contentEl = screen.queryByTestId('content');

    expect(contentEl).not.toHaveClass('opacity-0');
  });

  it('should render children', () => {
    const contentEl = screen.queryByText(children);

    expect(contentEl?.tagName).toBe('ARTICLE');
  });
});
