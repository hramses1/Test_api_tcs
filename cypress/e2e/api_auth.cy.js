// cypress/e2e/api_auth.cy.js
import { faker } from '@faker-js/faker';
import casosJson from '../fixtures/login_negativo.json';

const { endpoints, msg } = Cypress.env();

// CSV simple: encabezado en la 1ra fila, sin comas dentro de los valores
const parseCsv = (txt) => {
  const [head, ...rows] = txt.trim().split(/\r?\n/);
  const keys = head.split(',');
  return rows.map((r) => Object.fromEntries(r.split(',').map((v, i) => [keys[i], v])));
};

describe('Demoblaze API Auth Tests', () => {
  const user = {
    username: faker.internet.username().toLowerCase(),
    password: faker.internet.password({ length: 8 }),
  };

  // "REAL" en los datos = usuario creado en esta corrida
  const loginBody = ({ username, password }) => ({
    username: username === 'REAL' ? user.username : username,
    password,
  });

  it('Crear un nuevo usuario', () => {
    cy.apiPost(endpoints.signup, user).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body).to.eq('');
    });
  });

  it('Intentar crear un usuario ya existente', () => {
    cy.apiPost(endpoints.signup, user).its('body.errorMessage').should('eq', msg.userExists);
  });

  it('Login con usuario y contraseña correctos', () => {
    cy.apiPost(endpoints.login, user).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body).to.match(/^Auth_token: .+/);
    });
  });

  // Data-driven: JSON (fixture importado)
  casosJson.forEach((caso) => {
    it(`Login negativo (JSON): ${caso.caso}`, () => {
      cy.apiPost(endpoints.login, loginBody(caso)).its('body.errorMessage').should('eq', caso.expected);
    });
  });

  // Data-driven: CSV (leído desde fixtures)
  it('Login negativo (CSV): todos los casos', () => {
    cy.readFile('cypress/fixtures/login_negativo.csv').then((txt) => {
      parseCsv(txt).forEach((caso) => {
        cy.apiPost(endpoints.login, loginBody(caso)).its('body.errorMessage').should('eq', caso.expected);
      });
    });
  });
});
