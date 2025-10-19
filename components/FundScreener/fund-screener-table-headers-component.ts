
import { Locator, Page } from '@playwright/test'
export class FundScreenerHeaderTableComponent {

    readonly page: Page;

    //common headers for all tabs
    readonly fundName: Locator;
    readonly OverallMorningstarRating: Locator;
    readonly RiskPotential: Locator;
    readonly sevenDayYeildWithWaiver: Locator;
    readonly sevenDayYeildWithoutWaiver: Locator;
    readonly DailyYTD: Locator;
    readonly oneYearReturn: Locator;
    readonly fiveYearReturn: Locator;
    readonly tenYearReturn: Locator;
    readonly SinceInception: Locator;
    readonly grossExpenseRatio: Locator
    readonly netExpenseRatio: Locator;


    constructor(page: Page) {
        this.page = page;
        this.fundName = page.locator('span.ag-header-cell-text', { hasText: 'Fund Name' });
        this.OverallMorningstarRating = page.locator('span.ag-header-cell-text', { hasText: /Overall\s+Morningstar\s+Rating/i });
        this.RiskPotential = page.locator('span.ag-header-cell-text', { hasText: /Risk\s*Potential/i });
        this.sevenDayYeildWithWaiver = page.locator('span.ag-header-cell-text', { hasText: 'w/ Waiver' });
        this.sevenDayYeildWithoutWaiver = page.locator('span.ag-header-cell-text', { hasText: 'w/out Waiver' });
        this.DailyYTD = page.locator('span.ag-header-cell-text', { hasText: /Daily\s*YTD/i });
        this.oneYearReturn = page.locator('span.ag-header-cell-text', { hasText: /^1Y$/ });
        this.fiveYearReturn = page.locator('span.ag-header-cell-text', { hasText: /^5Y$/ });
        this.tenYearReturn = page.locator('span.ag-header-cell-text', { hasText: /^10Y$/ });
        this.SinceInception = page.locator('span.ag-header-cell-text', { hasText: /Since\s*Inception/i });
        this.grossExpenseRatio = page.locator('span.ag-header-cell-text', { hasText: /^Gross$/ });
        this.netExpenseRatio = page.locator('span.ag-header-cell-text', { hasText: /^Net$/ });
    }

}
