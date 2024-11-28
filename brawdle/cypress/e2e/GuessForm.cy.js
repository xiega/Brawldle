describe('GuessForm component tests', () => {
  it('fills out the form, submits it, and verifies the success message', () => {
    // Odwiedzenie strony, na której znajduje się formularz
    cy.visit('http://localhost:3000/help'); // Upewnij się, że ścieżka odpowiada lokalizacji Twojego formularza w aplikacji
    cy.viewport(420,900);
    // Wpisywanie danych do pól formularza
    cy.get('input[name="name"]').type('siema');
    cy.get('input[name="email"]').type('siema@gmail.com');
    cy.get('input[name="issue"]').type('siema');
    cy.get('textarea[name="description"]').type('siema');

    // Kliknięcie checkboxa (zakładam, że jest on na formularzu)
    cy.get('input[type="checkbox"]').check();

    // Kliknięcie przycisku submit
    cy.get('button[type="submit"]').click();

    // Sprawdzenie, czy pojawił się komunikat potwierdzający przesłanie formularza
    cy.contains('Thank you for helping us 🧡').should('be.visible');
  });
});
