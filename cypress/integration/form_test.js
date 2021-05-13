describe('First Test', function () {
  it('Testing true is true', function () {
    expect(true).to.equal(true);
  });
});

describe('Type a name', function () {
  it('Testing if you can type a name', function () {
    cy.visit('http://localhost:3000/');
    cy.get('input[name="name"]')
      .type('Poggers')
      .should('have.value', 'Poggers');
  });
});

describe('Type an email address', function () {
  it('Testing if you can type an email address', function () {
    cy.get('input[name="email"]')
      .type('poggies@gmail.com')
      .should('have.value', 'poggies@gmail.com');
  });
});

describe('Type a password', function () {
  it('Testing if you can type a password', function () {
    cy.get('input[name="password"]')
      .type('my_password_is_so_long')
      .should('have.value', 'my_password_is_so_long');
  });
});

describe('Check a checkbox', function () {
  it('Testing if you can check the terms and conditions', function () {
    cy.get('[type="checkbox"]').check().should('be.checked');
  });
});

describe('Submit the form', function () {
  it('Test if you can submit the form', function () {
    cy.get('form').submit();
    cy.contains('"name": "Poggers"');
  });
});

describe('Form has validation', function () {
  it('Cannot submit the form if input is empty', function () {
    cy.get('input[name="name"]').type('AAAA').clear();
    cy.contains('You must provide a name.');
  });
});
