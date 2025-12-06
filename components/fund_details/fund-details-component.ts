import { Page, Locator } from '@playwright/test';
import { FundDetailsActionsComponent } from './fund-details-actions-component';
import { FundDetailsTabsComponent } from './tabs-component';
import { ShareClassComponent } from './share-class-component';

export class FundDetailsComponent {

    readonly fundTitle: Locator;
    readonly ticker: Locator;
    readonly navValue: Locator;
    readonly navAsOfDate: Locator;

    readonly actions: FundDetailsActionsComponent;
    readonly tabs: FundDetailsTabsComponent;
    readonly shareClass: ShareClassComponent;

    constructor(private page: Page) {

        // Initialize nested components
        this.actions = new FundDetailsActionsComponent(page);
        this.tabs = new FundDetailsTabsComponent(page);
        this.shareClass = new ShareClassComponent(page);

        // Page locators
        this.fundTitle = page.locator('h1.fund-title');  // Example: Fund Title
        this.ticker = page.locator('#open-fund-select'); // Example: TRBCX
        this.navValue = page.locator('.mf-nav dd');      // Example: NAV Value
        this.navAsOfDate = page.locator('.snapshot-data .term-wrapper-mf-date'); // Date
    }
}

//     // ---- Component level methods ----
//     async getFundTitle(): Promise<string> {
//         return await this.fundTitle.textContent();
//     }

//     async getTicker(): Promise<string> {
//         return await this.ticker.textContent();
//     }

//     async getNavValue(): Promise<string> {
//         return await this.navValue.textContent();
//     }

//     async getNavDate(): Promise<string> {
//         return await this.navAsOfDate.textContent();
//     }
// }
