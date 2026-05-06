/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://dominicarrojado.com',
  generateRobotsTxt: true,
  outDir: './out',
  exclude: ['/subscribe'],
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

      // japan visa checker
      await config.transform(
        config,
        '/japan-visa-appointment-booking-system-notifications/'
      ),
      await config.transform(
        config,
        '/japan-visa-appointment-booking-system-notifications/unsubscribe/'
      ),

      // sg alerts
      await config.transform(config, '/sg-alerts/'),
      await config.transform(config, '/sg-alerts/settings/'),
      await config.transform(config, '/sg-alerts/about/'),
      await config.transform(config, '/sg-alerts/how-it-works/'),
      await config.transform(config, '/sg-alerts/donate/'),
      await config.transform(config, '/sg-alerts/categories/driving/'),
      await config.transform(
        config,
        '/sg-alerts/categories/driving/comfortdelgro-driving-centre/'
      ),
      await config.transform(
        config,
        '/sg-alerts/categories/driving/singapore-safety-driving-centre/'
      ),
      await config.transform(
        config,
        '/sg-alerts/categories/driving/bukit-batok-driving-centre/'
      ),
      await config.transform(config, '/sg-alerts/categories/japan-visa/'),
      await config.transform(config, '/sg-alerts/categories/travel/'),
      await config.transform(config, '/sg-alerts/categories/money/'),
      await config.transform(config, '/sg-alerts/categories/dining/'),
      await config.transform(config, '/sg-alerts/categories/events/'),
      await config.transform(config, '/sg-alerts/categories/entertainment/'),
      await config.transform(config, '/sg-alerts/categories/theme-parks/'),
      await config.transform(
        config,
        '/sg-alerts/topics/japan-visa-appointment-slots/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/cdc-practical-lesson-slots/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/cdc-class-2-practical-lesson-slots/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/cdc-class-2a-practical-lesson-slots/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/cdc-class-2b-practical-lesson-slots/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/cdc-simulator-course-slots/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/cdc-practical-test-slots/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/cdc-appointment-slots/'
      ),
      await config.transform(config, '/sg-alerts/topics/fixed-deposit-rates/'),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/kuala-lumpur/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/penang/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/phuket/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/jakarta/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/medan/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/ho-chi-minh-city/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/denpasar-bali/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/surabaya/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/hong-kong/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/phnom-penh/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/mumbai/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/da-nang/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/manila/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/hanoi/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/chennai/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/yangon/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/cebu/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/bangkok/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/siem-reap/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/kolkata/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/shenzhen/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/bengaluru/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/guangzhou/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/ahmedabad/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/taipei/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/xiamen/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/bandar-seri-begawan/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/beijing/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/chongqing/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/hangzhou/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/chengdu/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/hyderabad/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/darwin/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/kochi/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/delhi/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/shanghai/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/seoul/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/colombo/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/dhaka/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/cairns/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/perth/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/busan/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/kathmandu/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/osaka/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/nagoya/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/male/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/sydney/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/brisbane/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/melbourne/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/adelaide/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/tokyo/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/fukuoka/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/istanbul/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/johannesburg/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/dubai/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/sapporo/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/frankfurt/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/brussels/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/barcelona/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/san-francisco/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/los-angeles/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/milan/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/london/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/paris/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/munich/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/zurich/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/manchester/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/seattle/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/rome/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/auckland/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/copenhagen/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/amsterdam/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/christchurch/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/cape-town/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/new-york/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/houston/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/singapore-airlines-flights/riyadh/'
      ),
      await config.transform(config, '/sg-alerts/topics/scoot-flights/'),
      await config.transform(
        config,
        '/sg-alerts/topics/scoot-flights/kuala-lumpur/'
      ),
      await config.transform(config, '/sg-alerts/topics/scoot-flights/penang/'),
      await config.transform(
        config,
        '/sg-alerts/topics/scoot-flights/langkawi/'
      ),
      await config.transform(config, '/sg-alerts/topics/scoot-flights/ipoh/'),
      await config.transform(config, '/sg-alerts/topics/scoot-flights/phuket/'),
      await config.transform(
        config,
        '/sg-alerts/topics/scoot-flights/jakarta/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/scoot-flights/bangkok/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/scoot-flights/kota-kinabalu/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/scoot-flights/denpasar-bali/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/scoot-flights/ho-chi-minh-city/'
      ),
      await config.transform(config, '/sg-alerts/topics/scoot-flights/taipei/'),
      await config.transform(config, '/sg-alerts/topics/scoot-flights/manila/'),
      await config.transform(
        config,
        '/sg-alerts/topics/scoot-flights/chennai/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/scoot-flights/chiang-mai/'
      ),
      await config.transform(config, '/sg-alerts/topics/scoot-flights/perth/'),
      await config.transform(
        config,
        '/sg-alerts/topics/scoot-flights/guangzhou/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/scoot-flights/hong-kong/'
      ),
      await config.transform(config, '/sg-alerts/topics/scoot-flights/seoul/'),
      await config.transform(config, '/sg-alerts/topics/scoot-flights/macau/'),
      await config.transform(config, '/sg-alerts/topics/scoot-flights/osaka/'),
      await config.transform(
        config,
        '/sg-alerts/topics/scoot-flights/tiruchirappalli/'
      ),
      await config.transform(config, '/sg-alerts/topics/scoot-flights/sydney/'),
      await config.transform(config, '/sg-alerts/topics/scoot-flights/jeju/'),
      await config.transform(config, '/sg-alerts/topics/scoot-flights/tokyo/'),
      await config.transform(config, '/sg-alerts/topics/jetstar-flights/'),
      await config.transform(config, '/sg-alerts/topics/coe-bidding-results/'),
      await config.transform(config, '/sg-alerts/topics/ktm-train-tickets/'),
      await config.transform(
        config,
        '/sg-alerts/topics/ssdc-appointment-slots/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/ssdc-practical-test-slots/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/bbdc-appointment-slots/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/tokyo-disneyland-attraction-updates/'
      ),
      await config.transform(
        config,
        '/sg-alerts/topics/tokyo-disneysea-attraction-updates/'
      ),
      await config.transform(config, '/sg-alerts/topics/toto-snowballs/'),

      // ph alerts
      await config.transform(config, '/ph-alerts/'),
      await config.transform(config, '/ph-alerts/settings/'),
      await config.transform(config, '/ph-alerts/about/'),
      await config.transform(config, '/ph-alerts/how-it-works/'),
      await config.transform(config, '/ph-alerts/topics/cebu-pacific-flights/'),
      await config.transform(config, '/ph-alerts/topics/jetstar-flights/'),

      // blog examples
      await config.transform(config, '/mjml-sample-edm/'),
      await config.transform(config, '/react-typescript-accordion/'),
      await config.transform(config, '/react-typescript-api-hooks/'),
      await config.transform(config, '/react-typescript-swiper/'),
      await config.transform(config, '/react-typescript-otp-input/'),
      await config.transform(config, '/react-typescript-pagination/'),
      await config.transform(config, '/react-typescript-bar-graph/'),
    ];
  },
};
