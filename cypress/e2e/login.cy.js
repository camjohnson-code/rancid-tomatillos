describe('It should test the application', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://rancid-tomatillos.herokuapp.com/api/v2/movies',
      {
        statusCode: 200,
        fixture: '/sample-data.json',
      }
    ).as('getMovies');

    cy.visit('/');
  });

  describe('Login Page Initial Load', () => {
    it('should be able to see the login page', () => {
      cy.get('h1').should('contain', 'Rancid Tomatillos');
      cy.get('button').should('contain', 'Submit');
    });

    it('should be able to log in a user', () => {
      cy.intercept(
        'POST',
        'https://rancid-tomatillos.herokuapp.com/api/v2/login',
        {
          statusCode: 201,
          fixture: '/user-login.json',
        }
      ).as('loginSuccess');

      cy.get('input[name="email"]')
        .type('sam@turing.io')
        .get('input[name="password"]')
        .type('123456')
        .get('button')
        .click();
      cy.wait('@loginSuccess');
      cy.url().should('eq', 'http://localhost:3000/movies');
    });

    it('should show a message if username or password are incorrect', () => {
      cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/login', {
        statusCode: 403,
        fixture: '/failed-login.json',
      }).as('loginFailed');

      cy.get('input[name="email"]')
        .type('sam@turing.io')
        .get('input[name="password"]')
        .type('12345678910')
        .get('button')
        .click();
      cy.wait('@loginFailed');
      cy.get('.error-message').should(
        'contain',
        'Incorrect email or password. Please try again.'
      );
      cy.url().should('eq', 'http://localhost:3000/');
    });
  });
});
