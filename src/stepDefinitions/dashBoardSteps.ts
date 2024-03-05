import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { dashboard } from "../../cypress/pageObject/dashBoard";

const DashBoard = new dashboard();

Then('DashBoard page is visible properly', () => {
    DashBoard.dashboardPageVisible();
});

Given('Grab the side columns name in dashboard page', () => {
    DashBoard.grabSideColumnsSection();
});

When('Get the grabbed side columns', () => {
    DashBoard.getSideColumns();
});

Given('Click on {string} page', (page: string) => {
    DashBoard.clickOnSideColumnPage(page)
});

Then('Verify the {string} url', (page: string) => {
    DashBoard.verifyPageUrl(page)
});

Given('Get the {string} top header and sub headers and verify', (pageName: string) => {
    DashBoard.getPageTopHeaders(pageName)
})

Given('Click on add user button', ()=>{
    DashBoard.clickAddBtn();
})

When('Verify the {string} heading in the corresponding page', (text:string)=>{
    DashBoard.verifyHeadingText(text);
})

When('Add the user details in admin page', ()=>{
    DashBoard.addUserDetails();
})

Then('Verify the user is created', ()=>{
    DashBoard.verifyUserCreated();
})

Then('Now edit the user and verify the changes should be updated', ()=>{
    DashBoard.verifyEditUserDetails();
})

When('Click on save button', ()=>{
    DashBoard.clickSaveBtn();
})

When('Verify the delete user', ()=>{
    DashBoard.verifyDeleteUserIcon();
})

When('Verify the delete pop up is visible', ()=>{
    DashBoard.deleteUserPopUp();
})

When('Click on delete icon', ()=>{
    DashBoard.performDeleteUser()
})




