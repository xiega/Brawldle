describe('About Us Page Tests', () => {
  it('should redirect to correct GitHub profiles', () => {
    cy.visit('http://localhost:3000/about');
    cy.viewport(420,900);

    // const buttons = [
    //   { name: 'Xiega', url: 'https://github.com/xiega' },
    //   { name: 'DajWaj', url: 'https://github.com/DajWaj' },
    //   { name: 'Dzilnoreq', url: 'https://github.com/Dzilne' },
    // ];

      cy.contains("Xiega")
        .parent()
        .within(() => {
          cy.get('a.hire')
            .invoke('removeAttr', 'target') // Usuń target
            .click(); // Kliknij w link
        });

      // Wejdź w kontekst domeny GitHub
      cy.origin('https://github.com', () => {
        cy.location('href').should('include', '/xiega'); // Sprawdź fragment adresu URL
      });

      cy.visit('http://localhost:3000/about');

      cy.contains("DajWaj")
        .parent()
        .within(() => {
          cy.get('a.hire')
            .invoke('removeAttr', 'target') // Usuń target
            .click(); // Kliknij w link
        });

      cy.origin('https://github.com', () => {
        cy.location('href').should('include', '/DajWaj'); // Sprawdź fragment adresu URL
      });

      cy.visit('http://localhost:3000/about');

      cy.contains("Dzilnoreq")
        .parent()
        .within(() => {
          cy.get('a.hire')
            .invoke('removeAttr', 'target') // Usuń target
            .click(); // Kliknij w link
        });

      cy.origin('https://github.com', () => {
        cy.location('href').should('include', '/Dzilne'); // Sprawdź fragment adresu URL
      });

      // Wróć na stronę główną
      cy.visit('http://localhost:3000/about');
  });
});
