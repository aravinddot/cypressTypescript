import { CommonFunctions } from "./commonDynamicFunctions"

export class login {

  visitLoginPage() {
    cy.visit(Cypress.env('pageUrl')['Login'])
  }

  userName(credentials:string) {
    cy.xpath(CommonFunctions.getXPathValue('loginPageXpaths')['userName']).should('be.visible').type(Cypress.env(credentials).userName)
  }

  passWord(credentials:string) {
    cy.xpath(CommonFunctions.getXPathValue('loginPageXpaths')['passWord']).should('be.visible').type(Cypress.env(credentials).passWord)
  }

  submitBtn() {
    cy.xpath(CommonFunctions.getXPathValue('loginPageXpaths')['submitButton']).should('be.visible').click({ force: true })
  }

  invalidCredentials(errormessage:string) {
    cy.xpath(CommonFunctions.getXPathValue('loginPageXpaths')['invalidCredentials']).should('be.visible').and('have.text', errormessage)
  }

loginWithSession(credentials) {
  cy.session(credentials, () => {
    this.visitLoginPage();
    this.userName(credentials);
    this.passWord(credentials);
    this.submitBtn();
  })
}

}