import { Locator, Page, expect } from "@playwright/test";

/**
 * Minimal component for the "Market Data" section.
 * Locates the section by its heading text and then grabs the first
 * non-empty element that follows each label.
 */
export class MarketDataSection {
    private root: Locator;

    constructor(private page: Page) {
        // section container nearest to the "Market Data" heading
        this.root = page
            .getByRole("heading", { name: /^Market Data$/i })
            .locator('xpath=ancestor::*[self::section or self::div][1]');
    }

    async isVisible(): Promise<boolean> {
        await this.root.first().waitFor({ state: "visible" });
        return this.root.isVisible();
    }

    /** generic "value next to label" finder */
    private valueFor(label: string): Locator {
        // find the label node, then take the first following texty element
        return this.root
            .locator(`xpath=.//*[normalize-space(text())='${label}']`)
            .first()
            .locator(
                "xpath=following::*[self::span or self::div or self::td or self::dd][normalize-space()][1]"
            );
    }

    totalNetAssets(): Locator {
        return this.valueFor("Total Net Assets");
    }

    premiumDiscountToNav(): Locator {
        return this.valueFor("Premium/Discount to NAV");
    }

    dailyTradingVolumes(): Locator {
        return this.valueFor("Daily Trading Volumes (Shares)");
    }

    // convenience text getters (kept tiny for atomic tests)
    async totalNetAssetsText(): Promise<string> {
        return (await this.totalNetAssets().innerText()).trim();
    }
    async premiumDiscountText(): Promise<string> {
        return (await this.premiumDiscountToNav().innerText()).trim();
    }
    async dailyTradingVolumesText(): Promise<string> {
        return (await this.dailyTradingVolumes().innerText()).trim();
    }
}
