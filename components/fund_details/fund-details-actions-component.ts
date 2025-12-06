import { Locator, Page } from '@playwright/test';

export class FundDetailsActionsComponent {
    readonly buyNowButton: Locator;
    readonly compareButton: Locator;
    readonly addToWatchlistButton: Locator;
    readonly viewProspectusLink: Locator;
    readonly addedToWatchlistButton: Locator;
    readonly addedToWatchlistToast: Locator;

    constructor(private page: Page) {
        this.buyNowButton = page.locator('button:text("Buy Now")');
        this.compareButton = page.locator('button:text("Compare")');
        this.addToWatchlistButton = page.locator('button:has-text("Add To Watchlist")');
        this.viewProspectusLink = page.locator(
            'a.snapshot-prospectus-link:has-text("View Prospectus")'
        );
        this.addedToWatchlistButton = page.locator(
            'button:has-text("Added To Watchlist")'
        );
        this.addedToWatchlistToast = page.locator('.toast-container.show');
    }
}
//   // ---- actions (no expects here) ----
//   async clickBuyNow() {
//     await this.buyNowButton.click();
//   }

//   async clickCompare() {
//     await this.compareButton.click();
//   }

//   async clickAddToWatchlist() {
//     await this.addToWatchlistButton.click();
//   }

//   async clickViewProspectus() {
//     await this.viewProspectusLink.click();
//   }

//   async isAddedToastVisible(): Promise<boolean> {
//     return this.addedToWatchlistToast.isVisible();
//   }
// }
