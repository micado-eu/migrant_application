describe("Information centre", () => {
    beforeEach(() => {
      cy.visit("/");
    });
    it(".should() - have all information centre features", () => {
      cy.title().should("include", "Micado app");
      cy.dataCy('menu_home')
        .should('contain', 'Home')
      // We present the feature
      cy.toast('The user wants to see the information centre', {
        duration: 4000,
        blocking: true,
      })
  
      cy.dataCy('menu_information')
        .arrow({
          duration: 3000,
          blocking: true,
          pointAt: 'bottomRight', // or "bottomRight"
          offsetX: 0, // move the tip by X pixels
          offsetY: 0, // move the tip by Y pixels
          strokeWidth: 5, // SVG line width, pixels
          color: 'orange', // color name or hex string like "#ff00ff"
        })
      cy.dataCy('menu_information')
        .click()
      cy.toast('Chooses the "Family reunification" information', {
        duration: 4000,
        blocking: true,
      })
      cy.dataCy('item97')
        .should('contain', 'Family reunification')
      cy.dataCy('item97')
        .click()
  
      cy.wait(2000)
  
      cy.toast('We can see the information details', {
        duration: 4000,
        blocking: true,
      })
    });
  
  });