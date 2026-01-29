import test, { BrowserContext, Page } from "@playwright/test";
import { FiltersComponent } from "../../components/FundScreener/FiltersComponent";
import { MutualFundTableComponent } from "../../components/FundScreener/MutualFundTableComponent";
import { Routes } from "../../utils/urls";
import { selectIClassBondFunds, selectInvestorClassBondFunds } from "../../Data/bondfunds";
import { expectFundsToMatch } from "../../Utils/testUtils";

let context: BrowserContext;
let page: Page;

test.describe('Verify Mutual Fund Filter Search and Select Functionality', () => {

    let filtersComponent: FiltersComponent;
    let mutualFundsTableComponent: MutualFundTableComponent;


    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto(Routes.FundResearch);

        filtersComponent = new FiltersComponent(page);
        mutualFundsTableComponent = new MutualFundTableComponent(page);

    });

    test.beforeEach(async () => {
        await filtersComponent.resetFilters();

    });

    test('select iclass and investor class bond fund will be diaplyed', async () => {

        await filtersComponent.bondFundButton.click();
        await filtersComponent.otherAttributeButton.click();
        await filtersComponent.iClassCheckBox.click();
        await filtersComponent.selectFundButton.click();

        const expectedFund = [...selectInvestorClassBondFunds, ...selectIClassBondFunds];
        const actualfunds = await mutualFundsTableComponent.getFundNames();
        expectFundsToMatch(expectedFund, actualfunds);


    });






});