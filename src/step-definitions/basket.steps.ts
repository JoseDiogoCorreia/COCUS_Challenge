import { When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { CustomWorld } from '../support/world';
import { ProductListPage } from '../pages/ProductListPage';
import { BasketPage } from '../pages/BasketPage';
import { HeaderComponent } from '../pages/components/HeaderComponent';

When('I add the first product to the cart', async function (this: CustomWorld) {
  const plp = new ProductListPage(this.page);
  const products = await plp.getProducts();
  this.lastProductName = products[0].name;
  await plp.addProductToCart(0);
});

When('I add the second product to the cart', async function (this: CustomWorld) {
  const plp = new ProductListPage(this.page);
  await plp.addProductToCart(1);
});

When('I navigate to the cart', async function (this: CustomWorld) {
  const basket = new BasketPage(this.page);
  await basket.navigateToCart();
});

When('I remove the product from the cart', async function (this: CustomWorld) {
  const basket = new BasketPage(this.page);
  await basket.removeItem(this.lastProductName);
});

Then('the cart badge should show {int} item(s)', async function (this: CustomWorld, expectedCount: number) {
  const header = new HeaderComponent(this.page);
  const count = await header.getCartBadgeCount();
  assert.strictEqual(count, expectedCount, `Expected cart badge ${expectedCount}, got ${count}`);
});

Then('the cart should display the product name', async function (this: CustomWorld) {
  const basket = new BasketPage(this.page);
  const items = await basket.getItems();
  assert.ok(items.length > 0, 'Cart is empty');
  assert.ok(items.some(item => item.name === this.lastProductName), `Product "${this.lastProductName}" not found in cart`);
});

Then('the cart should display the correct quantity', async function (this: CustomWorld) {
  const basket = new BasketPage(this.page);
  const items = await basket.getItems();
  const item = items.find(i => i.name === this.lastProductName);
  assert.ok(item, 'Product not found in cart');
  assert.strictEqual(item.quantity, 1);
});

Then('the cart should be empty', async function (this: CustomWorld) {
  const basket = new BasketPage(this.page);
  assert.ok(await basket.isEmpty());
});
