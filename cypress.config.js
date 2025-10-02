const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000'
  },

  env: {
    mobileViewportWidthBreakPoint:420,
  },
  viewportWidth:1100,
  viewportHeight:990
});


