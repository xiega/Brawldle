describe('Formularz Pomocy - Test przesyłania formularza', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/help');
    cy.viewport(420, 900);
  });

  it('Powinno wyświetlić komunikat potwierdzający po przesłaniu formularza', () => {
    cy.submitHelpForm(
      'Jan Kowalski',
      'jan.kowalski@example.com',
      'Problem z logowaniem',
      'Nie mogę się zalogować na swoje konto od kilku dni.'
    );


    cy.get('#swal2-html-container').should('exist');
    cy.get('#swal2-html-container').should('contain.text', 'Thank you for helping us 🧡');
  });
});
