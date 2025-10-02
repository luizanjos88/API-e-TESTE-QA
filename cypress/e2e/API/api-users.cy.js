describe('Realizando aquisições para API', ()=>{
//context semelhante ao describe
context ('GET /users', () => {
  
it('Deve retornar uma lista de usuários', () => {
//request: faz uma busca de DADOS (GET), no servidor da url, response resultado completo da requisição feita com cy.request.
cy.request('GET', 'http://localhost:8000/users').then((response)=>{ 
// expect testar se o que veio da API está certo; 200 código de sucesso
expect(response.status).to.eq(200);
expect(response.body).length.to.greaterThan(1);
            });
        });
    });
});

 context('GET /users/:userId', () =>{
        it('Deve retornar um único usuário', () =>{
            cy.request({
            method:'GET',
            url: 'http://localhost:8000/users/40a41438-84a6-4b4d-ae1d-7f1713d0a9fe'
                    }).then((response)=>{
              expect(response.status).to.eq(200);
              expect(response.body).to.have.property('nome');
        });
     });
     it('Deve retornar um erro quando o usuário for inválido', ()=>{
        cy.request({
            method: 'GET',
            url: 'http://localhost:8000/users/40a41438-84a6-4b4d-ae1d',

        // necessário colocar para o cypress não travar com o código 400/404 ele trava e traz erro

            failOnStatusCode: false
     
        }).then((response) =>  {
        expect(response.status).to.eq(404);
        expect(response.body).to.eq('Not Found');
        });
     });
     context('Interceptando solicitações de rede', () =>{
        it('Deve fazer a interceptação do POST users/login', () =>{
         cy.intercept('POST','/users/login').as('loginRequest');
         cy.login('neilton@alura.com','eoxdduWySi2u4b9');
         cy.wait('@loginRequest').then((interception) =>{
            interception.response = {
                statusCode: 200,
                body: {
                    success: true,
                    message: 'Login bem sucedido!'
                }
            }
         })
         cy.visit('/home');
         cy.getByData('titulo-boas-vindas').should('contain.text', 'Bem vindo de volta!');  
        })

        it('Retorna erro 400 para usuário inexistente',() =>{
        let usuarioii ={
            nome: 'Usuario Inválido',
            senha: 'Lv1z@2025',
           
        };

        cy.request({
            method: 'PUT',
            url: 'http://localhost:8000/users/spiderman',
            body: usuarioii,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(404);     
            expect(response.body).to.eq('Not Found');
         
            });
        });

     });
     
     context('realizando Login via API', () => {
  it.only('Deve permitir login do usuário Neilton', () => {
    cy.request({
      method: 'POST', // precisa ser string
      url: 'http://localhost:8000/users/login',
      body:Cypress.env(),
     // body: {
        //email: Cypress.env('email'),  // pega do cypress.env.json ou configurado no comando
        //senha: Cypress.env('senha')
      }
    ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.not.be.empty;
      expect(response.body.user).to.have.property('nome');
      expect(response.body.user.nome).to.eq('Laura Pereira');
        });
    });
    });
});
    


    