import { Page, Locator } from '@playwright/test';

export class ActionBarComponent {
    // Locators
    readonly outerWrapper: Locator;
    readonly listCountButton: Locator;
    readonly compareButton: Locator;
    readonly checkoutButton: Locator;
    readonly clearAllFundsButton: Locator;
    readonly fundCloseButton: Locator;
    readonly fundTrayContainer: Locator;
    readonly fundTrayToggle: Locator;
    readonly fundTrayHidden: Locator;
    private fundTags: Locator;
    readonly addToWatchlistButton: Locator;
    readonly addedToWatchlistButton: Locator;
    readonly removeFromWatchlistButton: Locator;

    constructor(private page: Page) {
        this.page = page;

        // Define locators for the elements in the action bar
        this.outerWrapper = page.locator('.outer-wrapper');
        this.listCountButton = page.locator('.list-count');
        this.compareButton = page.locator('.action-bar-button.dark-action-bar');
        this.checkoutButton = page.locator('.action-bar-button.checkout');
        this.clearAllFundsButton = page.locator('.clear-selected-button');
        this.fundCloseButton = page.locator('.fund-tray .close');
        this.fundTrayContainer = page.locator('.fund-tray');
        this.fundTrayToggle = page.locator('button.list-count');
        this.fundTrayHidden = page.locator('.fund-tray.hidden');
        this.fundTags = page.locator('.fund-tray-inner .tag');
        this.addToWatchlistButton = page.locator('button.add-to-watchlist-btn:not(.is-added)');
        this.addedToWatchlistButton = page.locator('button.add-to-watchlist-btn.is-added');
        this.removeFromWatchlistButton = page.locator('.watchlist-remove');
    }

    // -----------------------------
    // Methods
    // -----------------------------

    /** Returns an array of all fund names currently displayed in the tray */
    async getFundNames(): Promise<string[]> {
        const count = await this.fundTags.count();
        const names: string[] = [];

        for (let i = 0; i < count; i++) {
            const fundName = await this.fundTags
                .nth(i)
                .locator('> div > div')
                .nth(0)
                .innerText();

            if (fundName) {
                names.push(fundName.trim());
            }
        }
        return names;
    }

    /** Returns an array of all fund tickers currently displayed in the tray */
    async getFundTickers(): Promise<string[]> {
        // ensure tray is open
        if (!(await this.isOpen())) await this.open();

        await this.fundTrayContainer.waitFor({ state: 'visible', timeout: 10000 });
        await this.page.waitForTimeout(500); // small buffer for render

        const tickers: string[] = [];
        const tagCount = await this.fundTags.count();

        for (let i = 0; i < tagCount; i++) {
            const tag = this.fundTags.nth(i);
            const tickerText =
                (await tag.locator('.ticker, .fund-title-ticker').first().textContent())?.trim() || '';
            if (tickerText) tickers.push(tickerText);
        }

        return tickers;
    }

    /** Determines if the action bar is visible (on Watchlist or Fund Screener page) */
    async isVisible(): Promise<boolean> {
        // If on watchlist page
        if (this.page.url().includes('watchlist')) {
            const actionBar = this.page.locator('.action-bar');
            return !(await actionBar.evaluate(
                (el) => getComputedStyle(el.parentElement!).display === 'none'
            ));
        } else {
            // If on fund screener page
            const hasHiddenClass = await this.outerWrapper.evaluate((element) =>
                element.classList.contains('hidden')
            );
            const isActuallyVisible = await this.outerWrapper.isVisible();
            return !hasHiddenClass && isActuallyVisible;
        }
    }

    /** Checks if the fund tray is open */
    async isOpen(): Promise<boolean> {
        return (await this.fundTrayHidden.count()) === 0;
    }

    /** Opens the fund tray if it’s not already open */
    async open(): Promise<void> {
        if (!(await this.isOpen())) {
            await this.fundTrayToggle.click();
        }
    }

    /** Clears all funds (if visible and applicable) */
    async clearAllFunds(): Promise<void> {
        if (await this.isVisible()) {
            // If on fund screener page
            if (!this.page.url().includes('watchlist')) {
                await this.open();
            }
            await this.clearAllFundsButton.click();
        }
    }

    // Inside ActionBarComponent

    async closeFundByProperty(selector: string, name: string): Promise<void> {
        const fundTags = this.fundTags;
        const fundCount = await fundTags.count();
        let fundFound = false;

        for (let i = 0; i < fundCount; i++) {
            const currentTag = fundTags.nth(i);
            const nameString = (await currentTag.locator(selector).first().textContent())?.trim() ?? '';

            if (nameString === name.trim()) {
                const closeButton = currentTag.locator('button');
                await closeButton.click();
                fundFound = true;
                return;
            }
        }

        if (!fundFound) {
            throw new Error(`Fund with ${selector} = "${name}" not found.`);
        }
    }

    async closeFundByName(fundName: string): Promise<void> {
        // Refined locator for the fund name block inside each tag
        await this.closeFundByProperty('div>div', fundName);
    }

    async closeFundByTicker(fundTicker: string): Promise<void> {
        // Locator for the ticker remains the same
        await this.closeFundByProperty('.ticker', fundTicker);
    }

    async getNumberOfSelectedFund(): Promise<number> {
        const text = await this.listCountButton.textContent();
        const match = text?.match(/(\d+) Fund/);
        return match ? parseInt(match[1], 10) : 0;

    }





}
