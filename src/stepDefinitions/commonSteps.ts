import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { Utility } from "../../cypress/pageObject/utilityFunctions";

const utils = new Utility();

When('Get the {string} page top headers and verify', (pageName:string)=>{
    utils.getTopHeadersCommon(pageName)
})

When('Grab the {string} page on top headers page', (pageName:string)=>{
    utils.grabTopHeadersCommon(pageName)
})

When('Grab the {string} page on top sub headers page', (pageName:string)=>{
    utils.grabSubTopHeadersCommon(pageName)
})

When('Verify the success and {string} message is visible', (text:string)=>{
    utils.verifySuccessMessage(text);
})


