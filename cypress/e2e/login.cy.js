describe('It should test the application', () => {
  beforeEach(() => {
    cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      statusCode: 200,
      fixture: '/sample-data.json',
    });
    cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/login', {
      statusCode: 201,
      fixture: '/user-login.json',
    });
    cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/login', {
      statusCode: 403,
      fixture: '/failed-login.json',
    });
    cy.visit('/');
  });

  describe('Login Page Initial Load', () => {
    it('should be able to see the login page', () => {
      cy.get('h1').should('contain', 'Rancid Tomatillos');
      cy.get('button').should('contain', 'Submit');
    });

    it('should be able to log in a user', () => {
      cy.get('input[name="email"]')
        .type('sam@turing.io')
        .get('input[name="password"]')
        .type('123456')
        .get('button')
        .click()
        .url()
        .should('eq', 'http://localhost:3000/movies');
    });

    it('should show a message if username or password are incorrect', () => {
      cy.get('input[name="email"]')
        .type('sam@turing.io')
        .get('input[name="password"]')
        .type('12345678910')
        .get('button')
        .click()
        .get('.error-message')
        .should('contain', 'Incorrect email or password. Please try again.');
    });
  });
});
