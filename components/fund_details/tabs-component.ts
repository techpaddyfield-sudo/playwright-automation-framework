import { Locator, Page } from '@playwright/test';

export class FundDetailsTabsComponent {
    readonly summaryTab: Locator;
    readonly performanceTab: Locator;
    readonly portfolioTab: Locator;
    readonly ratingsAndRisksTab: Locator;
    readonly pricesAndDistributionsTab: Locator;
    readonly expensesAndMinimumsTab: Locator;
    readonly resourcesTab: Locator;
    readonly pricesAndMarketDataTab: Locator;
    readonly expensesTab: Locator;

    constructor(private page: Page) {
        this.summaryTab = page.locator('#content-summary-link');
        this.performanceTab = page.locator('#content-performance-link');
        this.portfolioTab = page.locator('#content-portfolio-link');
        this.ratingsAndRisksTab = page.locator('#content-ratings-risks-link');
        this.pricesAndDistributionsTab = page.locator(
            '#content-prices-distributions-link'
        );
        this.expensesAndMinimumsTab = page.locator(
            '#content-expenses-minimums-link'
        );
        this.resourcesTab = page.locator('#content-resources-link');
        this.pricesAndMarketDataTab = page.locator(
            '#content-prices-market-data-link'
        );
        this.expensesTab = page.locator('#content-expenses-link');
    }
}
//   // ---- actions (no expects) ----
//   async clickSummary() {
//     await this.summaryTab.click();
//   }

//   async clickPerformance() {
//     await this.performanceTab.click();
//   }

//   async clickPortfolio() {
//     await this.portfolioTab.click();
//   }

//   async clickRatingsAndRisks() {
//     await this.ratingsAndRisksTab.click();
//   }

//   async clickPricesAndDistributions() {
//     await this.pricesAndDistributionsTab.click();
//   }

//   async clickExpensesAndMinimums() {
//     await this.expensesAndMinimumsTab.click();
//   }

//   async clickResources() {
//     await this.resourcesTab.click();
//   }

//   async clickPricesAndMarketData() {
//     await this.pricesAndMarketDataTab.click();
//   }

//   async clickExpenses() {
//     await this.expensesTab.click();
//   }
// }
