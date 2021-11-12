/* eslint-disable no-undef */

describe('Note app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2021')
  })

  it('user can log in',function () {
    cy.contains('log in').click()
    cy.get('#username').type('Jose')
    cy.get('#password').type('Josespassword')
    cy.get('#login-button').click()
    cy.contains('_Superuser logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('log in').click()
      cy.get('#username').type('Jose')
      cy.get('#password').type('Josespassword')
      cy.get('#login-button').click()
    })

    it('a new note can be created', function () {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })
  })


})

/* eslint-disable no-undef */