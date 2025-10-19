import { Locator, Page } from "@playwright/test";

export class FiltersComponent {

    private static readonly selectors = {
        filterContainer: '#main-content .filters',
        buttonAriaLabel: (label: string) => `button[aria-label ="Filter for just ${label}"]`,
    };
    private container: Locator;
    private screenerPage: Page;
    constructor(private page: Page) {
        this.screenerPage = page;
        this.container = page.locator(FiltersComponent.selectors.filterContainer);
    }

    getFilterButton(filterName: string): Locator {
        return this.container.locator(FiltersComponent.selectors.buttonAriaLabel(filterName));
    }
    getSubfilterButton(subilterName: string): Locator {
        return this.container.locator(`button[aria-label="Filter by ${subilterName}"]`);
    }
    get stockFundButton(): Locator {
        return this.getFilterButton('Stock Funds');
    }
    get iClassButton(): Locator {
        return this.screenerPage.locator("#add-filter-chip-i-class");
    }
    get allocationFundButton(): Locator {
        return this.getFilterButton('Allocation Funds');
    }
    get bondFundButton(): Locator {
        return this.getFilterButton('Bond Funds');
    }
    get targetFundButton(): Locator {
        return this.getFilterButton("Target Date Funds");

    }
    get otherAttributeButton(): Locator {
        return this.getSubfilterButton('Other Attributes');
    }

    get invstorClassCheckBox() {
        return this.container.locator('#checkbox-filter-investor-class');
    }

    get taxEfficientCheckbox() {
        return this.container.locator('#checkbox-filter-tax-efficient');

    }
}