module.exports = {
  siteUrl: 'https://dominicarrojado.com',
  generateRobotsTxt: true,
  additionalPaths: async (config) => {
    const configNoTrailingSlash = {
      ...config,
      trailingSlash: false,
    };

    return [
      // axa edms
      await config.transform(config, '/axa-smart-travel-edm/'),
      await config.transform(config, '/axa-smart-travel-2-edm/'),
      await config.transform(config, '/axa-mothers-day-edm/'),
      await config.transform(config, '/axa-shield-edm/'),
      await config.transform(config, '/axa-smart-home-edm/'),
      await config.transform(config, '/axa-singtel-edm/'),
      await config.transform(config, '/axa-september-promo-edm/'),

      // m1 edms
      await config.transform(config, '/m1-data-passport-edm/'),
      await config.transform(config, '/m1-data-passport-2-edm/'),
      await config.transform(config, '/m1-data-passport-3-edm/'),
      await config.transform(config, '/m1-data-passport-4-edm/'),

      // hashtag interactive edms
      await config.transform(config, '/hashtag-interactive-welcome-edm/'),

      // hashtag interactive apps
      await config.transform(config, '/hashtag-interactive-christmas-game/'),
      await config.transform(
        config,
        '/hashtag-interactive-valentines-day-card-app/'
      ),

      // hashtag interactive website
      await config.transform(config, '/hashtag-interactive-website/'),
      await config.transform(
        configNoTrailingSlash,
        '/hashtag-interactive-website/blog-single.html'
      ),
      await config.transform(
        configNoTrailingSlash,
        '/hashtag-interactive-website/blog.html'
      ),
      await config.transform(
        configNoTrailingSlash,
        '/hashtag-interactive-website/branding.html'
      ),
      await config.transform(
        configNoTrailingSlash,
        '/hashtag-interactive-website/careers.html'
      ),
      await config.transform(
        configNoTrailingSlash,
        '/hashtag-interactive-website/contact-us.html'
      ),
      await config.transform(
        configNoTrailingSlash,
        '/hashtag-interactive-website/content-marketing.html'
      ),
      await config.transform(
        configNoTrailingSlash,
        '/hashtag-interactive-website/growth-hacking.html'
      ),
      await config.transform(
        configNoTrailingSlash,
        '/hashtag-interactive-website/internship.html'
      ),
      await config.transform(
        configNoTrailingSlash,
        '/hashtag-interactive-website/our-story.html'
      ),
      await config.transform(
        configNoTrailingSlash,
        '/hashtag-interactive-website/privacy-policy.html'
      ),
      await config.transform(
        configNoTrailingSlash,
        '/hashtag-interactive-website/research-and-analytics.html'
      ),
      await config.transform(
        configNoTrailingSlash,
        '/hashtag-interactive-website/social-media-marketing.html'
      ),
      await config.transform(
        configNoTrailingSlash,
        '/hashtag-interactive-website/strategic-online-media-and-planning.html'
      ),
      await config.transform(
        configNoTrailingSlash,
        '/hashtag-interactive-website/strategic-planning.html'
      ),
      await config.transform(
        configNoTrailingSlash,
        '/hashtag-interactive-website/web-and-interactive.html'
      ),
      await config.transform(
        configNoTrailingSlash,
        '/hashtag-interactive-website/what-we-do.html'
      ),

      // cnb apps
      await config.transform(config, '/cnb-anti-drug-abuse-campaign-app/'),
      await config.transform(
        config,
        '/cnb-anti-drug-abuse-campaign-app/enter/'
      ),
      await config.transform(
        config,
        '/cnb-anti-drug-abuse-campaign-app/gallery/'
      ),
      await config.transform(
        config,
        '/cnb-anti-drug-abuse-campaign-slideshow/'
      ),

      // singtel apps
      await config.transform(config, '/singtel-data-x-infinity-event-app/'),
      await config.transform(
        config,
        '/singtel-data-x-infinity-event-app/enter/'
      ),
      await config.transform(
        config,
        '/singtel-data-x-infinity-event-app/gallery/'
      ),
      await config.transform(
        config,
        '/singtel-data-x-infinity-event-slideshow/'
      ),

      // kronenbourg website
      await config.transform(config, '/kronenbourg-website/'),
      await config.transform(
        configNoTrailingSlash,
        '/kronenbourg-website/privacy-policy.html'
      ),
      await config.transform(
        configNoTrailingSlash,
        '/kronenbourg-website/smoobar-contest-terms-and-conditions.html'
      ),
      await config.transform(
        configNoTrailingSlash,
        '/kronenbourg-website/subscribe.html'
      ),
      await config.transform(
        configNoTrailingSlash,
        '/kronenbourg-website/terms-of-use.html'
      ),

      // aptamil apps
      await config.transform(
        config,
        '/aptamil-build-your-babys-foundation-to-be-one-step-ahead-app/'
      ),
      await config.transform(
        config,
        '/aptamil-build-your-babys-foundation-to-be-one-step-ahead-app/1st-pillar-of-foundation-natural-defences/'
      ),
      await config.transform(
        config,
        '/aptamil-build-your-babys-foundation-to-be-one-step-ahead-app/2nd-pillar-of-foundation-brain-development/'
      ),
      await config.transform(
        config,
        '/aptamil-build-your-babys-foundation-to-be-one-step-ahead-app/how-to-win/'
      ),
      await config.transform(
        config,
        '/aptamil-build-your-babys-foundation-to-be-one-step-ahead-app/test-your-knowledge/'
      ),

      // maybank website
      await config.transform(config, '/maybank-fc-barcelona-website/'),

      // qwerk website
      await config.transform(config, '/qwerk-website/'),
      await config.transform(
        configNoTrailingSlash,
        '/qwerk-website/about.html'
      ),
      await config.transform(
        configNoTrailingSlash,
        '/qwerk-website/contact-us.html'
      ),
      await config.transform(configNoTrailingSlash, '/qwerk-website/faq.html'),

      // razer apps
      await config.transform(config, '/mouse-accuracy-game/'),

      // blog examples
      await config.transform(config, '/mjml-sample-edm/'),
      await config.transform(config, '/react-typescript-accordion/'),
      await config.transform(config, '/react-typescript-api-hooks/'),
      await config.transform(config, '/react-typescript-swiper/'),
      await config.transform(config, '/react-typescript-otp-input/'),
      await config.transform(config, '/react-typescript-pagination/'),
    ];
  },
};
