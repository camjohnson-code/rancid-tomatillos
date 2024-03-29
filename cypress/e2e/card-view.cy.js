describe('It should test the application', () => {
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
    cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/users/2/ratings', {
      statusCode: 200,
      fixture: '/user-ratings.json',
    });
    cy.visit('/');
    cy.get('input:first-of-type').click().type('sam@turing.io')
      cy.get('input:last-of-type').click().type('123456')
      cy.get('button').click()
  });

  describe('Home Page Initial Load', () => {
    it('should have a header with the users name and a sign out button', () => {
      cy.get('header')
      .get('li:first-of-type').should('contain', 'Hi, Sam!')
      .get('li:last-of-type').should('contain', 'Sign Out')
    });

    it('should be able to see the title on the home page', () => {
      cy.get('.title').should('contain', 'Rancid Tomatillos');
    });

    it('should have a search bar', () => {
      cy.get("input[placeholder=\"Search for a movie...\"]")
    });

    it('should have a Popular and Recommended movies section', () => {
      cy.get('.Popular-movies').should('contain', 'Popular Movies');
      cy.get('.Recommended-movies').should('contain', 'Recommended Movies');
    });

    it('should have the All Movies section listed alphabetically', () => {
      cy.get('.moviePosters .card:first').should(
        'contain',
        'All Quiet on the Western Front'
      );
      cy.get('.moviePosters .card:last').should('contain', 'X');
    });
  });

  describe('Clicking on first movie in All Movies for more information', () => {
    beforeEach(() => {
      cy.intercept(
        'https://rancid-tomatillos.herokuapp.com/api/v2/movies/49046',
        {
          statusCode: 200,
          fixture: '/all-quiet.json',
        }
      );
      cy.get('.moviePosters .card:first').click();
    });

    it('should show movie info for All Quiet', () => {
      cy.get('h2')
        .contains('All Quiet on the Western Front')
        .get('.overview')
        .contains(
          'Paul Baumer and his friends Albert and Muller, egged on by romantic dreams of heroism, voluntarily enlist in the German army. Full of excitement and patriotic fervour, the boys enthusiastically march into a war they believe in. But once on the Western Front, they discover the soul-destroying horror of World War I.'
        )
        .get('.release-date')
        .contains('October 6, 2022')
        .get('.rating')
        .get('.genres')
        .contains('War, Drama, Action')
        .get('.runtime')
        .contains('2 hours 27 minutes');
    });

    it('should have an X button that can be clicked', () => {
      cy.get('.x-button').click();
    });

    it('should return to the home page when the X button is clicked', () => {
      cy.get('.x-button')
        .click()
        .url().should('eq', 'http://localhost:3000/movies');
    });
  });
  describe('Clicking on last movie in All Movies for more information', () => {
    beforeEach(() => {
      cy.intercept(
        'https://rancid-tomatillos.herokuapp.com/api/v2/movies/760104',
        {
          statusCode: 200,
          fixture: '/x.json',
        }
      );
      cy.get('.moviePosters .card:last').click();
    });

    it('should show movie info for X', () => {
      cy.get('h2')
        .contains('X')
        .get('.tagline')
        .contains('Dying to show you a good time.')
        .get('.overview')
        .contains(
          'In 1979, a group of young filmmakers set out to make an adult film in rural Texas, but when their reclusive, elderly hosts catch them in the act, the cast find themselves fighting for their lives. Hilarity ensues.'
        )
        .get('.release-date')
        .contains('March 16, 2022')
        .get('.rating')
        .get('.genres')
        .contains('Horror, Mystery, Thriller')
        .get('.runtime')
        .contains('1 hours 46 minutes');
    });

    it('should have an X button that can be clicked', () => {
      cy.get('.x-button').click();
    });

    it('should return to the home page when the X button is clicked', () => {
      cy.get('.x-button')
        .click()
        .url().should('eq', 'http://localhost:3000/movies');
    });
  });
});
