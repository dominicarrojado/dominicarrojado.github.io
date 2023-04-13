import { render, screen } from '@testing-library/react';
import { getFakeSentence } from '@/lib/test-helpers';
import SectionTitle from '../sectionTitle';

describe('<SectionTitle />', () => {
  it('should render children', () => {
    const text = getFakeSentence();

    render(<SectionTitle>{text}</SectionTitle>);

    const titleEl = screen.queryByText(text);

    expect(titleEl?.tagName).toBe('H2');
  });
});
