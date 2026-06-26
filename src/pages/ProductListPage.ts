import { Page, Locator } from 'playwright';
import { BasePage } from './BasePage';

export interface ProductListItem {
  name: string;
  price: string;
}

export class ProductListPage extends BasePage {
  private readonly productItems: Locator;
  private readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.productItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async getProducts(): Promise<ProductListItem[]> {
    const items = await this.productItems.all();
    const products: ProductListItem[] = [];

    for (const item of items) {
      const name = (await item.locator('.inventory_item_name').textContent()) || '';
      const price = (await item.locator('.inventory_item_price').textContent()) || '';
      products.push({ name: name.trim(), price: price.trim() });
    }
    return products;
  }

  async getProductCount(): Promise<number> {
    return this.productItems.count();
  }

  async selectProduct(index: number): Promise<void> {
    const item = this.productItems.nth(index);
    await item.locator('.inventory_item_name').click();
  }

  async sortBy(option: string): Promise<void> {
    await this.sortDropdown.selectOption({ label: option });
  }

  async getProductPrices(): Promise<number[]> {
    const items = await this.productItems.all();
    const prices: number[] = [];
    for (const item of items) {
      const priceText = (await item.locator('.inventory_item_price').textContent()) || '';
      prices.push(parseFloat(priceText.replace('$', '')));
    }
    return prices;
  }

  async addProductToCart(index: number): Promise<void> {
    const item = this.productItems.nth(index);
    await item.locator('button:has-text("Add to cart")').click();
  }
}
