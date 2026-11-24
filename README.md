# 🔍 Demoblaze API Testing con Cypress

Pruebas automatizadas con Cypress sobre los endpoints de autenticación de la API de [Demoblaze](https://api.demoblaze.com) (`/signup` y `/login`).

## 📦 ¿Qué se prueba?

- Registro exitoso de un nuevo usuario
- Intento de registro con usuario ya existente
- Login con credenciales correctas
- Login negativo data-driven (contraseña incorrecta, usuario inexistente) con datos desde **JSON** y **CSV**

## 🛠️ Tecnologías

- [Cypress](https://www.cypress.io/) v14+
- [@faker-js/faker](https://github.com/faker-js/faker): datos aleatorios para evitar usuarios duplicados
- [cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter): informe HTML

## 📁 Estructura

```bash
cypress/
├── e2e/api_auth.cy.js              # Tests de la API de login/signup
├── fixtures/
│   ├── login_negativo.json         # Casos negativos (JSON)
│   └── login_negativo.csv          # Casos negativos (CSV)
├── support/e2e.js                  # Comando cy.apiPost y registro del reporter
└── reports/                        # Informe HTML generado (ignorado en git)
cypress.config.js                   # baseUrl, variables (env) y reporter
conclusion.txt                      # Conclusiones de la prueba
```

## 🧪 Cómo ejecutar

```bash
npm install
npm test                # headless, genera el informe
npx cypress open        # modo interactivo
```

El informe queda en `cypress/reports/index.html`.

## 🧠 Detalles técnicos

- **Variables:** endpoints y mensajes de error viven en `cypress.config.js` → `env` y se leen con `Cypress.env()`.
- **Comando reutilizable:** `cy.apiPost(path, body)` en `cypress/support/e2e.js`.
- **Data-driven:** en los archivos de datos, `REAL` como `username` se reemplaza por el usuario creado en la corrida. El JSON genera un test por caso; el CSV se lee con `cy.readFile` y se parsea a mano (sin dependencias extra).
- El signup exitoso devuelve el string vacío `""` y el login correcto `Auth_token: <valor>` (texto plano, no JSON).

## 📌 Consideraciones

- La API responde con código `200` incluso en errores, por eso se valida `errorMessage` en el body.
