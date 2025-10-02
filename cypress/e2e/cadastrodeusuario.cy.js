import{faker} from '@faker-js/faker/locale/pt_BR';


describe('Teste de Cadastro de Usuário', () =>{
    const usuario ={
        nome: faker.name.fullName(),
        email: faker.internet.email(),
        senha: faker.internet.password(),
    }
    it(`deve permitir o cadastro do usuário ${usuario.nome} com sucesso`,() =>{
        cy.viewport(700, 750);
        cy.visit('/');
        cy.getByData('botao-cadastro').click();
        cy.getByData('nome-input').type(usuario.nome);
        cy.getByData('email-input').type(usuario.email);
        cy.getByData('senha-input').type(usuario.senha);
        cy.getByData('checkbox-input').check();
        cy.get('[data-test="botao-enviar"]').click();
        //as três formas estão corretas mas prefirto a ultima por ser mais curta
        cy.getByData('mensagem-sucesso').should('exist').contains('Usuário cadastrado com sucesso!');
        cy.getByData('mensagem-sucesso').should('exist').and('have.text', 'Usuário cadastrado com sucesso!');
        cy.contains('Usuário cadastrado com sucesso!').should('be.visible');
        
           cy.request('GET', 'http://localhost:8000/users').then((response) => {
      expect(response.body).to.have.lengthOf.at.least(1);
      expect(response.body[response.body.length - 1]).to.deep.include(usuario);
            
            });
           
        });
    });