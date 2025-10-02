import{isMobile} from '../support/utils'

describe('Testando múltiplas páginas', () => { 
  it('Deve conseguir acessar a página de cartões', {browser: 'Chrome'}, ()=>{
    cy.fixture('usuarios').then((usuario) =>{
      cy.login(usuario[0].email,usuario[0].senha);
      cy.visit('/home')

    })

    cy.url().should('contain','/home');
    cy.location('pathname').should('eq','/home');
    if(isMobile()){
      cy.getByData('menu-burguer').should('be.visible');
      cy.getByData('menu-burguer').click();
      cy.getByData('menu-lateral').find('a').eq(2).click();
    }else{
       cy.getByData('app-home').find('a').eq(2).click()
    }
      cy.getByData('titulo-cartoes').should('exist').and('have.text', 'Meus cartões')
    cy.location('pathname').should('eq', '/home/cartoes')
  })
 })