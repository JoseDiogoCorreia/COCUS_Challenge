import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';
import { ProductListPage } from '../pages/ProductListPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';

Given('I am logged in', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.navigateToLogin();
  const username = process.env.TEST_USER_EMAIL || 'standard_user';
  const password = process.env.TEST_USER_PASSWORD || 'secret_sauce';
  await loginPage.login(username, password);
  await this.page.waitForURL('**/inventory.html');
});

When('I select the first product', async function (this: CustomWorld) {
  const plp = new ProductListPage(this.page);
  await plp.selectProduct(0);
});

When('I sort products by {string}', async function (this: CustomWorld, sortOption: string) {
  const plp = new ProductListPage(this.page);
  await plp.sortBy(sortOption);
});

Then('I should see at least 1 product displayed', async function (this: CustomWorld) {
  const plp = new ProductListPage(this.page);
  const count = await plp.getProductCount();
  assert.ok(count >= 1, `Expected at least 1 product, found ${count}`);
});

Then('each product should show a name and price', async function (this: CustomWorld) {
  const plp = new ProductListPage(this.page);
  const products = await plp.getProducts();
  for (const product of products) {
    assert.ok(product.name.length > 0, 'Product name should not be empty');
    assert.ok(product.price.length > 0, 'Product price should not be empty');
  }
});

Then('I should see the product name', async function (this: CustomWorld) {
  const pdp = new ProductDetailPage(this.page);
  const details = await pdp.getProductDetails();
  assert.ok(details.name.length > 0);
});

Then('I should see the product price', async function (this: CustomWorld) {
  const pdp = new ProductDetailPage(this.page);
  const details = await pdp.getProductDetails();
  assert.ok(details.price.length > 0);
});

Then('I should see the product description', async function (this: CustomWorld) {
  const pdp = new ProductDetailPage(this.page);
  const details = await pdp.getProductDetails();
  assert.ok(details.description.length > 0);
});

Then('I should see the product image', async function (this: CustomWorld) {
  const pdp = new ProductDetailPage(this.page);
  assert.ok(await pdp.hasImage());
});

Then('the products should be sorted by price ascending', async function (this: CustomWorld) {
  const plp = new ProductListPage(this.page);
  const prices = await plp.getProductPrices();
  for (let i = 1; i < prices.length; i++) {
    assert.ok(prices[i] >= prices[i - 1], `Sort broken at index ${i}: ${prices[i]} < ${prices[i-1]}`);
  }
});

Then('the products should be sorted by name ascending', async function (this: CustomWorld) {
  const plp = new ProductListPage(this.page);
  const products = await plp.getProducts();
  const names = products.map(p => p.name);
  const sorted = [...names].sort();
  assert.deepStrictEqual(names, sorted);
});
