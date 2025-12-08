// import { Locator, Page, Selectors } from '@playwright/test'


// export class FundScreenerTableHeaderComponets {

//     readonly page: Page;
//     // common header for all tabs
//     readonly fundName: Locator;
//     //summary Tab
//     readonly overallMorningstarRating: Locator;
//     readonly riskPotential: Locator;
//     readonly sevenDayYieldWithWaiver: Locator;
//     readonly sevenDayYieldWithoutWaiver: Locator;
//     readonly dailyYTD: Locator;
//     readonly oneYearReturn: Locator;
//     readonly fiveYearReturn: Locator;
//     readonly tenYearReturn: Locator;
//     readonly sinceInception: Locator;
//     readonly grossExpenseRatio: Locator;
//     readonly netExpenseRatio: Locator;

//     //category Tab

//     readonly morningstarCategory: Locator;
//     readonly morningstarSubCategory: Locator;
//     readonly alpha: Locator;
//     readonly beta: Locator;
//     readonly annualTurnoverRate: Locator;


//     //price tab

//     readonly currentNav: Locator;
//     readonly navChange: Locator;
//     readonly changePercentage: Locator;
//     readonly navLowHigh: Locator;

//     //yeilds Tab

//     readonly Waiver: Locator;
//     readonly WaiverOut: Locator;
//     readonly DailyYTD: Locator;
//     readonly MonthlyYTD: Locator;



//     constructor(page: Page) {
//         this.page = page;
//         //common header( shared all tabs)
//         this.fundName = page.locator(this.selector('name'));

//         //initialize the locator for summary tab
//         this.overallMorningstarRating = page.locator(this.selector('fiveStarRating'));
//         this.riskPotential = page.locator(this.selector('riskLevel'));
//         this.sevenDayYieldWithWaiver = page.locator(this.selector('sevenDayYieldSimple'));
//         this.sevenDayYieldWithoutWaiver = page.locator(this.selector('unsubsidizedSevenDayYieldSimple'));
//         this.dailyYTD = page.locator(this.selector('fundReturn'));
//         this.oneYearReturn = page.locator(this.selector('oneYearReturn'));
//         this.fiveYearReturn = page.locator(this.selector('fiveYearReturn'));
//         this.tenYearReturn = page.locator(this.selector('tenYearReturn'));
//         this.sinceInception = page.locator(this.selector('sinceInceptionReturn'));
//         this.grossExpenseRatio = page.locator(this.selector('grossExpenseRatio'));
//         this.netExpenseRatio = page.locator(this.selector('netExpense'));
//         //initialize the locator for  category-volatility

//         this.morningstarCategory = page.locator(this.selector('broadAssetClass'));
//         this.morningstarSubCategory = page.locator(this.selector('morningStarCategoryName'));
//         this.alpha = page.locator(this.selector('price'));
//         this.beta = page.locator(this.selector('beta'));
//         this.annualTurnoverRate = page.locator(this.selector('turnoverRateTwelveMonth'));

//         //initialize the locator for  price

//         this.currentNav = page.locator(this.selector('price'));
//         this.navChange = page.locator(this.selector('priceChange'));
//         this.changePercentage = page.locator(this.selector('pricePercentChange'));
//         this.navLowHigh = page.locator(this.selector('priceLowHigh'));

//         //initialize the locator for  Yields

//         this.Waiver = page.locator(this.selector('sevenDayYieldSimple'));
//         this.WaiverOut = page.locator(this.selector('unsubsidizedSevenDayYieldSimple'));
//         this.DailyYTD = page.locator(this.selector('dailyYTDReturn'));
//         this.MonthlyYTD = page.locator(this.selector('ytdMonthlyTotalReturns'));

//     }






//     //Used to generate dynamic locators for table columns or grid cells in a test automation framework.
//     private selector(colID: string): string {
//         return `[col-id="${colID}"][role="presentation"]`
//     }
//     //Finds a <span> with attribute ref="eText" inside the header cell.
//     //Returns the text content of that span.

//     async getHeaderText(headerLocator: Locator): Promise<string | null> {
//         return await headerLocator.locator('span[ref="eText"]').textContent();
//     }
// }

// components/FundScreener/FundScreenerTableHeadersComponent.ts
import { Locator, Page } from '@playwright/test';

export class FundScreenerTableHeadersComponent {
    readonly page: Page;

    // Common header for all tabs
    readonly fundName: Locator;

    // Summary Tab
    readonly overallMorningstarRating: Locator;
    readonly riskPotential: Locator;
    readonly sevenDayYieldWithWaiver: Locator;
    readonly sevenDayYieldWithoutWaiver: Locator;
    readonly dailyYTD: Locator;
    readonly oneYearReturn: Locator;
    readonly fiveYearReturn: Locator;
    readonly tenYearReturn: Locator;
    readonly sinceInceptionReturn: Locator;
    readonly grossExpenseRatio: Locator;
    readonly netExpenseRatio: Locator;

    // Category & Volatility Tab
    readonly morningstarCategory: Locator;
    readonly morningstarSubCategory: Locator;
    readonly alpha: Locator;
    readonly beta: Locator;
    readonly annualTurnoverRate: Locator;

    // Prices Tab
    readonly currentNAV: Locator;
    readonly navChange: Locator;
    readonly changePercent: Locator;
    readonly navLowHigh: Locator;

    // Yields Tab
    readonly yieldsSevenDayWithWaiver: Locator;
    readonly yieldsSevenDayWithoutWaiver: Locator;
    readonly yieldsDailyYTD: Locator;
    readonly yieldsMonthlyYTD: Locator;
    readonly yieldsOneYearReturn: Locator;
    readonly yieldsFiveYearReturn: Locator;
    readonly yieldsTenYearReturn: Locator;
    readonly yieldsSinceInceptionReturn: Locator;
    readonly yieldsGrossExpenseRatio: Locator;
    readonly yieldsNetExpenseRatio: Locator;
    readonly yieldsThirtyDaysAnnualized: Locator;
    readonly yieldsThirtyDayWithWaiver: Locator;
    readonly yieldsThirtyDayWithoutWaiver: Locator;

    // Grid header row – for wait
    readonly headerRow: Locator;

    constructor(page: Page) {
        this.page = page;

        // ---- Common ----
        this.fundName = page.locator(this.selector('name'));

        // ---- Summary Tab ----
        this.overallMorningstarRating = page.locator(this.selector('fiveStarRating'));
        this.riskPotential = page.locator(this.selector('riskLevel'));
        this.sevenDayYieldWithWaiver = page.locator(this.selector('sevenDayYieldSimple'));
        this.sevenDayYieldWithoutWaiver = page.locator(this.selector('unsubsidizedSevenDayYieldSimple'));
        this.dailyYTD = page.locator(this.selector('fundReturn'));
        this.oneYearReturn = page.locator(this.selector('oneYearReturn'));
        this.fiveYearReturn = page.locator(this.selector('fiveYearReturn'));
        this.tenYearReturn = page.locator(this.selector('tenYearReturn'));
        this.sinceInceptionReturn = page.locator(this.selector('sinceInceptionReturn'));
        this.grossExpenseRatio = page.locator(this.selector('grossExpenseRatio'));
        this.netExpenseRatio = page.locator(this.selector('netExpense'));

        // ---- Category & Volatility Tab ----
        this.morningstarCategory = page.locator(this.selector('broadAssetClass'));
        this.morningstarSubCategory = page.locator(this.selector('morningStarCategoryName'));
        this.alpha = page.getByRole('columnheader', { name: /Alpha/i });
        this.beta = page.locator(this.selector('beta'));
        this.annualTurnoverRate = page.locator(this.selector('turnoverRateTwelveMonth'));

        // ---- Prices Tab ----
        this.currentNAV = page.locator(this.selector('price'));
        this.navChange = page.locator(this.selector('priceChange'));
        this.changePercent = page.locator(this.selector('pricePercentChange'));
        this.navLowHigh = page.locator(this.selector('priceLowHigh'));

        // ---- Yields Tab ----
        this.yieldsSevenDayWithWaiver = page.locator(this.selector('sevenDayYieldSimple'));
        this.yieldsSevenDayWithoutWaiver = page.locator(this.selector('unsubsidizedSevenDayYieldSimple'));
        this.yieldsDailyYTD = page.locator(this.selector('dailyYTDReturn'));
        this.yieldsMonthlyYTD = page.locator(this.selector('ytdMonthlyTotalReturns'));
        this.yieldsOneYearReturn = page.locator(this.selector('oneYearReturn'));
        this.yieldsFiveYearReturn = page.locator(this.selector('fiveYearReturn'));
        this.yieldsTenYearReturn = page.locator(this.selector('tenYearReturn'));
        this.yieldsSinceInceptionReturn = page.locator(this.selector('sinceInceptionReturn'));
        this.yieldsGrossExpenseRatio = page.locator(this.selector('grossExpenseRatio'));
        this.yieldsNetExpenseRatio = page.locator(this.selector('netExpense'));
        this.yieldsThirtyDaysAnnualized = page.locator(this.selector('thirtyDayAnnualizedDividendYield'));
        this.yieldsThirtyDayWithWaiver = page.locator(this.selector('thirtyDayWithWaiver'));
        this.yieldsThirtyDayWithoutWaiver = page.locator(this.selector('thirtyDayWithoutWaiver'));

        this.headerRow = this.page.locator('.ag-header-row'); // adjust if needed
    }

    private selector(colID: string): string {
        // Only match the header, not data cells
        return `[col-id="${colID}"][role="columnheader"]`;
    }

    async waitForTableReady(): Promise<void> {
        // Just wait for any column header / header row to become visible.
        // No 'networkidle', because the app keeps some network calls open.

        // If you are using AG Grid:
        await this.headerRow.first().waitFor({
            state: 'visible',
            timeout: 15000,
        });

        // OR even more generic (if needed):
        // await this.page.locator('[role="columnheader"]').first().waitFor({
        //   state: 'visible',
        //   timeout: 15000,
        // });
    }
    // async getHeaderText(headerLocator: Locator): Promise<string> {
    //     const raw = await headerLocator.innerText();
    //     // Normalize all whitespace (spaces, NBSP, tabs, newlines) to a single regular space
    //     return raw.replace(/\s+/g, ' ').trim();
    // }
    async getHeaderText(headerLocator: Locator): Promise<string> {
        // Try primary AG-Grid label container
        const label = headerLocator.locator('.ag-header-cell-label');
        if (await label.count() > 0) {
            const text = await label.innerText();
            return text.replace(/\s+/g, ' ').trim();
        }

        // Fallback generic
        const raw = await headerLocator.textContent();
        return raw?.replace(/\s+/g, ' ').trim() ?? '';
    }


}
