describe('Jornadas de usuário aula 04 desafio', () => {
  
  let transacao ={
    tipoTransacao: 'Depósito',
    valor: '150'
  };

  
  it('Deve permitir que a pessoa usuária acesse a aplicação, realize uma transação e faça um logout', () => {
    
    cy.fixture('usuarios').as('usuarios');
    cy.get('@usuarios').then(usuario =>{
    cy.login(usuario[1].email,usuario[1].senha);
    cy.visit('/home');
    cy.location('pathname').should('eq', '/home');
    cy.contains(usuario[1].nome).should('be.visible');

    cy.getByData('select-opcoes').select(transacao.tipoTransacao);
    cy.getByData('select-opcoes').should('have.value',transacao.tipoTransacao);
    
    cy.getByData('form-input').type(transacao.valor);
    cy.getByData('realiza-transacao').click();

    cy.getByData('lista-transacoes').find('li').last().contains(transacao.valor);

    cy.window().then((win) =>{
      let userId = win.localStorage.getItem('userId');
      cy.request('GET', `http://localhost:8000/users/${userId}/transations`).
      then((response) =>{

       cy.expect(response.status).to.eq(200);
       cy.expect(response.body).is.not.empty;
       cy.expect(response.body).to.have.lengthOf.at.least(1);
       cy.expect(response.body[response.body.length - 1]).to.deep.include(transacao);

            })
          });
    });

      cy.getByData('botao-sair').click();
      cy.url().should('include','/');
      cy.contains('Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!').should('be.visible');
  });

})