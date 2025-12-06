import { Locator, Page } from '@playwright/test';

export class FundScreenerTableHeadersComponent {
    readonly page: Page;

    // Common header for all tabs
    readonly fundName: Locator;

    // Summary tab headers
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

    // Category & Volatility tab headers
    readonly morningstarCategory: Locator;
    readonly morningstarSubCategory: Locator;
    readonly alpha: Locator;
    readonly beta: Locator;
    readonly annualTurnoverRate: Locator;

    // Prices tab headers
    readonly currentNAV: Locator;
    readonly navChange: Locator;
    readonly changePercent: Locator;
    readonly navLowHigh: Locator;

    // Yields tab headers
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

    constructor(page: Page) {
        this.page = page;

        // -------------------------
        // Common header
        // -------------------------
        this.fundName = page.locator(this.headerSelector('name'));

        // -------------------------
        // Summary headers
        // -------------------------
        this.overallMorningstarRating = page.locator(
            this.headerSelector('fiveStarRating'),
        );
        this.riskPotential = page.locator(this.headerSelector('riskLevel'));
        this.sevenDayYieldWithWaiver = page.locator(
            this.headerSelector('sevenDayYieldSimple'),
        );
        this.sevenDayYieldWithoutWaiver = page.locator(
            this.headerSelector('unsubsidizedSevenDayYieldSimple'),
        );
        this.dailyYTD = page.locator(this.headerSelector('fundReturn'));
        this.oneYearReturn = page.locator(this.headerSelector('oneYearReturn'));
        this.fiveYearReturn = page.locator(this.headerSelector('fiveYearReturn'));
        this.tenYearReturn = page.locator(this.headerSelector('tenYearReturn'));
        this.sinceInceptionReturn = page.locator(
            this.headerSelector('sinceInceptionReturn'),
        );
        this.grossExpenseRatio = page.locator(
            this.headerSelector('grossExpenseRatio'),
        );
        this.netExpenseRatio = page.locator(this.headerSelector('netExpense'));

        // -------------------------
        // Category & Volatility headers
        // -------------------------
        this.morningstarCategory = page.locator(
            this.headerSelector('broadAssetClass'),
        );
        this.morningstarSubCategory = page.locator(
            this.headerSelector('morningStarCategoryName'),
        );
        // ⚠️ confirm col-id="alpha" in DOM, or update
        this.alpha = page.getByRole('columnheader', { name: /Alpha/i });
        this.beta = page.locator(this.headerSelector('beta'));
        this.annualTurnoverRate = page.locator(
            this.headerSelector('turnoverRateTwelveMonth'),
        );

        // -------------------------
        // Prices headers
        // -------------------------
        this.currentNAV = page.locator(this.headerSelector('price'));
        this.navChange = page.locator(this.headerSelector('priceChange'));
        this.changePercent = page.locator(
            this.headerSelector('pricePercentChange'),
        );
        this.navLowHigh = page.locator(this.headerSelector('priceLowHigh'));

        // -------------------------
        // Yields headers
        // -------------------------
        // ---- Yields headers ----
        this.yieldsSevenDayWithWaiver = page.locator(
            this.headerSelector('sevenDayYieldSimple'),
        );
        this.yieldsSevenDayWithoutWaiver = page.locator(
            this.headerSelector('unsubsidizedSevenDayYieldSimple'),
        );
        this.yieldsDailyYTD = page.locator(this.headerSelector('dailyYTDReturn'));
        this.yieldsMonthlyYTD = page.locator(
            this.headerSelector('ytdMonthlyTotalReturns'),
        );
        this.yieldsOneYearReturn = page.locator(
            this.headerSelector('oneYearReturn'),
        );
        this.yieldsFiveYearReturn = page.locator(
            this.headerSelector('fiveYearReturn'),
        );
        this.yieldsTenYearReturn = page.locator(
            this.headerSelector('tenYearReturn'),
        );
        this.yieldsSinceInceptionReturn = page.locator(
            this.headerSelector('sinceInceptionReturn'),
        );
        this.yieldsGrossExpenseRatio = page.locator(
            this.headerSelector('grossExpenseRatio'),
        );

        // ✅ relaxed text match for "Net"
        this.yieldsNetExpenseRatio = page.getByRole('columnheader', {
            name: /Net\b/i,
        });

        this.yieldsThirtyDaysAnnualized = page.locator(
            this.headerSelector('thirtyDayAnnualizedDividendYield'),
        );
        this.yieldsThirtyDayWithWaiver = page.locator(
            this.headerSelector('thirtyDaySECDividend'),
        );

        // ✅ precise col-id for 30-day w/out Waiver
        this.yieldsThirtyDayWithoutWaiver = page.locator(
            this.headerSelector('unsubsidizedThirtyDaySECYield'),
        );
    }

    /**
     * Build a locator for AG-Grid header cells.
     * We target:
     *   <div class="ag-header-cell" col-id="..." role="columnheader">
     */
    private headerSelector(colId: string): string {
        return `.ag-header-cell[col-id="${colId}"][role="columnheader"]`;
    }

    /**
     * Extract visible text for a header cell.
     * We use textContent() on the header itself and then trim.
     */
    async getHeaderText(headerLocator: Locator): Promise<string> {
        const raw = await headerLocator.textContent();
        if (!raw) return '';
        // Optional: debug if needed
        // console.log('Header raw text:', raw);
        return raw.replace(/\u00A0/g, ' ').trim();
    }
}
