// import { Page } from "@playwright/test";


// //constructor(private page: Page)
// //is defines the constructor for the class, which runs when you create a new instance like:
// //const tabBar = new TabBarComponents(page);
// export class TabBarComponents {
//     constructor(private page: Page) {

//     }

//     //generic method to click on the tab by ut selector

//     async clickTab(tabSelector: string) {
//         await this.page.click(tabSelector);

//     }
//     //generic method to check if a tab is active by its ID
//     //Waits up to 5 seconds for the element with the given tabId selector to be visible.
//     //This runs a function inside the browser context on the matched element.(this.page.$eval(...);
//     //Will return true if the tab is active, otherwise false.
//     async isTabActive(tabId: string): Promise<boolean> {
//         await this.page.waitForSelector(tabId, { state: 'visible', timeout: 5000 });
//         return await this.page.$eval(tabId, (el) => el.getAttribute('aria-selected') === 'true');
//     }
//     //specific tab method for easy use

//     async clickSummaryTab() {
//         await this.clickTab('#content-summary');
//     }

//     async clickCategoryVolatilityTab() {
//         await this.clickTab('#content-category-volatility');
//     }

//     async clickPriceTab() {
//         await this.clickTab('#content-prices');
//     }
//     async clickYieldsTab() {
//         await this.clickTab('#content-yields');
//     }

//     //specific active check for easy use

//     async isSummaryTabActive(): Promise<boolean> {
//         return await this.isTabActive('tab-0')
//     }

//     async isCategoryVolatilityTabActive(): Promise<boolean> {
//         return this.isTabActive('tab-1')
//     }
//     async isPriceTabActive(): Promise<boolean> {
//         return this.isTabActive('tab-2')
//     }

//     async isYieldsTabActive(): Promise<boolean> {
//         return this.isTabActive('tab-3')
//     }

//     //dynamic method to switch to a tab based on te name

//     async switchToTab(tabName: string) {
//         switch (tabName) {
//             case 'Summary':
//                 if (!(await this.isSummaryTabActive())) {
//                     await this.clickSummaryTab();
//                 }
//                 break;
//             case 'Category & Volatility':
//                 if (!(await this.isCategoryVolatilityTabActive())) {
//                     await this.clickCategoryVolatilityTab();
//                 }
//                 break;
//             case 'Prices':
//                 if (!(await this.isPriceTabActive())) {
//                     await this.clickPriceTab();
//                 }
//                 break
//             case 'Yields':
//                 if (!(await this.isYieldsTabActive())) {
//                     await this.clickYieldsTab();
//                 }
//                 break
//             default:
//                 throw new Error(`Tab with name "${tabName}" does not exist`);
//         }
//     }
// }

import { Page } from "@playwright/test";

export class TabBarComponents {

    constructor(private page: Page) { }

    // ---- generic helpers ------------------------------------------------

    // find a tab by its visible name using role="tab"
    private tab(tabName: string) {
        // ^...$ makes it exact; /i makes it case-insensitive
        return this.page.getByRole("tab", {
            name: new RegExp(`^${tabName}$`, "i"),
        });
    }

    // click a tab by name
    async clickTabByName(tabName: string) {
        const t = this.tab(tabName);
        await t.waitFor({ state: "visible", timeout: 20000 });
        await t.click();
    }

    // check if a tab is active using aria-selected="true"
    async isTabActive(tabName: string): Promise<boolean> {
        const t = this.tab(tabName);
        await t.waitFor({ state: "visible", timeout: 20000 });
        const selected = await t.getAttribute("aria-selected");
        return selected === "true";
    }

    // ---- specific tab helpers -------------------------------------------

    async clickSummaryTab() {
        await this.clickTabByName("Summary");
    }

    async clickCategoryVolatilityTab() {
        await this.clickTabByName("Category & Volatility");
    }

    async clickPriceTab() {
        await this.clickTabByName("Prices");
    }

    async clickYieldsTab() {
        await this.clickTabByName("Yields");
    }

    async isSummaryTabActive(): Promise<boolean> {
        return this.isTabActive("Summary");
    }

    async isCategoryVolatilityTabActive(): Promise<boolean> {
        return this.isTabActive("Category & Volatility");
    }

    async isPriceTabActive(): Promise<boolean> {
        return this.isTabActive("Prices");
    }

    async isYieldsTabActive(): Promise<boolean> {
        return this.isTabActive("Yields");
    }

    // ---- dynamic switch (cleaner) ---------------------------------------

    async switchToTab(tabName: string) {
        if (!(await this.isTabActive(tabName))) {
            await this.clickTabByName(tabName);
        }
    }
}
