import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';
import { HeaderComponent } from '../pages/components/HeaderComponent';

Given('I am on the login page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.navigateToLogin();
});

When('I login with username {string} and password {string}', async function (this: CustomWorld, username: string, password: string) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(username, password);
});

When('I logout', async function (this: CustomWorld) {
  const header = new HeaderComponent(this.page);
  await header.logout();
});

Then('I should be on the inventory page', async function (this: CustomWorld) {
  await this.page.waitForURL('**/inventory.html');
  assert.ok(this.page.url().includes('/inventory.html'));
});

Then('I should see the error message {string}', async function (this: CustomWorld, expectedMessage: string) {
  const loginPage = new LoginPage(this.page);
  const isVisible = await loginPage.isErrorVisible();
  assert.ok(isVisible, 'Error message should be visible');
  const message = await loginPage.getErrorMessage();
  assert.ok(message.includes(expectedMessage), `Expected "${expectedMessage}" but got "${message}"`);
});

Then('I should be on the login page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  assert.ok(await loginPage.isOnLoginPage());
});
