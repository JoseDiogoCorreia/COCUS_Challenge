import { Page, Locator } from 'playwright';
import { BasePage } from './BasePage';

export interface ProductDetails {
  name: string;
  price: string;
  description: string;
}

export class ProductDetailPage extends BasePage {
  private readonly productName: Locator;
  private readonly productPrice: Locator;
  private readonly productDescription: Locator;
  private readonly productImage: Locator;
  private readonly addToCartButton: Locator;
  private readonly backButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator('.inventory_details_name');
    this.productPrice = page.locator('.inventory_details_price');
    this.productDescription = page.locator('.inventory_details_desc');
    this.productImage = page.locator('.inventory_details_img');
    this.addToCartButton = page.locator('button:has-text("Add to cart")');
    this.backButton = page.locator('[data-test="back-to-products"]');
  }

  async getProductDetails(): Promise<ProductDetails> {
    const name = (await this.productName.textContent()) || '';
    const price = (await this.productPrice.textContent()) || '';
    const description = (await this.productDescription.textContent()) || '';
    return { name: name.trim(), price: price.trim(), description: description.trim() };
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async goBack(): Promise<void> {
    await this.backButton.click();
  }

  async hasImage(): Promise<boolean> {
    return this.productImage.isVisible();
  }
}
