const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1200, // 1200
    viewportHeight: 1200, // 1200
    "defaultCommandTimeout": 10000 // Set to 10 seconds (default is 4000ms)
  },
});
