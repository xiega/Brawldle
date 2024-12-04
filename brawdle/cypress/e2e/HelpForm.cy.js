describe('Formularz Pomocy - Test przesyłania formularza', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/help'); // Otwiera stronę z formularzem pomocy
    cy.viewport(420, 900); // Dopasowuje widok
  });

  it('Powinno wyświetlić komunikat potwierdzający po przesłaniu formularza', () => {
    // Wypełnianie formularza
    cy.get('input[name="name"]').type('Jan Kowalski'); // Wprowadzenie imienia
    cy.get('input[name="email"]').type('jan.kowalski@example.com'); // Wprowadzenie emaila
    cy.get('input[name="issue"]').type('Problem z logowaniem'); // Wprowadzenie problemu
    cy.get('textarea[name="description"]').type('Nie mogę się zalogować na swoje konto od kilku dni.'); // Wprowadzenie opisu
    cy.get('input[name="consent"]').check(); // Zaznaczenie zgody na przetwarzanie danych

    // Kliknięcie przycisku Submit
    cy.get('button[type="submit"]').click();

    // Oczekiwanie na komunikat potwierdzający i sprawdzenie jego treści
    cy.get('#swal2-html-container').should('exist'); // Sprawdza, czy element komunikatu istnieje
    cy.get('#swal2-html-container').should('contain.text', 'Thank you for helping us 🧡'); // Sprawdza, czy treść komunikatu zawiera odpowiednią wiadomość
  });
});
