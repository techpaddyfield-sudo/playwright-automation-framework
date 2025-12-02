import { Locator, Page } from '@playwright/test';

export class WarningModalComponent {

    private page: Page;
    private modal: Locator;
    private closeButton: Locator;
    private title: Locator;
    private message: Locator;

    constructor(page: Page) {
        this.page = page;
        this.modal = page.locator('.warning-modal');
        this.closeButton = this.modal.locator('.close-btn');
        this.title = this.modal.locator('.title');
        this.message = this.modal.locator('p');
    }

    async waitForModal() {
        await this.modal.waitFor({ state: 'visible' });
    }

    async closeModal() {
        await this.closeButton.click();
    }

    async isModalVisible() {

        return await this.modal.isVisible();
    }

    async getTitle() {
        return await this.title.textContent();
    }

    async getMessage() {
        return await this.message.textContent();
    }




}