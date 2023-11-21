Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Rousyane')
    cy.get('#lastName').type('Melo')
    cy.get('#email').type('rousy.mm1990@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})