import { Page } from "@playwright/test";


//constructor(private page: Page)
//is defines the constructor for the class, which runs when you create a new instance like:
//const tabBar = new TabBarComponents(page);
export class TabBarComponents {
    constructor(private page: Page) {

    }

    //generic method to click on the tab by ut selector

    async clickTab(tabSelector: string) {
        await this.page.click(tabSelector);

    }
    //generic method to check if a tab is active by its ID
    //Waits up to 5 seconds for the element with the given tabId selector to be visible.
    //This runs a function inside the browser context on the matched element.(this.page.$eval(...);
    //Will return true if the tab is active, otherwise false.
    async isTabActive(tabId: string): Promise<boolean> {
        await this.page.waitForSelector(tabId, { state: 'visible', timeout: 5000 });
        return await this.page.$eval(tabId, (el) => el.getAttribute('aria-selected') === 'true');
    }
    //specific tab method for easy use

    async clickSummaryTab() {
        await this.clickTab('#content-summary');
    }

    async clickCategoryVolatilityTab() {
        await this.clickTab('#content-category-volatility');
    }

    async clickPriceTab() {
        await this.clickTab('#content-prices');
    }
    async clickYieldsTab() {
        await this.clickTab('#content-yields');
    }

    //specific active check for easy use

    async isSummaryTabActive(): Promise<boolean> {
        return await this.isTabActive('tab-0')
    }

    async isCategoryVolatilityTabActive(): Promise<boolean> {
        return this.isTabActive('tab-1')
    }
    async isPriceTabActive(): Promise<boolean> {
        return this.isTabActive('tab-2')
    }

    async isYieldsTabActive(): Promise<boolean> {
        return this.isTabActive('tab-3')
    }

    //dynamic method to switch to a tab based on te name

    async switchToTab(tabName: string) {
        switch (tabName) {
            case 'Summary':
                if (!(await this.isSummaryTabActive())) {
                    await this.clickSummaryTab();
                }
                break;
            case 'Category & Volatility':
                if (!(await this.isCategoryVolatilityTabActive())) {
                    await this.clickCategoryVolatilityTab();
                }
                break;
            case 'Prices':
                if (!(await this.isPriceTabActive())) {
                    await this.clickPriceTab();
                }
                break
            case 'Yields':
                if (!(await this.isYieldsTabActive())) {
                    await this.clickYieldsTab();
                }
                break
            default:
                throw new Error(`Tab with name "${tabName}" does not exist`);
        }
    }
}