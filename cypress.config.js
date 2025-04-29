const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com/',
    reporter: 'cypress-mochawesome-reporter',
    blockHosts: [
      'pagead2.googlesyndication.com',
      'googlesyndication.com',
      'www.googletagservices.com',
      'www.google.com',
      'securepubads.g.doubleclick.net',
      'www.gstatic.com',
      'cdn.ad.plus',
      'ad.plus',
      'www.google-analytics.com',
      'googleads.g.doubleclick.net',
      'adsbygoogle.js',
    ],
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
