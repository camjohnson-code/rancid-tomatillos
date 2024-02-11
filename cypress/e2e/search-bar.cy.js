describe('SearchBar functionality', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://rancid-tomatillos.herokuapp.com/api/v2/movies', 
    {
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
    cy.intercept(
      'GET', 
      'https://rancid-tomatillos.herokuapp.com/api/v2/movies/760204',
    { fixture: '/the-lair.json' }).as('getMovies');

    cy.intercept(
      'GET', 
      'https://rancid-tomatillos.herokuapp.com/api/v2/users/*/ratings', {
      statusCode: 200,
      fixture: 'user-ratings.json',
    }).as('getUserRatings')
  });

   it('should display search results when searching for a movie', () => {
    cy.get('.search-input').type('The Lair'); 
    cy.get('@getMovies');
    cy.get('.movie-cards-container').children().should('have.length', 1)
  });
 
  it('should redirect to movie details page when clicking on a movie', () => {
    cy.get('.search-input').type('The Lair'); 
    cy.get('@getMovies'); 
    cy.get('.movie-cards-container a').first().click(); 
    cy.get('@getUserRatings'); 
  });

  it('should display a message for no search results', () => {
    cy.get('.search-input').type('Avatar'); 
    cy.get('@getMovies');
    cy.contains('No results found').should('be.visible'); 
  });

  it('should display a message for empty search', () => {
    cy.get('.search-input').clear();
    cy.contains('No results found').should('not.exist');
  });
});
