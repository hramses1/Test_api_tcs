import 'cypress-mochawesome-reporter/register';

// POST reutilizable: la API devuelve 200 incluso en errores
Cypress.Commands.add('apiPost', (path, body) =>
  cy.request({ method: 'POST', url: path, body, failOnStatusCode: false })
);
