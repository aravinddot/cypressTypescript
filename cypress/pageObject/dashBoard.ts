import { CommonFunctions } from "./commonDynamicFunctions";
import { Utility, commonMap } from "./utilityFunctions";

export class dashboard extends Utility{

    public dataMap = new Map();

    dashboardPageVisible() {
        cy.url().should('include', '/web/index.php/dashboard/index')
    }

    grabSideColumnsSection() {
        cy.checkXPathVisible(CommonFunctions.getXPathValue('dashBoardPage')['sideColumnSection']).invoke('text').then((values) => {
            let splitted = values.split(/(?=[A-Z][a-z]*)/).map(word => word.trim());
            let combinedPIM = splitted.map(item => ['P', 'I', 'M'].includes(item) ? 'PIM' : item);
            const combinedMyInfo = combinedPIM.map((item, index, array) => {
                if (item === 'My' && array[index + 1] === 'Info') {
                    return 'My Info';
                }
                return item;
            }).filter((item, index, array) => item !== 'Info' && array[index - 1] !== 'My');
            const sideColumns = Array.from(new Set(combinedMyInfo));
            this.dataMap.set('sideColumns', sideColumns)
        })
    }

    getSideColumns() {
        const sideColumns: string[] = this.dataMap.get('sideColumns')
        console.log(sideColumns);

    }

    clickOnSideColumnPage(page) {
        cy.checkXPathVisible(CommonFunctions.getXPathValue('dashBoardPage')['sideColumnSection']).contains(page).and('contain', page).click({ force: true })
    }

    verifyPageUrl(page) {
        cy.url().should('include', Cypress.env('pageUrl')[page])
    }

    getPageTopHeaders(pageName) {
        let headerTop: string[];
        let subHeaderTop: string[];
        const pageHeader = commonMap.get('pageHeader')
        const adminPageTopHeader = pageHeader[pageName]['topHeader']
        const adminPageSubHeader = pageHeader[pageName]['subHeader']
        cy.fixture('header_subHeader.json').then((values) => {
            headerTop = values[pageName]['topHeader']
            subHeaderTop = values[pageName]['subHeader']
            adminPageTopHeader.forEach((values, index) => {
                assert.isTrue(values === headerTop[index], "The Header values grabbed from UI: " + headerTop[index] + " and the Header values from file: " + values);
                const subHead = subHeaderTop[headerTop[index]]
                const subHeadGrabbed = adminPageSubHeader[values]
                subHeadGrabbed.forEach((subHeadValGrabbed, index) => {
                    assert.isTrue(subHeadValGrabbed === subHead[index], "The Sub Header values grabbed from UI: " + subHeadValGrabbed + " and the Sub Header values from the file: " + subHead[index]);
                })
            })
        })
    }

    clickAddBtn() {
        cy.checkXPathVisible(CommonFunctions.getXPathValue('commonPageXpath')['clickAddBtn']).click({force:true})
    }

    verifyHeadingText(text:string) {
        cy.checkXPathVisible(CommonFunctions.getXPathValue('commonPageXpath')['headingText']).should('have.text', text)
    }

    addUserDetails() {
        cy.checkXPathVisible(CommonFunctions.getXPathValue('commonPageXpath')['userRole']).eq(0).click({force:true})
        cy.checkXPathVisible(CommonFunctions.getXPathValue('commonPageXpath')['userRoleStatus']).contains('Admin').click()
        cy.checkXPathVisible(CommonFunctions.getXPathValue('commonPageXpath')['typeHints']).type('Odis')
        cy.checkXPathVisible(CommonFunctions.getXPathValue('commonPageXpath')['typeHintsSelect']).contains('Odis').click();
        cy.checkXPathVisible(CommonFunctions.getXPathValue('commonPageXpath')['status']).eq(1).click({force:true})
        cy.checkXPathVisible(CommonFunctions.getXPathValue('commonPageXpath')['statusSelect']).contains('Enabled').click()
        cy.checkXPathVisible(CommonFunctions.getXPathValue('commonPageXpath')['password']).eq(0).type('test123')
        cy.checkXPathVisible(CommonFunctions.getXPathValue('commonPageXpath')['password']).eq(1).type('test123')
        cy.checkXPathVisible("//button[normalize-space()='Cancel']")
        cy.checkXPathVisible("//button[normalize-space()='Save']").click({force:true})
        cy.checkXPathVisible(CommonFunctions.getXPathValue('commonPageXpath')['username']).type('Aravind')
        cy.checkXPathVisible("//button[normalize-space()='Save']").click({force:true})
    }

    verifyUserCreated() {
        cy.checkXPathVisible(CommonFunctions.getXPathValue('commonPageXpath')['userCreated']).should('contain', 'Aravind')
    }

    verifyEditUserDetails() {
        let xpath = CommonFunctions.getXPathValue('commonPageXpath')['editUserIcon']
        const xpathWithReplacedText = this.ReplaceXpathText(xpath, {'$text': 'Aravind'} )
       cy.checkXPathVisible(xpathWithReplacedText).click({force:true})
    }

    clickSaveBtn() {
            cy.wait(2000)
            cy.checkXPathVisible("//button[normalize-space()='Save']").then((saveBtn)=>{
                cy.wrap(saveBtn).click({force:true})
            })
    }

    verifyDeleteUserIcon() {
        let xpath = CommonFunctions.getXPathValue('commonPageXpath')['deleteIcon']
        const xpathWithReplacedText = this.ReplaceXpathText(xpath, {'$text': 'Aravind'} )
        cy.checkXPathVisible(xpathWithReplacedText).click({force:true})
    }

    deleteUserPopUp() {
        let xpath = CommonFunctions.getXPathValue('commonPageXpath')['deletePopUpText']
        const xpathWithReplacedText = this.ReplaceXpathText(xpath, {'$text': 'The selected record will be permanently deleted. Are you sure you want to continue?'} )
        cy.checkXPathVisible(CommonFunctions.getXPathValue('commonPageXpath')['deletePopUp'])
        cy.checkXPathVisible(xpathWithReplacedText).should('contain', 'The selected record will be permanently deleted. Are you sure you want to continue?')
        cy.checkXPathVisible(CommonFunctions.getXPathValue('commonPageXpath')['deleteCancelBtn']).should('contain', 'No, Cancel')
        cy.checkXPathVisible(CommonFunctions.getXPathValue('commonPageXpath')['deleteBtn']).should('contain', 'Yes, Delete')
    }

    performDeleteUser() {
        cy.checkXPathVisible(CommonFunctions.getXPathValue('commonPageXpath')['deleteBtn']).should('contain', 'Yes, Delete').click({force:true})
    }

    


}