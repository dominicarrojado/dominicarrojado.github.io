import { render, screen } from '@testing-library/react';
import { getFakeSentence } from '../../lib/test-helpers';
import SectionContent from '../sectionContent';

describe('<SectionContent />', () => {
  it('should accept className and children', () => {
    const text = getFakeSentence();

    render(<SectionContent>{text}</SectionContent>);

    const contentEl = screen.queryByText(text);

    expect(contentEl?.tagName).toBe('P');
  });
});
