import { render, screen } from '@testing-library/react';
import {
  getFakeWord,
  getRandomGoogleAdSenseUnit,
} from '../../lib/test-helpers';
import { GOOGLE_ADSENSE_CLIENT_ID } from '../../lib/constants';
import AdUnit, { Props } from '../adUnit';

describe('<AdUnit />', () => {
  const renderComponent = (props: Props) => render(<AdUnit {...props} />);

  describe('content', () => {
    const adSlot = getRandomGoogleAdSenseUnit();

    beforeEach(() => {
      renderComponent({ adSlot });
    });

    it('should have expected client ID', () => {
      const adUnitEl = screen.queryByTestId('ad-unit');

      expect(adUnitEl).toHaveAttribute(
        'data-ad-client',
        GOOGLE_ADSENSE_CLIENT_ID
      );
    });

    it('should have expected ad slot', () => {
      const adUnitEl = screen.queryByTestId('ad-unit');

      expect(adUnitEl).toHaveAttribute('data-ad-slot', adSlot);
    });

    it('should have expected format', () => {
      const adUnitEl = screen.queryByTestId('ad-unit');

      expect(adUnitEl).toHaveAttribute('data-ad-format', 'auto');
    });

    it('should have expected full width responsive', () => {
      const adUnitEl = screen.queryByTestId('ad-unit');

      expect(adUnitEl).toHaveAttribute('data-full-width-responsive', 'true');
    });

    it('should NOT have adtest', () => {
      const adUnitEl = screen.queryByTestId('ad-unit');

      expect(adUnitEl).not.toHaveAttribute('data-adtest');
    });

    it('should have expected inline style', () => {
      const adUnitEl = screen.queryByTestId('ad-unit');

      expect(adUnitEl).toHaveStyle({ display: 'block' });
    });
  });

  it('should accept className prop', () => {
    const className = getFakeWord();

    const { container } = renderComponent({
      className,
      adSlot: getRandomGoogleAdSenseUnit(),
    });

    expect(container.firstChild).toHaveClass(className);
  });
});
