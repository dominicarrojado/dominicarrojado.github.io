module.exports = {
  siteUrl: 'https://dominicarrojado.com',
  generateRobotsTxt: true,
  additionalPaths: async (config) => [
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

    // kronenbourg website
    await config.transform(config, '/kronenbourg-website/'),

    // maybank website
    await config.transform(config, '/maybank-fc-barcelona-website/'),

    // qwerk website
    await config.transform(config, '/qwerk-website/'),

    // razer apps
    await config.transform(config, '/mouse-accuracy-game/'),

    // blog examples
    await config.transform(config, '/mjml-sample-edm/'),
    await config.transform(config, '/react-typescript-accordion/'),
    await config.transform(config, '/react-typescript-api-hooks/'),
    await config.transform(config, '/react-typescript-swiper/'),
  ],
};
