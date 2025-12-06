import { Page, Locator } from '@playwright/test';

export class ShareClassComponent {
    private readonly shareClassSelect: Locator;

    constructor(private page: Page) {
        this.shareClassSelect = page.locator('.select-snapshot');
    }

    // Select "Investor" share class if not already selected
    async selectInvestorClass(): Promise<void> {
        const selectedLabel = await this.getSelectedLabel();
        if (selectedLabel !== 'Investor') {
            await this.shareClassSelect.selectOption({ label: 'Investor' });
        }
    }

    // Select "I Class" share class if not already selected
    async selectIClass(): Promise<void> {
        const selectedLabel = await this.getSelectedLabel();
        if (selectedLabel !== 'I Class') {
            await this.shareClassSelect.selectOption({ label: 'I Class' });
        }
    }

    // ----- private helpers -----
    private async getSelectedLabel(): Promise<string> {
        return await this.shareClassSelect
            .locator('option:checked')
            .innerText();
    }
}
