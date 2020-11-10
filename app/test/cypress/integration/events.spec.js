describe("Events", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it(".should() - have all events features", () => {
    cy.title().should("include", "Micado app");
    cy.dataCy('menu_home')
      .should('contain', 'Home')
    // We present the feature
    cy.toast('The user wants to see the next events', {
      duration: 4000,
      blocking: true,
    })

    cy.dataCy('menu_events')
      .arrow({
        duration: 3000,
        blocking: true,
        pointAt: 'bottomRight', // or "bottomRight"
        offsetX: 0, // move the tip by X pixels
        offsetY: 0, // move the tip by Y pixels
        strokeWidth: 5, // SVG line width, pixels
        color: 'orange', // color name or hex string like "#ff00ff"
      })
    cy.dataCy('menu_events')
      .click()
    cy.toast('Chooses the "English course" event', {
      duration: 4000,
      blocking: true,
    })
    cy.dataCy('item25')
      .should('contain', 'English course')
    cy.dataCy('item25')
      .click()

    cy.wait(2000)

    cy.toast('We can see the event details', {
      duration: 4000,
      blocking: true,
    })
  });

});