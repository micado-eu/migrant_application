describe("Glossary", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it(".should() - have all glossary features", () => {
    cy.title().should("include", "Micado app");
    // We present the feature
    cy.toast('The user wants to change the language', {
      duration: 4000,
      blocking: true,
    })
    cy.dataCy('language_selector_button')
      .arrow({
        duration: 3000,
        blocking: true,
        pointAt: 'bottomLeft', // or "bottomRight"
        offsetX: 0, // move the tip by X pixels
        offsetY: 0, // move the tip by Y pixels
        strokeWidth: 5, // SVG line width, pixels
        color: 'orange', // color name or hex string like "#ff00ff"
      })
    cy.dataCy('language_selector_button').arrow({
      duration: 3000,
      blocking: true,
      pointAt: 'bottomLeft', // or "bottomRight"
      offsetX: 0, // move the tip by X pixels
      offsetY: 0, // move the tip by Y pixels
      strokeWidth: 5, // SVG line width, pixels
      color: 'orange', // color name or hex string like "#ff00ff"
    })
    cy.dataCy('language_selector_button').click()
    cy.toast('The user clicks on the preferred language (in this case deutsch)', {
      duration: 4000,
      blocking: true,
    })
    cy.dataCy('language_button_de').click()
    cy.toast('The content will be shown in the selected language', {
      duration: 4000,
      blocking: true,
    })
    cy.dataCy('menu_documents')
      .arrow({
        duration: 3000,
        blocking: true,
        pointAt: 'bottomRight', // or "bottomRight"
        offsetX: 0, // move the tip by X pixels
        offsetY: 0, // move the tip by Y pixels
        strokeWidth: 5, // SVG line width, pixels
        color: 'orange', // color name or hex string like "#ff00ff"
      })
  });

});