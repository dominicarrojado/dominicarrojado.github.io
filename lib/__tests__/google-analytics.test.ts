import { GoogleAnalyticsEvents, SocialName } from '../types';
import { trackEvent } from '../google-analytics';
import {
  getFakeDomainWord,
  getFakeSentence,
  getFakeUrl,
  getFakeWord,
  setReadOnlyProperty,
} from '../test-helpers';

describe('google-analytics utilities', () => {
  describe('trackEvent()', () => {
    const dataLayerOrig = window.dataLayer;
    const locationOrig = window.location;

    beforeEach(() => {
      delete (window as any).dataLayer;
      delete (window as any).location;
    });

    afterEach(() => {
      window.dataLayer = dataLayerOrig;
      setReadOnlyProperty(window, 'location', locationOrig);
    });

    it('should NOT track event on local development', () => {
      setReadOnlyProperty(window, 'location', {
        hostname: 'localhost',
      });

      const event = {
        event: GoogleAnalyticsEvents.SCROLL_CLICK,
        linkText: getFakeSentence(),
      } as const;

      trackEvent(event);

      expect(window.dataLayer).toBeUndefined();
    });

    it('should track event if dataLayer is NOT defined yet', () => {
      setReadOnlyProperty(window, 'location', {
        hostname: getFakeDomainWord(),
      });

      const event = {
        event: GoogleAnalyticsEvents.SOCIAL_HOVER,
        socialName: SocialName.EMAIL,
        hoverText: getFakeWord(),
        hoverUrl: getFakeUrl(),
        linkText: getFakeSentence(),
      } as const;

      trackEvent(event);

      expect(window.dataLayer).toEqual([event]);
    });

    it('should track event if dataLayer is defined', () => {
      setReadOnlyProperty(window, 'location', {
        hostname: getFakeDomainWord(),
      });

      const currentDataLayer = [
        {
          event: GoogleAnalyticsEvents.PROJECT_HOVER,
          projectTitle: getFakeSentence(),
          hoverText: getFakeSentence(),
          hoverUrl: getFakeUrl(),
        },
      ];

      window.dataLayer = [...currentDataLayer];

      const event = {
        event: GoogleAnalyticsEvents.PROJECT_CLICK,
        projectTitle: getFakeSentence(),
        linkText: getFakeSentence(),
        linkUrl: getFakeUrl(),
      } as const;

      trackEvent(event);

      expect(window.dataLayer).toEqual([...currentDataLayer, event]);
    });
  });
});
