describe('Strona "About Us" - Testy nawigacji przycisków "Hire Me"', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/about'); // Otwiera stronę "O nas"
    cy.viewport(420, 900); // Dopasowuje widok
  });

  it('Powinno zweryfikować link do GitHub Xiega', () => {
    cy.get('.hire') // Znajduje elementy z klasą "hire"
      .eq(0) // Pierwszy przycisk (Xiega)
      .should('have.attr', 'href', 'https://github.com/xiega'); // Sprawdza, czy link ma odpowiedni adres
  });

  it('Powinno zweryfikować link do GitHub DajWaj', () => {
    cy.get('.hire')
      .eq(1) // Drugi przycisk (DajWaj)
      .should('have.attr', 'href', 'https://github.com/DajWaj'); // Sprawdza, czy link ma odpowiedni adres
  });

  it('Powinno zweryfikować link do GitHub Dzilnoreq', () => {
    cy.get('.hire')
      .eq(2) // Trzeci przycisk (Dzilnoreq)
      .should('have.attr', 'href', 'https://github.com/Dzilne'); // Sprawdza, czy link ma odpowiedni adres
  });
});
