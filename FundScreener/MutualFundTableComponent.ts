import { Page, test, expect, Locator } from "@playwright/test";

export class MutualFundTableComponent {

    private static readonly selectors = {
        tableContainer: '[ref="gridPanel"]',
        fundnameColumnContainer: '[ref="eLeftContainer"]'
    };
    private container: Locator;

    constructor(private page: Page) {
        this.container = page.locator(MutualFundTableComponent.selectors.tableContainer);
    }
    get fundNameColumn(): Locator {
        return this.container.locator(MutualFundTableComponent.selectors.fundnameColumnContainer);
    }

    async getFundNameRows(): Promise<Locator[]> {
        await this.fundNameColumn.waitFor({ state: 'attached' });
        const fundNameRows = this.fundNameColumn.locator('[role="row"]');
        return await fundNameRows.all();

    }

    async findFundByName(fundName: string): Promise<Locator> {
        const fundNameRows = await this.getFundNameRows();
        for (const row of fundNameRows) {
            const name = await row.locator('.name').innerText();
            if (name === fundName) {
                return row;
            }
        }
        throw new Error(`fund with name "${fundName}" not found`);
    }

    async getFundNames(): Promise<string[]> {
        const fundNameRows = await this.getFundNameRows();
        return Promise.all(fundNameRows.map(row => row.locator('.name').innerText()));
    }

    async clickFundCheckbox(fundTicker:string) :Promise<void>{
        const fundCheckbox = this.page.locator(`#checked-${fundTicker}`);
        await fundCheckbox.click();
    }

    async isFundCheckboxDisabled(fundTicker:string) :Promise<boolean>{
        return (await this.page.locator(`[id="checked-${fundTicker}"][disabled]`).count()===1);
    }

    async isFundChecked(fundTicker:string): Promise<boolean>{
        const fundCheckbox:Locator= this.page.locator(`[id="checked-${fundTicker}"]`);
        return await fundCheckbox.isChecked();
    }
    async isSelectFund(fundLocator:Locator) :Promise<boolean>{
        const ribbonIcon:Locator=fundLocator.locator('img[@alt="Select Fund Certified"]');
        return (await ribbonIcon.count()>0);
    }
}