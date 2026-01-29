import { Locator, Page } from '@playwright/test';

export class FiltersComponent {
    constructor(private page: Page) { }

    // --- Top buttons ---

    get selectFundButton(): Locator {
        return this.page.getByRole('button', { name: /select funds/i });
    }

    get stockFundButton(): Locator {
        return this.page.getByRole('button', { name: /stock funds/i });
    }
    get bondFundButton(): Locator {
        return this.page.getByRole('button', { name: /Bond funds/i });
    }


    get allocationFundsButton(): Locator {
        return this.page.getByRole('button', { name: /allocation funds/i });
    }

    get targetDateFundsButton(): Locator {
        return this.page.getByRole('button', { name: /target date funds/i });
    }

    get categoryButton(): Locator {
        return this.page.getByRole('button', { name: /category/i });
    }

    get morningStarRatingButton(): Locator {
        return this.page.getByRole('button', { name: /morningstar rating/i });
    }

    get otherAttributesButton(): Locator {
        return this.page.getByRole('button', { name: /other attributes/i });
    }

    // 👇 alias to keep old test code working (otherAttributeButton)
    get otherAttributeButton(): Locator {
        return this.otherAttributesButton;
    }

    // I Class chip in the top bar
    get iClassButton(): Locator {
        return this.page.locator('#add-filter-chip-i-class');
    }




    // --- Filter options ---

    get invstorClassCheckBox(): Locator {
        return this.page.locator('div.label:has-text("Investor Class")');
    }

    get iClassCheckBox(): Locator {
        return this.page.locator('div.label:has-text("I Class")');
    }

    get taxEfficientCheckbox(): Locator {
        return this.page.locator('div.label:has-text("Tax-Efficient")');
    }

    // ⭐ Morningstar: "4- and 5-star Funds"
    get morningStar4and5StarFundsCheckbox(): Locator {
        return this.page.getByRole('menuitemcheckbox', {
            name: /4- and 5-star funds/i,
        });
    }

    // ⭐ Category → "Target Date Allocation" row in first column
    get targetDateAllocationMenuItem(): Locator {
        return this.page.locator('div.label:has-text("Target Date Allocation")');
    }

    // ⭐ Target-Date yyyy / yyyy-yyyy options inside nested menu
    targetDateAllocationCheckboxByDate(year: string): Locator {
        // e.g. "Target-Date 2000-2010", "Target-Date 2025", "Target-Date 2065+"
        return this.page.getByRole('menuitemcheckbox', {
            name: new RegExp(`Target-Date\\s*${year}`, 'i'),
        });
    }

    // --- Reset ---

    get resetButton(): Locator {
        return this.page.locator('.additional button.reset');
    }

    async resetFilters(): Promise<void> {
        if (await this.resetButton.isVisible()) {
            await this.resetButton.click();
        }
    }
}
