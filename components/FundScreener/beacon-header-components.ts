import { expect, Locator, Page } from '@playwright/test';

export class BeaconHeaderComponent {
    private container: Locator;
    //private expandedPanel: Locator;

    readonly resourcesButton: Locator;
    readonly resourcesMenu: Locator;
    readonly compareFundsLink: Locator;
    readonly myWatchlistLink: Locator;
    readonly viewAllETFsLink: Locator;
    readonly fundsMenuButton: Locator;
    readonly fundsMenu: Locator;

    constructor(private page: Page) {
        // Main container
        this.container = page.locator('ii-wc-beacon-navigation[beacon-tag-name="beacon-navigation"]');

        //     // Visible expanded panel (level 2)
        //    // this.expandedPanel = page.locator(
        //       'ii-wc-beacon-navigation-expanded[beacon-tag-name="beacon-navigation-expanded"][level="2"] >> #expanded-navigation.expanded'
        //     );

        // Buttons
        this.resourcesButton = this.getNavButton('Resources');
        this.fundsMenuButton = this.getNavButton('Funds');

        // Menus
        this.resourcesMenu = this.getNavMenu('Resources');
        this.fundsMenu = this.getNavMenu('Funds');

        // Links (scoped inside visible expanded panel)
        this.compareFundsLink = this.getNavMenuLink('Compare Funds');
        this.myWatchlistLink = this.getNavMenuLink('My Watchlist');
        this.viewAllETFsLink = this.getNavMenuLink('View All ETFs');
    }

    // 🔹 Button selectors
    private getNavButton(name: string): Locator {
        return this.container.locator(`ii-wc-beacon-navigation-button[opens="${name}"] >> button`);
    }

    // 🔹 Menu selector
    private getNavMenu(name: string): Locator {
        return this.page.locator(`ii-wc-beacon-navigation-expanded[beacon-tag-name="beacon-navigation-expanded"]`).getByText(name);
    }

    // 🔹 Link inside the *open* expanded panel
    private getNavMenuLink(name: string): Locator {

        return this.page.locator('ii-wc-beacon-navigation-expanded').getByText(name);
    }
}