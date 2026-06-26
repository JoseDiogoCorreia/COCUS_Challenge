import { Page } from 'playwright';
import 'dotenv/config';

export abstract class BasePage {
  protected readonly page: Page;
  protected readonly baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://www.saucedemo.com';
  }

  async navigate(path: string): Promise<void> {
    await this.page.goto(`${this.baseUrl}${path}`, { waitUntil: 'domcontentloaded' });
  }

  get currentUrl(): string {
    return this.page.url();
  }
}
