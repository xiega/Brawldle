describe('GitHubCommits Component', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/repos/xiega/Brawldle/commits*', {
      statusCode: 200,
      body: [
        {
          sha: '1a2b3c',
          commit: {
            message: 'Project1 v1.0.0 Fixed bug in authentication flow.',
            author: {
              name: 'John Doe',
              date: '2024-12-01T10:00:00Z',
            },
          },
          author: {
            avatar_url: 'https://via.placeholder.com/50',
            html_url: 'https://github.com/JohnDoe',
          },
        },
        {
          sha: '4d5e6f',
          commit: {
            message: 'Project2 v2.1.1 Improved UI/UX.',
            author: {
              name: 'Jane Smith',
              date: '2024-12-02T12:00:00Z',
            },
          },
          author: {
            avatar_url: 'https://via.placeholder.com/50',
            html_url: 'https://github.com/JaneSmith',
          },
        },
      ],
    });

    cy.visit('http://localhost:3000/code');
    cy.viewport(420, 900);
  });

  it('Should load and display the list of commits', () => {
    cy.get('.h1-commits').should('contain.text', 'Commit List');

    cy.get('.commit-item').should('have.length', 2);

    cy.get('.commit-item').eq(0).within(() => {
      cy.get('.commit-avatar').should('have.attr', 'src', 'https://via.placeholder.com/50');
      cy.get('.commit-author').should('contain.text', 'John Doe');
      cy.get('.commit-version').should('contain.text', 'Project1 v1.0.0');
    });

    // Verify the second commit's details
    cy.get('.commit-item').eq(1).within(() => {
      cy.get('.commit-avatar').should('have.attr', 'src', 'https://via.placeholder.com/50');
      cy.get('.commit-author').should('contain.text', 'Jane Smith');
      cy.get('.commit-version').should('contain.text', 'Project2 v2.1.1');
    });
  });

  it('Should expand and display commit details on click', () => {

    cy.get('.commit-item').eq(0).click();
    cy.get('.commit-item').eq(0).should('have.class', 'expanded');

    cy.get('.commit-item').eq(0).within(() => {
      cy.get('.commit-description').should('be.visible');
      cy.get('.commit-description').should('contain.text', 'Date: 2024-12-01T10:00:00Z');
      cy.get('.commit-description a').should('have.attr', 'href', 'https://github.com/JohnDoe');
    });
  });
});
