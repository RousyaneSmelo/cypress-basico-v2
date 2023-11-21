// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')


    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Rousyane')
        cy.get('#lastName').type('Melo')
        cy.get('#email').type('rousy.mm1990@gmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longtext = 'Teste, testando, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, testando, teste, teste, teste, teste, teste, teste, teste.'
        cy.get('#firstName').type('Rousyane')
        cy.get('#lastName').type('Melo')
        cy.get('#email').type('rousy.mm1990@gmail.com')
        cy.get('#open-text-area').type(longtext , { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com a formataçao errada', function (){
        cy.get('#firstName').type('Rousyane')
        cy.get('#lastName').type('Melo')
        cy.get('#email').type('rousy.mm1990@gmail,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('campo telefone continua vazio quando preenchido com um valo nao numerico', function(){
        cy.get('#phone')
            .type('abcdegghij')
                .should('have.text' , '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Rousyane')
        cy.get('#lastName').type('Melo')
        cy.get('#email').type('rousy.mm1990@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Exibe Mensagem de Sucesso quando o telefone se torna obrigatóri', function(){
        cy.get('#firstName').type('Rousyane')
        cy.get('#lastName').type('Melo')
        cy.get('#email').type('rousy.mm1990@gmail.com')
        cy.get('#phone').type('83986893641')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button' , 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('Exibe Mensagem de Sucesso quando o telefone se torna obrigatório', function(){
        cy.get('#firstName').type('Rousyane')
        cy.get('#lastName').type('Melo')
        cy.get('#email').type('rousy.mm1990@gmail.com')
        cy.get('#phone').type('83986893641')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button' , 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Rousyane')
            .should('have.value' , 'Rousyane')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Melo')
            .should('have.value', 'Melo')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('rousy.mm1990@gmail.com')
            .should('have.value', 'rousy.mm1990@gmail.com')
            .clear()
            .should('have.value', '' )
        cy.get('#open-text-area')
            .type('Teste')
            .should('have.value', 'Teste')
            .clear()
            .should('have.value', '')


    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formulário com sucesso usando comandos costumizados', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (Youtube) por seu texto', function(){
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
       
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
            .select('mentoria')
            .should('have.value','mentoria')

    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
            .select(1)
            .should('have.value','blog')
    })

    it('Marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"] ')
            .check()
            .should('have.value', 'feedback')


    })

    it('Marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
            .should('have.length' , 3)
            .each(function($radio){
               cy.wrap($radio).check() 
               cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Rousyane')
        cy.get('#lastName').type('Melo')
        cy.get('#email').type('rousy.mm1990@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
             
            })
    })

    it('seleciona um arquivo simulando drag-and-drop',function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
             
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
             
            })



    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr' , 'target', '_blank')

    })

    it('acessa a página de política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
            .invoke('removeAttr' , 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')

    })


    







   


   


  })

  // O bloco describe define a suíte de testes, e o bloco it, define um caso de teste.