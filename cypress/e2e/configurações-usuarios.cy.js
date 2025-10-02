import{faker} from '@faker-js/faker/locale/pt_BR';

describe('Jornada do usuário', () =>{
    const novoDados ={
        nome: faker.name.fullName(),
        senha: faker.internet.password(),
    };

    it('Deve acessar e alterar os dados do usuario os atualizandos', () =>{
        cy.fixture('usuarios').as('usuarios');
        cy.get('@usuarios').then(usuario =>{
            cy.login(usuario[0].email,usuario[0].senha);
            //por causa da session
            cy.visit('/home');
            cy.url().should('include','/home');
            cy.contains(usuario[0].nome).should('be.visible');

            // encontra o data teste app home/ o objeto a e o array 1
            cy.getByData('app-home').find('a').eq(1).click();
            //confirma se está no lugar certo
            cy.url().should('include','/minha-conta');
            //confirma se o botão de salvar alterações está desabilitado
            cy.getByData('botao-salvar-alteracoes').should('be.disabled');
            //digita os novos dados
            cy.get('[name="nome"]').type(novoDados.nome);
            cy.get('[name="senha"]').type(novoDados.senha);
            //confirma se o botão de salvar alterações habilitado
            cy.getByData('botao-salvar-alteracoes').should('not.be.disabled');
            cy.getByData('botao-salvar-alteracoes').click();
           
            //confirma de o Alert aparece com a msg correta
            cy.on('window:alert', (textoDoAlert) =>{
                expect(textoDoAlert).to.eq('Alterações salvas com sucesso!');

            })
            cy.url().should('include','/home');

            cy.window().then((win) =>{
            expect(win.localStorage.getItem('nomeUsuario')).to.eq(novoDados.nome);
            let userId = win.localStorage.getItem('userId');
            
            cy.request('GET', `http://localhost:8000/users/${userId}`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.nome).to.be.equal(novoDados.nome);
            expect(response.body.senha).to.be.equal(novoDados.senha);
                    });
                })
            });
        });   
    });   
  
    
        

