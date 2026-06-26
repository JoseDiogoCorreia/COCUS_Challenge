import { Page, Locator } from 'playwright';
import { BasePage } from './BasePage';

export interface CartItem {
  name: string;
  quantity: number;
  price: string;
}

export class BasketPage extends BasePage {
  private readonly cartItems: Locator;
  private readonly cartBadge: Locator;
  private readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('.cart_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async navigateToCart(): Promise<void> {
    await this.page.locator('.shopping_cart_link').click();
  }

  async getItems(): Promise<CartItem[]> {
    const items = await this.cartItems.all();
    const cartItems: CartItem[] = [];

    for (const item of items) {
      const name = (await item.locator('.inventory_item_name').textContent()) || '';
      const qtyText = (await item.locator('.cart_quantity').textContent()) || '1';
      const price = (await item.locator('.inventory_item_price').textContent()) || '';
      cartItems.push({
        name: name.trim(),
        quantity: parseInt(qtyText.trim(), 10),
        price: price.trim(),
      });
    }
    return cartItems;
  }

  async getItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async removeItem(productName: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: productName });
    await item.locator('button:has-text("Remove")').click();
  }

  async getBadgeCount(): Promise<number> {
    try {
      const text = await this.cartBadge.textContent({ timeout: 3000 });
      return parseInt(text || '0', 10);
    } catch {
      return 0;
    }
  }

  async isEmpty(): Promise<boolean> {
    return (await this.cartItems.count()) === 0;
  }
}
