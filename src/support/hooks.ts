import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser } from 'playwright';
import { CustomWorld } from './world';


setDefaultTimeout(30000);

let browser: Browser;

BeforeAll(async function () {
  browser = await chromium.launch({
    headless: process.env.HEADLESS !== 'false',
  });
});

Before(async function (this: CustomWorld) {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await this.page.screenshot();
    this.attach(screenshot, 'image/png');
  }
  await this.context.close();
});

AfterAll(async function () {
  await browser.close();
});
