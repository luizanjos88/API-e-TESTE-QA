context('Teste método PUT de API Usuários', () =>{
    it('Atualiza informações do usuário com sucesso',() =>{
        let usuario ={
            nome: 'Luiz Carlos Giachello dos Anjos',
            senha: 'Lv1z@2025',
           
        };

        cy.request({
            method: 'PUT',
            url: 'http://localhost:8000/users/c691fd15-dcd5-4f24-89da-cdfa3cef9d67',
            body: usuario,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.nome).to.eq(usuario.nome);
            expect(response.body.senha).to.eq(usuario.senha);
        })
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
         
        })
    })
})