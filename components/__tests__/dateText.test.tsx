import { render, screen } from '@testing-library/react';
import { getFakeDate, getFakeWord, getMonthName } from '../../lib/test-helpers';
import DateText from '../dateText';

describe('<DateText />', () => {
  const renderComponent = (props: { dateString: string; className?: string }) =>
    render(<DateText {...props} />);

  it('should render formatted date', () => {
    const dateString = getFakeDate();
    const dateObj = new Date(dateString);
    const formattedDate = `${getMonthName(
      dateObj.getMonth()
    )} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;

    const { container } = renderComponent({ dateString });

    const dateEl = screen.queryByText(formattedDate);

    expect(container.firstChild).toEqual(dateEl);
    expect(dateEl?.tagName).toBe('TIME');
    expect(dateEl).toHaveAttribute('datetime', dateString);
  });

  it('should accept className prop', () => {
    const className = getFakeWord();
    const dateString = getFakeDate();

    const { container } = renderComponent({ dateString, className });

    expect(container.firstChild).toHaveClass(className);
  });
});
