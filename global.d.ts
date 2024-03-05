/// <reference types = "cypress" />

declare namespace  Cypress {
    interface Chainable{
        checkXPathVisible(xpath:string):Chainable<any>;
        ifXPathExist(xpath:string):Chainable<any>;
        shouldBeActive():Chainable<any>;
    }
}