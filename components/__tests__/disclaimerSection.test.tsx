import { render, screen } from '@testing-library/react';
import DisclaimerSection from '../disclaimerSection';

describe('<DisclaimerSection />', () => {
  beforeEach(() => {
    render(<DisclaimerSection />);
  });

  test('should have expected anchors', () => {
    const disclaimerEmail = 'disclaimer@dominicarrojado.com';
    const projectsAnchorEl = screen.queryByText('Projects');
    const emailAnchorEl = screen.queryByText(disclaimerEmail);
    const linkEls = [projectsAnchorEl, emailAnchorEl];
    const fontAwesomeAnchorEl = screen.queryByText('here');

    linkEls.forEach((linkEl) => {
      expect(linkEl?.tagName).toBe('A');
      expect(linkEl).not.toHaveAttribute('target');
      expect(linkEl).not.toHaveAttribute('rel');
    });

    expect(projectsAnchorEl).toHaveAttribute('href', '/projects');

    expect(emailAnchorEl).toHaveAttribute('href', `mailto:${disclaimerEmail}`);

    expect(fontAwesomeAnchorEl?.tagName).toBe('A');
    expect(fontAwesomeAnchorEl).toHaveAttribute(
      'href',
      'https://fontawesome.com/license'
    );
    expect(fontAwesomeAnchorEl).toHaveAttribute('target', '_blank');
    expect(fontAwesomeAnchorEl).toHaveAttribute(
      'rel',
      'noopener noreferrer nofollow'
    );
  });
});
