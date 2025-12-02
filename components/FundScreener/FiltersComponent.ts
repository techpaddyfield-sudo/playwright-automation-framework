import { Locator, Page } from '@playwright/test';

export class FiltersComponent {
    constructor(private page: Page) { }

    // --- Top buttons ---

    get stockFundButton(): Locator {
        return this.page.getByRole('button', { name: /stock funds/i });
    }

    get otherAttributeButton(): Locator {
        return this.page.getByRole('button', { name: /other attributes/i });
    }

    // I Class chip in the top bar
    get iClassButton(): Locator {
        return this.page.locator('#add-filter-chip-i-class');
    }

    // --- Filter options (just use visible text, no containers, no div[...] !) ---

    get invstorClassCheckBox(): Locator {
        return this.page.locator('div.label:has-text("Investor Class")');
    }

    get iClassCheckBox(): Locator {
        return this.page.locator('div.label:has-text("I Class")');
    }

    get taxEfficientCheckbox(): Locator {
        return this.page.locator('div.label:has-text("Tax-Efficient")');
    }

    // --- Reset ---

    get resetButton(): Locator {
        return this.page.locator('.additional button.reset');
    }

    async resetFilters() {
        if (await this.resetButton.isVisible()) {
            await this.resetButton.click();
        }
    }
}
