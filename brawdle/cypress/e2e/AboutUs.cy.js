describe('Strona "About Us" - Testy nawigacji przycisków "Hire Me"', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/about');
    cy.viewport(420, 900);
  });

  it('Powinno zweryfikować link do GitHub Xiega', () => {
    cy.verifyHireMeLink(0, 'https://github.com/xiega');
  });

  it('Powinno zweryfikować link do GitHub DajWaj', () => {
    cy.verifyHireMeLink(1, 'https://github.com/DajWaj');
  });

  it('Powinno zweryfikować link do GitHub Dzilnoreq', () => {
    cy.verifyHireMeLink(2, 'https://github.com/Dzilne');
  });
});
