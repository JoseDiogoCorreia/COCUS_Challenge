import { Page, Locator } from 'playwright';
import { BasePage } from '../BasePage';

export class HeaderComponent extends BasePage {
  private readonly menuButton: Locator;
  private readonly logoutLink: Locator;
  private readonly cartLink: Locator;
  private readonly cartBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  async navigateToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async getCartBadgeCount(): Promise<number> {
    try {
      const text = await this.cartBadge.textContent({ timeout: 3000 });
      return parseInt(text || '0', 10);
    } catch {
      return 0;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    // If we can see the menu button, we're logged in (it's only on inventory pages)
    return this.menuButton.isVisible();
  }
}
