/// <reference path="cypress" />
/// <reference path="../support/index.d.ts" />

// Use `cy.dataCy` custom command for more robust tests
// See https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements

// ** This file is an example of how to write Cypress tests, you can safely delete it **

// This test will pass when run against a clean Quasar project 
describe("Landing", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it(".should() - assert that <title> is correct", () => {
    cy.title().should("include", "Micado app");
  });
  it(".should() - assert that home is present", () => {
    cy.dataCy('menu_home')
      .should('contain', 'Home')
    cy.wait(4000)
    cy.dataCy('menu_processes')
      .click()
    cy.wait(4000)
    cy.dataCy('process92')
      .should('contain', 'test')
    cy.wait(2000)
    cy.dataCy('process92')
      .click()
    cy.wait(4000)
    cy.get('#fd02ce7f-6d27-49d5-b614-450250be241a').click();
    cy.wait(4000)




  });




});

// ** The following code is an example to show you how to write some tests for your home page **
//
// describe('Home page tests', () => {
//   beforeEach(() => {
//     cy.visit('/');
//   });
//   it('has pretty background', () => {
//     cy.dataCy('landing-wrapper')
//       .should('have.css', 'background').and('match', /(".+(\/img\/background).+\.png)/);
//   });
//   it('has pretty logo', () => {
//     cy.dataCy('landing-wrapper img')
//       .should('have.class', 'logo-main')
//       .and('have.attr', 'src')
//       .and('match', /^(data:image\/svg\+xml).+/);
//   });
//   it('has very important information', () => {
//     cy.dataCy('instruction-wrapper')
//       .should('contain', 'SETUP INSTRUCTIONS')
//       .and('contain', 'Configure Authentication')
//       .and('contain', 'Database Configuration and CRUD operations')
//       .and('contain', 'Continuous Integration & Continuous Deployment CI/CD');
//   });
// });
