import { test, expect, Page, BrowserContext } from '@playwright/test';
import { Routes } from '../../utils/urls';
import { FiltersComponent } from '../../components/FundScreener/FiltersComponent';
import { MutualFundTableComponent } from '../../components/FundScreener/MutualFundTableComponent';

import { MutualFundSearchComponent } from '../../components/FundScreener/MutualFundSearchComponent';
import { ActionBarComponent } from '../../components/FundScreener/ActionBarcomponents';
import { TabBarComponents } from '../../components/FundScreener/TabBarComponent';
import { expectFundsToMatch } from '../../Utils/testUtils';
import { investorClassFunds } from '../../Data/class-funds';
import { investorClassTargetDateFunds } from '../../Data/target-data-funds';
import { FundDetailsComponent } from '../../components/fund_details/fund-details-component';

let context: BrowserContext;
let page: Page;

test.describe('Verify Mutual Fund Filter Search and Select Functionality', () => {

    let filtersComponent: FiltersComponent;
    let mutualFundsTableComponent: MutualFundTableComponent;
    let mutualFundSearchComponent: MutualFundSearchComponent;
    let actionBarComponent: ActionBarComponent;
    let tabBarComponent: TabBarComponents;
    let fundDetailsComponent: FundDetailsComponent;

    let fundNames: string[] = [];

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto(Routes.FundResearch);

        filtersComponent = new FiltersComponent(page);
        mutualFundsTableComponent = new MutualFundTableComponent(page);
        mutualFundSearchComponent = new MutualFundSearchComponent(page);
        actionBarComponent = new ActionBarComponent(page);
        tabBarComponent = new TabBarComponents(page);
        fundDetailsComponent = new FundDetailsComponent(page);
    });

    test.beforeEach(async () => {
        await filtersComponent.resetFilters();
        await actionBarComponent.clearAllFunds();
    });

    test('Select fund and verify action bar displayed', async () => {
        await filtersComponent.stockFundButton.click();
        await mutualFundSearchComponent.searchForText('TRBCX');

        // (Optional) you can assert it's hidden here if you want:
        // expect(await actionBarComponent.isVisible()).toBe(false);

        await mutualFundsTableComponent.waitForTable();
        await mutualFundsTableComponent.clickFundCheckbox('TRBCX');

        expect(await actionBarComponent.isVisible()).toBe(true);
    });


    test('Search returns exactly one fund', async () => {
        await filtersComponent.stockFundButton.click();
        await mutualFundSearchComponent.searchForText('TRBCX');

        fundNames = await mutualFundsTableComponent.getFundNames();
        expect(fundNames.length).toBe(1);
    });


    test('Search result matches expected fund name', async () => {
        await filtersComponent.stockFundButton.click();
        await mutualFundSearchComponent.searchForText('blue');

        fundNames = await mutualFundsTableComponent.getFundNames();
        expect(fundNames[0]).toBe('Blue Chip Growth Fund');
    });

    test('The checkbox for TTEEX fund should be disabled', async () => {
        await filtersComponent.stockFundButton.click();
        await filtersComponent.otherAttributeButton.click(); // alias for Other Attributes
        await filtersComponent.iClassCheckBox.click();

        expect(
            await mutualFundsTableComponent.isFundCheckboxDisabled('TTEEX')
        ).toBe(true);
    });


    test('Fund Selected in the action bar should go to 2', async () => {
        await mutualFundSearchComponent.searchForText('TRBCX');
        await mutualFundsTableComponent.clickFundCheckbox('TRBCX');

        await filtersComponent.allocationFundsButton.click();
        await filtersComponent.otherAttributesButton.click();
        await filtersComponent.iClassCheckBox.click();

        await mutualFundSearchComponent.searchForText('PRWCX');
        await mutualFundsTableComponent.clickFundCheckbox('PRWCX');

        expect(await actionBarComponent.getNumberOfSelectedFund()).toBe(2);
    });


    test('Fund Selected in the action bar should go to 3', async () => {
        test.setTimeout(60000);

        // 1st fund
        await mutualFundSearchComponent.searchForText('TRBCX');
        await mutualFundsTableComponent.clickFundCheckbox('TRBCX');

        // 2nd fund
        await mutualFundSearchComponent.clearSearch();
        await mutualFundSearchComponent.searchForText('PRWCX');
        await mutualFundsTableComponent.clickFundCheckbox('PRWCX');

        // 3rd fund (use any visible fund, not a specific ticker)
        await mutualFundSearchComponent.clearSearch(); // show full list

        // pick the 3rd compare checkbox on the current table
        const thirdCheckbox = page.locator('input.compare-checkbox').nth(2);
        await thirdCheckbox.click();

        expect(await actionBarComponent.getNumberOfSelectedFund()).toBe(3);
    });




    test('Test filter and fund selection settings do not change', async () => {
        await tabBarComponent.clickYieldsTab();
        await filtersComponent.stockFundButton.click();
        await mutualFundSearchComponent.searchForText('blue');
        await mutualFundsTableComponent.clickFundCheckbox('TRBCX');
        await filtersComponent.otherAttributesButton.click();
        await filtersComponent.iClassCheckBox.click();
        await filtersComponent.invstorClassCheckBox.click();
    });


    test('4 and 5 star IClass allocation funds only should be displayed', async () => {
        await filtersComponent.allocationFundsButton.click();
        await filtersComponent.morningStarRatingButton.click();
        await filtersComponent.morningStar4and5StarFundsCheckbox.click();

        await filtersComponent.otherAttributesButton.click();
        await filtersComponent.iClassCheckBox.click();
        await filtersComponent.invstorClassCheckBox.click();

        const actual = await mutualFundsTableComponent.getFundNames();

        const expected = [
            'Capital Appreciation Fund - I Class',
            'Spectrum Conservative Allocation Fund - I Class',
        ];

        expectFundsToMatch(expected, actual);
    });


    test('Filter UI should reset and all Investor class funds should show', async () => {
        await filtersComponent.allocationFundsButton.click();
        await filtersComponent.morningStarRatingButton.click();
        await filtersComponent.morningStar4and5StarFundsCheckbox.click();
        await filtersComponent.otherAttributesButton.click();
        await filtersComponent.iClassCheckBox.click();
        await filtersComponent.invstorClassCheckBox.click();

        // reset filters
        await filtersComponent.resetFilters();

        const actual = await mutualFundsTableComponent.getFundNames();

        // basic sanity: we have many funds on screen
        expect(actual.length).toBeGreaterThan(50);

        // a couple of representative Investor funds should be present
        expect(actual).toContain('Blue Chip Growth Fund');
        expect(actual).toContain('Capital Appreciation Fund');
    });

    test('Filter and navigate to details for Target Date 2025 Fund', async () => {
        await filtersComponent.targetDateFundsButton.click();

        const expected = await mutualFundsTableComponent.getFundNames();
        expectFundsToMatch(expected, investorClassTargetDateFunds);

        // open Category → Target Date Allocation nested menu
        await filtersComponent.categoryButton.click();
        await filtersComponent.targetDateAllocationMenuItem.hover();

        const years = [
            '2000-2010',
            '2015',
            '2020',
            '2025',
            '2030',
            '2035',
            '2040',
            '2045',
            '2050',
            '2055',
            '2060',
            '2065',
        ];

        for (const year of years) {
            await expect(
                filtersComponent.targetDateAllocationCheckboxByDate(year)
            ).toBeVisible();
        }

        await filtersComponent.targetDateAllocationCheckboxByDate('2025').click();

        const expectedInvestorClass2025Funds = [
            'Retirement 2025 Fund',
            'Retirement Blend 2025 Fund',
            'Retirement Income 2025 Fund',
            'Target 2025 Fund',
        ];

        const actualInvestorClass2025Funds =
            await mutualFundsTableComponent.getFundNames();
        expectFundsToMatch(
            expectedInvestorClass2025Funds,
            actualInvestorClass2025Funds
        );

        const TRRVXlocator = await mutualFundsTableComponent.findFundByName(
            'Target 2025 Fund'
        );
        await TRRVXlocator.click();

        const title = await fundDetailsComponent.fundTitle.textContent();
        expect(title).toEqual('Target 2025 Fund (TRRVX)');
    });

    test.afterAll(async () => {
        await page.close();
    });

});
