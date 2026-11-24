const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    reportPageTitle: "Demoblaze API Report",
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    baseUrl: "https://api.demoblaze.com",
    // variables reutilizables (Cypress.env)
    env: {
      endpoints: { signup: "/signup", login: "/login" },
      msg: {
        userExists: "This user already exist.",
        wrongPassword: "Wrong password.",
        userNotFound: "User does not exist.",
      },
    },
    setupNodeEvents(on) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
});
