describe('Rate movie functionality', () => {
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
  });

  describe('Viewing ratings', () => {
    beforeEach(() => {
      cy.intercept(
        'https://rancid-tomatillos.herokuapp.com/api/v2/movies/49046',
        {
          statusCode: 200,
          fixture: '/all-quiet.json',
        }
      );
      cy.intercept(
        'https://rancid-tomatillos.herokuapp.com/api/v2/users/2/ratings',
        {
          statusCode: 200,
          fixture: '/user-ratings.json',
        }
      );
    });

    it("should see a movie's rating when clicked", () => {
      cy.get('.moviePosters .card:first')
        .click()
        .get(
          '.style-module_starRatingWrap__q-lJC .style-module_fillIcons__6---A:last'
        )
        .invoke('attr', 'title')
        .should('eq', '2 out of 5');
    });

    it("should be able to change a movie's rating", () => {
      cy.get('.moviePosters .card:first')
        .click()
        .get('.stars')
        .click()
        .get(
          '.style-module_starRatingWrap__q-lJC .style-module_fillIcons__6---A:last'
        )
        .invoke('attr', 'title')
        .should('eq', '2.5 out of 5');
    });
  });
});
