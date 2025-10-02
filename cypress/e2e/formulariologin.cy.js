
   describe('Formulario de Login', ()=>{
    beforeEach(() =>{
        cy.visit('/')

    })
    
    it('Deve acessar a página home',() =>{
        cy.fixture('usuarios').then(usuario => {
            cy.login(usuario[0].email,usuario[0].senha);
            cy.visit('/home');
            cy.url().should('include', '/home');
            cy.getByData('titulo-boas-vindas').should('contain','Bem vindo de volta!');
            cy.contains(usuario[0].nome).should('be.visible');
        })
    })
      it('Deve acessar a página home', ()=>{
        cy.fixture('usuarios').then(usuario => {
        cy.login(usuario[0].email,usuario[0].senha)
        cy.visit('/home')
        cy.getByData('titulo-boas-vindas').should('contain', 'Bem vindo de volta!');
       
    })
})

    

    it('Não deve permitir um e-mail inválido',()=>{
        //acessa e preenche o formulário de login
        cy.getByData('botao-login').click();
        cy.getByData('email-input').type('neiton@gmail');
        cy.getByData('senha-input').type(Cypress.env('senha'));
        cy.getByData('botao-enviar').click();
       //cy.getByData('mensagem-erro').should('exist').and('have.text', 'O email digitado é inválido');
       cy.contains('O email digitado é inválido').should('be.visible');
    })


    it('Não deve permitir o campo e-mail vazio',()=>{
        //acessa e preenche o formulário de login
        cy.getByData('botao-login').click();
        cy.getByData('senha-input').type(Cypress.env('senha'));
        cy.getByData('botao-enviar').click();
        //verifica de a mesnsagem de erro foi apresentada
        //cy.getByData('mensagem-erro').should('exist').and('have.text', 'O campo email é obrigatório');
         cy.contains('O campo email é obrigatório').should('be.visible');

            })
        })


