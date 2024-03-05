import { stringRecord } from "./type";

export class CommonFunctions {

    public static xPathVals: stringRecord = {};

    static loadXPathValues() {
        cy.fixture("xpath.json").then((data) => {
            this.xPathVals = data;
        });
    }

    static getXPathValue(key:string):string{
        return this.xPathVals[key];
    }

}