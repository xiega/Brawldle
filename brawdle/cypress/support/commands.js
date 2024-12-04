// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('submitHelpForm', (name, email, issue, description) => {
    cy.get('input[name="name"]').type(name); // Wprowadzenie imienia
    cy.get('input[name="email"]').type(email); // Wprowadzenie emaila
    cy.get('input[name="issue"]').type(issue); // Wprowadzenie problemu
    cy.get('textarea[name="description"]').type(description); // Wprowadzenie opisu
    cy.get('input[name="consent"]').check(); // Zaznaczenie zgody na przetwarzanie danych
    cy.get('button[type="submit"]').click(); // Kliknięcie przycisku Submit
  });

  Cypress.Commands.add('verifyHireMeLink', (index, expectedHref) => {
    cy.get('.hire') // Znajduje elementy z klasą "hire"
      .eq(index) // Wybiera przycisk na podstawie indeksu
      .should('have.attr', 'href', expectedHref); // Sprawdza, czy link ma odpowiedni adres
  }); 