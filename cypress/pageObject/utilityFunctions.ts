import { CommonFunctions } from "./commonDynamicFunctions";
import { stringRecord } from "./type";
export const commonMap = new Map();

let pageHeader = {}

export class Utility {

    // public commonMap = new Map(); two ways to declare new maps 1 is above we have used and the another one is this

    ReplaceXpathText(xpath:any, replaceText:stringRecord) {
        for(let text in replaceText){
            const textValue = text;
            const replaceTextValue = replaceText[text] 
            xpath= xpath.replaceAll(textValue, replaceTextValue);
        }
        return xpath;
    }

    grabTopHeadersCommon(pageName: string) {
        const pageHeadersName = []
        const pageTopHeaders = pageName + "TopHeaders"
        cy.checkXPathVisible(CommonFunctions.getXPathValue('commonPageXpath')['topHeader']).then((attr) => {
            const attrCount = attr.length;
            for (let i = 0; i < attrCount; i++) {
                cy.checkXPathVisible(CommonFunctions.getXPathValue('commonPageXpath')['topHeader']).eq(i).invoke('text').then((headerVal) => {
                    pageHeadersName.push(headerVal.trim())
                })
            }
            commonMap.set(pageTopHeaders, pageHeadersName)
        })
    }

    grabSubTopHeadersCommon(pageName: string) {
        const subHeadersName = {}
        const pageTopHeaders = pageName + "TopHeaders"
        const pageTopSubHeaders = pageName + "TopSubHeaders"
        const topHeaders = commonMap.get(pageTopHeaders)
        topHeaders.forEach(element => {
            const subHeaders = []
            let xpath = CommonFunctions.getXPathValue('commonPageXpath')['headerIcon']
            xpath = xpath.replace("$element", element)
            let subHeaderXpath = CommonFunctions.getXPathValue('commonPageXpath')['subHeaders']
            subHeaderXpath = subHeaderXpath.replace("$element", element)
            cy.ifXPathExist(xpath).then((exists) => {
                if (exists) {
                    cy.checkXPathVisible(CommonFunctions.getXPathValue('commonPageXpath')['topHeader']).contains(element).find('i').click({ force: true })
                    cy.checkXPathVisible(subHeaderXpath).then((attr) => {
                        const attrCount = attr.length;
                        for (let i = 0; i < attrCount; i++) {
                            cy.xpath(CommonFunctions.getXPathValue('commonPageXpath')['activeClass']).contains(element).then((active) => {
                                if (active) {
                                    cy.checkXPathVisible(subHeaderXpath).eq(i).invoke('text').then((subHeaderVal) => {
                                        subHeaders.push(subHeaderVal)
                                    })
                                }
                            })
                        }
                    })
                }
            })
            subHeadersName[element] = subHeaders
            commonMap.set(pageTopSubHeaders, subHeadersName)
        })
    }

    getTopHeadersCommon(pageName: string) {
        const pageTopHeaders = pageName + "TopHeaders"
        const pageTopSubHeaders = pageName + "TopSubHeaders"
        const topHeader = commonMap.get(pageTopHeaders)
        const subHeader = commonMap.get(pageTopSubHeaders)
        pageHeader[pageName] = { topHeader, subHeader }
        commonMap.set('pageHeader', pageHeader)
        cy.writeFile('src/fixtures/header.json', pageHeader)
    }

    verifySuccessMessage(text:string) {
        cy.checkXPathVisible("//div[@id='oxd-toaster_1']").should('contain', 'Success').and('contain', text)
    }

  



}