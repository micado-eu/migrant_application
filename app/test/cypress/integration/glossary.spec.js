describe("Glossary", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it(".should() - have all glossary features", () => {
    cy.title().should("include", "Micado app");
    cy.dataCy('menu_home')
      .should('contain', 'Home')
    // We present the feature
    cy.toast('The user wants to see common words', {
      duration: 4000,
      blocking: true,
    })
    cy.wait(4000)

    cy.dataCy('menu_glossary')
      .arrow({
        duration: 3000,
        blocking: true,
        pointAt: 'bottomRight', // or "bottomRight"
        offsetX: 0, // move the tip by X pixels
        offsetY: 0, // move the tip by Y pixels
        strokeWidth: 5, // SVG line width, pixels
        color: 'orange', // color name or hex string like "#ff00ff"
      })
    cy.dataCy('menu_glossary')
      .click()
    cy.toast('Chooses the "Residence permit" common words', {
      duration: 4000,
      blocking: true,
    })
    cy.dataCy('glossaryItem57')
      .should('contain', 'Residence permit')
    cy.dataCy('glossaryItem57')
      .click()
    // cy.toast('Select reference to another word', {
    //   duration: 4000,
    //   blocking: true,
    // })
    // cy.dataCy('glossaryDesc57')
    //   .should('contain', 'Identity Card')
    // const description = `An identity document (also called a piece of identification or ID, or colloquially as papers) is any document that may be used to prove a person's identity. If issued in a small, standard credit card size form, it is usually called an identity card (IC, ID card, citizen card), or passport card. Some countries issue formal identity documents, as national identification cards which may be compulsory or non-compulsory, while others may require identity verification using regional identification or informal documents. When the identity document incorporates a person's photograph, it may be called photo ID.`
    // cy.get('[data-cy=glossaryDesc57] span[data-mention-id="56"]')
    //   .trigger('mouseover')
    // cy.get('.q-tooltip')
    //   .should('contain', description)
    cy.wait(4000)
  });

});