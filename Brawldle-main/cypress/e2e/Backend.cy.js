describe('Brawldle API Tests', () => {
  const apiUrl = 'http://localhost:4000/api';

  before(() => {
  });

  it('should get a list of all brawlers', () => {
    cy.request(`${apiUrl}/brawlers-list`)
      .its('status')
      .should('eq', 200);
  });

  it('should get names of all brawlers', () => {
    cy.request(`${apiUrl}/brawlers`)
      .its('status')
      .should('eq', 200);
  });

  it('should start the game and return a message', () => {
    cy.request(`${apiUrl}/start`)
      .its('body')
      .should('have.property', 'message', 'Gra rozpoczęta! Spróbuj odgadnąć Brawlera.');
  });

  it('should handle help requests', () => {
    const helpRequest = {
      name: 'Test User',
      email: 'test@example.com',
      issue: 'Test issue',
      description: 'This is a test description.',
    };

    cy.request({
      method: 'POST',
      url: `${apiUrl}/help`,
      body: helpRequest,
    }).its('status')
      .should('eq', 200);
  });
});