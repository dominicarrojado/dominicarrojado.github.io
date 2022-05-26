import { render, screen } from '@testing-library/react';
import {
  getFakeWord,
  getRandomGoogleAdSenseUnit,
  getRandomGoogleAdSenseUnitFormat,
  getRandomGoogleAdsenseUnitLayout,
} from '../../lib/test-helpers';
import { GOOGLE_ADSENSE_CLIENT_ID } from '../../lib/constants';
import AdUnit, { Props } from '../adUnit';

describe('<AdUnit />', () => {
  const renderComponent = (props: Props) => render(<AdUnit {...props} />);

  describe('content', () => {
    const adSlot = getRandomGoogleAdSenseUnit();
    const adFormat = getRandomGoogleAdSenseUnitFormat();

    beforeEach(() => {
      renderComponent({ adSlot, adFormat });
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

    it('should have expected ad format', () => {
      const adUnitEl = screen.queryByTestId('ad-unit');

      expect(adUnitEl).toHaveAttribute('data-ad-format', adFormat);
    });

    it('should have expected full width responsive', () => {
      const adUnitEl = screen.queryByTestId('ad-unit');

      expect(adUnitEl).toHaveAttribute('data-full-width-responsive', 'true');
    });

    it('should NOT have adtest', () => {
      const adUnitEl = screen.queryByTestId('ad-unit');

      expect(adUnitEl).not.toHaveAttribute('data-adtest');
    });
  });

  it('should accept adLayout prop', () => {
    const adLayout = getRandomGoogleAdsenseUnitLayout();

    renderComponent({
      adLayout,
      adSlot: getRandomGoogleAdSenseUnit(),
      adFormat: getRandomGoogleAdSenseUnitFormat(),
    });

    const adUnitEl = screen.queryByTestId('ad-unit');

    expect(adUnitEl).toHaveAttribute('data-ad-layout', adLayout);
  });

  it('should accept className prop', () => {
    const className = getFakeWord();

    const { container } = renderComponent({
      className,
      adSlot: getRandomGoogleAdSenseUnit(),
      adFormat: getRandomGoogleAdSenseUnitFormat(),
    });

    expect(container.firstChild).toHaveClass(className);
  });
});
