import { test, expect, BrowserContext, Page } from '@playwright/test';
import { FiltersComponent } from '../../components/FundScreener/FiltersComponent';
import { MutualFundTableComponent } from '../../components/FundScreener/MutualFundTableComponent';
import { MutualFundSearchComponent } from '../../components/FundScreener/search-components';
import { ActionBarComponent } from '../../components/FundScreener/ActionBarcomponents';
import { baseUrls, generateUrls } from '../../Utils/urls';
import { WarningModelComponent } from '../../components/FundScreener/warning-model-componenent';

let context: BrowserContext;
let page: Page;

test.describe('verify fund actions', () => {
    test.setTimeout(120_000);            // more time for the suite
    test.slow();                         // optional (marks the tests as slow)

    let filtersComponent: FiltersComponent;
    let table: MutualFundTableComponent;
    let search: MutualFundSearchComponent;
    let actionBar: ActionBarComponent;
    let model: WarningModelComponent;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();

        filtersComponent = new FiltersComponent(page);
        table = new MutualFundTableComponent(page);
        search = new MutualFundSearchComponent(page);
        actionBar = new ActionBarComponent(page);
        model = new WarningModelComponent(page);

        const urls = generateUrls(baseUrls.prod);
        await page.goto(urls.fundResearch, { waitUntil: 'domcontentloaded', timeout: 60_000 });

        // Wait for the grid to be present before any actions (keeps beforeAll light)
        await expect(page.locator('[ref="gridPanel"]')).toBeVisible({ timeout: 30_000 });
    });

    test.afterAll(async () => {
        await context.close();
    });

    test('addthe funds ', async () => {
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
        await search.clearSearch();


    });


    test('filter for tax Efficient Equitty funds', async () => {
        await filtersComponent.stockFundButton.click();
        await filtersComponent.otherAttributeButton.click();
        await filtersComponent.invstorClassCheckBox.click();
        await filtersComponent.iClassCheckBox.click();
        await filtersComponent.taxEfficientCheckbox.click();
        let tax = await table.getFundNames();
        expect(tax).toEqual(
            ["Tax-Efficient Equity Fund", "Tax-Efficient Equity Fund - I Class"]);

    });

    test('verify total of 4 funds selected', async () => {

        await table.clickFundCheckbox('PREFX');
        expect(await actionBar.getNumberOfSelectedFund()).toEqual(4);
    });

    test('verify the fund tickers ', async () => {

        expect(await actionBar.getFundTickers()).toEqual
            (expect.arrayContaining(
                ["TRBCX", "TRAIX", "PPIPX", "PREFX"]
            ));


    });
    test.describe('verify the fund comparison warning model ', async () => {

        test.beforeAll(async ({ browser }) => {

            await actionBar.compareButton.click();
            await model.waitForModel();


        });

        test('Displayed', async () => {

            expect(await model.isModalVisible()).toBe(true);
            await page.waitForTimeout(5000);
        });

        test('Has correct  title', async () => {

            expect(await model.getTitle()).toEqual("You’ve exceeded the maximum number of funds to compare.");

        });

        test('Has correct message', async () => {
            expect(await model.getMessage()).toEqual("Select three or fewer funds to compare. There is no limit to the number of funds you can checkout.")



        });

        test('close', async () => {

            await model.closeModal();
            expect(await model.isModalVisible()).toEqual(false);

        });

    });






});