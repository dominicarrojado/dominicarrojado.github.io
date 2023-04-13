import { render, screen } from '@testing-library/react';
import { getFakeSentence, getFakeWord } from '@/lib/test-helpers';
import Section from '../section';

describe('<Section />', () => {
  it('should accept props and children', () => {
    const id = getFakeWord();
    const className = getFakeWord();
    const text = getFakeSentence();

    render(
      <Section id={id} className={className}>
        {text}
      </Section>
    );

    const sectionEl = screen.queryByText(text);

    expect(sectionEl?.tagName).toBe('SECTION');
    expect(sectionEl).toHaveAttribute('id', id);
    expect(sectionEl).toHaveClass(className);
  });
});
