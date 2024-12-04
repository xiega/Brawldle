describe('GuessForm Component', () => {
  beforeEach(() => {
      // Assuming your application is running on localhost:3000
      cy.visit('http://localhost:3000'); // Change to the appropriate URL
      cy.wait(1000); 
      cy.viewport(420, 900); // Dopasowuje widok// Optional: wait 1 second for the page to load
  });

  it('should submit the guess and display a message if the Brawler does not exist', () => {
      // Type "Shelly" into the input
      cy.get('input#react-select-3-input', { timeout: 10000 }) // Use the correct selector
          .type('Sheldon');

      // Submit the form
      cy.get('form#guessForm').submit();

      // Check if the message "There is no such brawler." is displayed
      cy.contains('There is no such brawler.') // Use contains to find the message
          .should('be.visible'); // Check if the message is visible
  });
});