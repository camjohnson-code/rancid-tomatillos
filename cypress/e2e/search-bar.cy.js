describe('SearchBar functionality', () => {
  beforeEach(() => {
    cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      statusCode: 200,
      fixture: '/sample-data.json',
    });
    cy.intercept(
      'POST',
      'https://rancid-tomatillos.herokuapp.com/api/v2/login',
      {
        statusCode: 201,
        fixture: '/user-login.json',
      }
    ).as('loginSuccess');
    cy.visit('/');
    cy.get('input:first-of-type').click().type('sam@turing.io');
    cy.get('input:last-of-type').click().type('123456');
    cy.get('button').click();
    cy.intercept('GET', 'https://api.example.com/movies',
    { fixture: '/sample-data.json' }).as('getMovies');
  });

   it('should display search results when searching for a movie', () => {
    cy.get('.search-input').type('The Lair'); 
    cy.get('@getMovies'); 
    cy.get('.movie-cards-container').children().should('have.length', 1); 
  });
 
  it('should redirect to movie details page when clicking on a movie', () => {
    cy.get('.search-input').type('The Lair'); 
    cy.get('@getMovies'); 
    cy.get('.movie-cards-container a').first().click(); 
    cy.url().should('include', '/movie/760204'); 
  });
});
