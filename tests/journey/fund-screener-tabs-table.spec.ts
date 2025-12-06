import { test, expect, Page, BrowserContext } from '@playwright/test';
import { Routes } from '../../utils/urls';
import { TabBarComponents } from '../../components/FundScreener/TabBarComponent';
import { MutualFundSearchComponent } from '../../components/FundScreener/MutualFundSearchComponent';
import { FundScreenerTableHeaderComponets } from '../../components/FundScreener/FundScreenerTableHeaderComponets';
import { FiltersComponent } from '../../components/FundScreener/FiltersComponent';
import { MutualFundTableComponent } from '../../components/FundScreener/MutualFundTableComponent';

import { findArrayDifferences } from '../../Utils/arrayUtils';
import { FundScreenerTableHeadersComponent } from '../../components/FundScreener/fund-screener-table-headers-component';
import { investorClassStockFunds } from '../../Data/stock-funds';


let context: BrowserContext;
let page: Page;

// --------------------------------------------------------
// Header keys type definition
// --------------------------------------------------------

type SummaryHeaderKeys =
    | 'fundName'
    | 'overallMorningstarRating'
    | 'riskPotential'
    | 'sevenDayYieldWithWaiver'
    | 'sevenDayYieldWithoutWaiver'
    | 'dailyYTD'
    | 'oneYearReturn'
    | 'fiveYearReturn'
    | 'tenYearReturn'
    | 'sinceInceptionReturn'
    | 'grossExpenseRatio'
    | 'netExpenseRatio';

type CategoryAndVolatilityHeaderKeys =
    | 'morningstarCategory'
    | 'morningstarSubCategory'
    | 'alpha'
    | 'beta'
    | 'annualTurnoverRate';

type PricesHeaderKeys =
    | 'currentNAV'
    | 'navChange'
    | 'changePercent'
    | 'navLowHigh';

type YieldsHeaderKeys =
    | 'yieldsSevenDayWithWaiver'
    | 'yieldsSevenDayWithoutWaiver'
    | 'yieldsDailyYTD'
    | 'yieldsMonthlyYTD'
    | 'yieldsOneYearReturn'
    | 'yieldsFiveYearReturn'
    | 'yieldsTenYearReturn'
    | 'yieldsSinceInceptionReturn'
    | 'yieldsGrossExpenseRatio'
    | 'yieldsNetExpenseRatio'
    | 'yieldsThirtyDaysAnnualized'
    | 'yieldsThirtyDayWithWaiver'
    | 'yieldsThirtyDayWithoutWaiver';

// --------------------------------------------------------
// Full headers data – what to validate
// --------------------------------------------------------

const summaryHeadersToTest: { header: SummaryHeaderKeys; expectedText: string }[] = [
    { header: 'fundName', expectedText: 'Fund Name' },
    { header: 'overallMorningstarRating', expectedText: 'Overall Morningstar Rating' },
    { header: 'riskPotential', expectedText: 'Risk Potential' },
    { header: 'sevenDayYieldWithWaiver', expectedText: 'w/ Waiver' },
    { header: 'sevenDayYieldWithoutWaiver', expectedText: 'w/out Waiver' },
    { header: 'dailyYTD', expectedText: 'Daily YTD' },
    { header: 'oneYearReturn', expectedText: '1Y' },
    { header: 'fiveYearReturn', expectedText: '5Y' },
    { header: 'tenYearReturn', expectedText: '10Y' },
    { header: 'sinceInceptionReturn', expectedText: 'Since Inception' },
    { header: 'grossExpenseRatio', expectedText: 'Gross' },
    { header: 'netExpenseRatio', expectedText: 'Net' },
];

const categoryAndVolatilityHeadersToTest: {
    tab: 'Category & Volatility';
    header: CategoryAndVolatilityHeaderKeys;
    expectedText: string;
}[] = [
        { tab: 'Category & Volatility', header: 'morningstarCategory', expectedText: 'Morningstar Category' },
        { tab: 'Category & Volatility', header: 'morningstarSubCategory', expectedText: 'Morningstar Sub-Category' },
        { tab: 'Category & Volatility', header: 'alpha', expectedText: 'Alpha' },
        { tab: 'Category & Volatility', header: 'beta', expectedText: 'Beta' },
        { tab: 'Category & Volatility', header: 'annualTurnoverRate', expectedText: 'Annual Turnover Rate' },
    ];

const pricesHeadersToTest: {
    tab: 'Prices';
    header: PricesHeaderKeys;
    expectedText: string;
}[] = [
        { tab: 'Prices', header: 'currentNAV', expectedText: 'Current NAV $' },
        { tab: 'Prices', header: 'navChange', expectedText: 'NAV Change $' },
        { tab: 'Prices', header: 'changePercent', expectedText: 'Change %' },
        { tab: 'Prices', header: 'navLowHigh', expectedText: 'NAV 12 Month Low - High $' },
    ];

const yieldsHeadersToTest: {
    tab: 'Yields';
    header: YieldsHeaderKeys;
    expectedText: string;
}[] = [
        { tab: 'Yields', header: 'yieldsSevenDayWithWaiver', expectedText: 'w/ Waiver' },
        { tab: 'Yields', header: 'yieldsSevenDayWithoutWaiver', expectedText: 'w/out Waiver' },
        { tab: 'Yields', header: 'yieldsDailyYTD', expectedText: 'Daily YTD' },
        { tab: 'Yields', header: 'yieldsMonthlyYTD', expectedText: 'Monthly YTD' },
        { tab: 'Yields', header: 'yieldsOneYearReturn', expectedText: '1Y' },
        { tab: 'Yields', header: 'yieldsFiveYearReturn', expectedText: '5Y' },
        { tab: 'Yields', header: 'yieldsTenYearReturn', expectedText: '10Y' },
        { tab: 'Yields', header: 'yieldsSinceInceptionReturn', expectedText: 'Since Inception' },
        { tab: 'Yields', header: 'yieldsGrossExpenseRatio', expectedText: 'Gross' },
        { tab: 'Yields', header: 'yieldsNetExpenseRatio', expectedText: 'Net' },
        { tab: 'Yields', header: 'yieldsThirtyDaysAnnualized', expectedText: '30-Day Annualized Dividend Yield' },
        { tab: 'Yields', header: 'yieldsThirtyDayWithWaiver', expectedText: 'w/ Waiver' },
        { tab: 'Yields', header: 'yieldsThirtyDayWithoutWaiver', expectedText: 'w/out Waiver' },
    ];

// --------------------------------------------------------
// Test suite
// --------------------------------------------------------

test.describe('Fund Screener Table Data', () => {
    let filtersComponent: FiltersComponent;
    let tabBarComponent: TabBarComponents;
    let mutualFundSearchComponent: MutualFundSearchComponent;
    let headerComponent: FundScreenerTableHeadersComponent;
    let mutualFundsTableComponent: MutualFundTableComponent;

    // Run once before all tests
    test.beforeAll(async ({ browser }) => {
        try {
            context = await browser.newContext();
            page = await context.newPage();
            await page.goto(Routes.FundResearch);

            filtersComponent = new FiltersComponent(page);
            mutualFundSearchComponent = new MutualFundSearchComponent(page);
            tabBarComponent = new TabBarComponents(page);
            mutualFundsTableComponent = new MutualFundTableComponent(page);
            headerComponent = new FundScreenerTableHeadersComponent(page);

            // Filter Stock Funds
            await filtersComponent.stockFundButton.click();

            // Search for "blue"
            await mutualFundSearchComponent.searchForText('blue');

            // Select fund TRBCX
            await mutualFundsTableComponent.clickFundCheckbox('TRBCX');

            // Clear search box
            await mutualFundSearchComponent.clearSearch();
        } catch (error) {
            console.error('Setup failed:', error);
            throw error; // Fail all tests if setup doesn't succeed
        }
    });

    // ======================================================
    // Summary tab
    // ======================================================
    test.describe('Summary Tab', () => {
        test.beforeAll(async () => {
            await tabBarComponent.clickSummaryTab();
        });

        // Dynamic tests for all Summary headers
        summaryHeadersToTest.forEach(({ header, expectedText }) => {
            test(`Verify visibility and name of header ${header} in Summary Tab`, async () => {
                const headerLocator = headerComponent[header]; // typed as Locator

                await expect(headerLocator).toBeVisible();

                const headerText = await headerComponent.getHeaderText(headerLocator);
                expect(headerText).toContain(expectedText);
            });
        });

        test('Verify TRBCX fund is selected in Summary Tab', async () => {
            const isFundSelected = await mutualFundsTableComponent.isFundChecked('TRBCX');
            expect(isFundSelected).toBe(true);
        });

        test('Verify all Investor Class Stock Funds displayed in Summary Tab', async () => {
            const actualStockFundNames = await mutualFundsTableComponent.getFundNames();

            const { onlyInArr1, onlyInArr2 } = findArrayDifferences(
                investorClassStockFunds,
                actualStockFundNames,
            );

            const errorMessage =
                `Funds in expected but not in actual: ${onlyInArr1}\n` +
                `Funds in actual but not in expected: ${onlyInArr2}`;

            expect(onlyInArr1.length + onlyInArr2.length, errorMessage).toBe(0);
        });
    });


    // ======================================================
    // Category & Volatility tab
    // ======================================================
    test.describe('Category & Volatility Tab', () => {

        test.beforeAll(async () => {
            await tabBarComponent.clickCategoryVolatilityTab();
            await page.waitForSelector('[role="columnheader"]', { state: 'visible' });
        });

        categoryAndVolatilityHeadersToTest.forEach(({ header, expectedText }) => {
            test(`Verify visibility and name of header ${header} in Category & Volatility Tab`, async () => {
                const headerLocator = headerComponent[header];
                await expect(headerLocator).toBeVisible();

                const headerText = await headerComponent.getHeaderText(headerLocator);
                expect(headerText).toContain(expectedText);
            });
        });
    });
    test.describe('Prices Tab', () => {

        test.beforeAll(async () => {
            await tabBarComponent.clickPriceTab();
            await page.waitForSelector('[role="columnheader"]', { state: 'visible' });
        });

        pricesHeadersToTest.forEach(({ header, expectedText }) => {
            test(`Verify visibility and name of header ${header} in Prices Tab`, async () => {
                const headerLocator = headerComponent[header];
                await expect(headerLocator).toBeVisible();

                const headerText = await headerComponent.getHeaderText(headerLocator);
                expect(headerText).toContain(expectedText);
            });
        });
    });
    test.describe('Yields Tab', () => {

        test.beforeAll(async () => {
            await tabBarComponent.clickYieldsTab();
            await page.waitForSelector('[role="columnheader"]', { state: 'visible' });
        });

        yieldsHeadersToTest.forEach(({ header, expectedText }) => {
            test(`Verify visibility and name of header ${header} in Yields Tab`, async () => {
                const headerLocator = headerComponent[header];
                await expect(headerLocator).toBeVisible();

                const headerText = await headerComponent.getHeaderText(headerLocator);
                expect(headerText).toContain(expectedText);
            });
        });
    });

});


//     // ======================================================
//     // Prices tab
//     // ======================================================
//     test.describe('Prices Tab', () => {
//         test.beforeAll(async () => {
//             await tabBarComponent.clickPricesTab();
//         });

//         pricesHeadersToTest.forEach(({ header, expectedText }) => {
//             test(`Verify header ${header} in Prices Tab`, async () => {
//                 const headerLocator =
//                     headerComponent[header as keyof FundScreenerTableHeadersComponent];

//                 await expect(headerLocator).toBeVisible();

//                 const headerText = await headerComponent.getHeaderText(headerLocator);
//                 expect(headerText).toContain(expectedText);
//             });
//         });
//     });

//     // ======================================================
//     // Yields tab
//     // ======================================================
//     test.describe('Yields Tab', () => {
//         test.beforeAll(async () => {
//             await tabBarComponent.clickYieldsTab();
//         });

//         yieldsHeadersToTest.forEach(({ header, expectedText }) => {
//             test(`Verify header ${header} in Yields Tab`, async () => {
//                 const headerLocator =
//                     headerComponent[header as keyof FundScreenerTableHeadersComponent];

//                 await expect(headerLocator).toBeVisible();

//                 const headerText = await headerComponent.getHeaderText(headerLocator);
//                 expect(headerText).toContain(expectedText);
//             });
//         });
//     });
// });
