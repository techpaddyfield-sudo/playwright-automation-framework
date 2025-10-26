// import { test, expect, BrowserContext, Page } from '@playwright/test';
// import { FiltersComponent } from '../components/FundScreener/FiltersComponent';
// import { MutualFundTableComponent } from '../components/FundScreener/MutualFundTableComponent';
// import { baseUrls, generateUrls, Routes } from '../Utils/urls';
// import { MutualFundSearchComponent } from '../components/FundScreener/search-components';
// import { ActionBarComponent } from '../components/FundScreener/ActionBarcomponents';

// let context: BrowserContext;
// let page: Page;
// test.describe('verify fund actions', () => {

//     let filtersComponent: FiltersComponent;
//     let mutualFundTableComponent: MutualFundTableComponent;
//     let mutualFundSearchComponent: MutualFundSearchComponent;
//     let actionBarComponent: ActionBarComponent;

//     test.beforeAll(async ({ browser }) => {
//         context = await browser.newContext();
//         page = await context.newPage();
//         filtersComponent = new FiltersComponent(page);
//         mutualFundTableComponent = new MutualFundTableComponent(page);
//         mutualFundSearchComponent = new MutualFundSearchComponent(page);
//         actionBarComponent = new ActionBarComponent(page);
//         const urls = generateUrls(baseUrls.prod);
//         await page.goto(urls.fundResearch);

//         await filtersComponent.iClassButton.click();
//         await mutualFundSearchComponent.searchForText('TRBCX');
//         await mutualFundTableComponent.clickFundCheckbox('TRBCX');
//         await mutualFundSearchComponent.searchForText('TRAIX');
//         await mutualFundTableComponent.clickFundCheckbox('TRAIX');
//         await mutualFundSearchComponent.searchForText('PPIPX');
//         await mutualFundTableComponent.clickFundCheckbox('PPIPX');
//         await filtersComponent.stockFundButton.click();
//         await filtersComponent.otherAttributeButton.click();
//         await filtersComponent.invstorClassCheckBox.click();
//         await filtersComponent.taxEfficientCheckbox.click();
//         await mutualFundTableComponent.clickFundCheckbox('PREFX');

//     });

//     test.afterAll(async () => {
//         await context.close();
//     });

//     test('click the "X" next to "Blue chip growth fund , fund removed from the delected funds"', async () => {

//         await actionBarComponent.open();
//         await actionBarComponent.closeFundByName('Blue Chip Growth Fund');

//     });

//     test(' 3 funds are adddto the action bar', async () => {

//         expect(await actionBarComponent.getNumberOfSelectedFund()).toEqual(3);
//     });


// });

// tests/add-funds-tocompare.spec.ts
import { test, expect, BrowserContext, Page } from '@playwright/test';
import { FiltersComponent } from '../../components/FundScreener/FiltersComponent';
import { MutualFundTableComponent } from '../../components/FundScreener/MutualFundTableComponent';
import { MutualFundSearchComponent } from '../../components/FundScreener/search-components';
import { ActionBarComponent } from '../../components/FundScreener/ActionBarcomponents';
import { baseUrls, generateUrls } from '../../Utils/urls';

let context: BrowserContext;
let page: Page;

test.describe('verify fund actions', () => {
    test.setTimeout(120_000);            // more time for the suite
    test.slow();                         // optional (marks the tests as slow)

    let filtersComponent: FiltersComponent;
    let table: MutualFundTableComponent;
    let search: MutualFundSearchComponent;
    let actionBar: ActionBarComponent;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();

        filtersComponent = new FiltersComponent(page);
        table = new MutualFundTableComponent(page);
        search = new MutualFundSearchComponent(page);
        actionBar = new ActionBarComponent(page);

        const urls = generateUrls(baseUrls.prod);
        await page.goto(urls.fundResearch, { waitUntil: 'domcontentloaded', timeout: 60_000 });

        // Wait for the grid to be present before any actions (keeps beforeAll light)
        await expect(page.locator('[ref="gridPanel"]')).toBeVisible({ timeout: 30_000 });
    });

    test.afterAll(async () => {
        await context.close();
    });

    test('click the "X" next to "Blue Chip Growth Fund" removes it from selected funds', async () => {
        // Prepare inside the test (NOT in beforeAll)
        await filtersComponent.iClassButton.click();

        await search.searchForText('TRBCX');
        await expect(page.locator('.ag-row:has(a.title-link[href*="/TRBCX"])')).toBeVisible();
        await table.clickFundCheckbox('TRBCX');

        await search.searchForText('TRAIX');
        await expect(page.locator('.ag-row:has(a.title-link[href*="/TRAIX"])')).toBeVisible();
        await table.clickFundCheckbox('TRAIX');

        await search.searchForText('PPIPX');
        await expect(page.locator('.ag-row:has(a.title-link[href*="/PPIPX"])')).toBeVisible();
        await table.clickFundCheckbox('PPIPX');

        await filtersComponent.stockFundButton.click();
        await filtersComponent.otherAttributeButton.click();
        await filtersComponent.invstorClassCheckBox.click();
        await filtersComponent.taxEfficientCheckbox.click();

        await search.searchForText('PREFX');
        await expect(page.locator('.ag-row:has(a.title-link[href*="/PREFX"])')).toBeVisible();
        await table.clickFundCheckbox('PREFX');

        await actionBar.open();
        await actionBar.closeFundByName('Blue Chip Growth Fund');
    });

    test('3 funds are added to the action bar', async () => {
        await actionBar.open();
        await expect(await actionBar.getNumberOfSelectedFund()).toEqual(3);
    });


    test('Expected selected fund displayed in the action bar', async () => {
        expect(await actionBar.getFundNames()).toEqual(
            expect.arrayContaining([
                'Capital Appreciation Fund - I Class',
                'Spectrum Conservative Allocation Fund - I Class',
                'Tax-Efficient Equity Fund'
            ])
        );
    });

    test('Expected selected fund tickers are displayedin in the action bar', async () => {

        expect(await actionBar.getFundTickers()).toEqual(['PREFX', 'TRAIX', 'PPIPX']);

    });
    test('fund tray close button has "3 Funds selected text"', async () => {

        const actionToggelebuttonText = (await actionBar.fundTrayToggle.innerText()).trim();
        expect(actionToggelebuttonText).toEqual('3 Funds Selected');

    });

    test('close action bar, verify it is closed', async () => {

        await actionBar.fundTrayToggle.click();
        expect(await actionBar.isOpen()).toEqual(false);

    });

    test('The Checkbox for "TRBCX" fund should be unchecked', async () => {
        await filtersComponent.resetFilters();
        expect(await table.isFundChecked('TRBCX')).toBe(false);
    });

    test('open action tray and click compare button', async () => {
        await actionBar.open();
        await actionBar.compareButton.click();
        expect(page.url()).toContain('personal-investing/tools/fund-research/compare');
    });

    test('3 funds shoydl be displayed on compare page', async () => {

        expect(await table.getFundNames()).toEqual([

            'TRAIX - Mutual Fund', 'PREFX - Mutual Fund', 'PREFX - Mutual Fund']);

    });



});


