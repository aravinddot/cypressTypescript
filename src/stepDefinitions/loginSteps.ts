import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { login } from "../../cypress/pageObject/login";
import { CommonFunctions } from "../../cypress/pageObject/commonDynamicFunctions";

const Login = new login();

beforeEach(()=>{
	Login.loginWithSession('validUser')
	cy.visit('/')
})

before(()=>{
	CommonFunctions.loadXPathValues();
})

Given('Visit login page', ()=>{
	Login.visitLoginPage();
})

Given('Enter the {string} username in username field', (credentials:string)=>{
	Login.userName(credentials);
})

When('Enter the {string} password in password field', (credentials:string)=>{
	Login.passWord(credentials);
})

Then('Click on submit button', ()=>{
	Login.submitBtn();
})

Then('Verify the {string} is visible for invalid login',(errormessage:string)=>{
	Login.invalidCredentials(errormessage)
})