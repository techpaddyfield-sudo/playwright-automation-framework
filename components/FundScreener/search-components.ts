import { Page, Locator } from "@playwright/test";

export class MutualFundSearchComponent {
    private readonly page: Page;
    private readonly searchInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.getByRole('textbox', { name: 'Search for Mutual Funds' })
    }
    async enterText(text: string): Promise<void> {
        await this.searchInput.fill(text)

    }
    async sendSearch():Promise<void>{
        await this.searchInput.press("Enter");

    }
    async clearSearch():Promise<void>{
        await this.searchInput.fill('');
        
    }
    async searchForText(text:string):Promise<void>{
        await this.enterText(text);
        await this.sendSearch();
    }
    //get the current text from the search box
    async getTextSearch():Promise<string>{
        return await this.searchInput.inputValue();
    }

    async isSearchBoxVisible():Promise<boolean>{
        return this.searchInput.isVisible();
    }

}

