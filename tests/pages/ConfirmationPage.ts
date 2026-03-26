import { Page, expect } from '@playwright/test';

export class ConfirmationPage {
  readonly page: Page;
  private readonly backHomeButton = 'button:has-text("Back Home")';
  readonly confirmationUrl = 'https://www.saucedemo.com/checkout-complete.html';

  constructor(page: Page) {
    this.page = page;
  }

  async verifyConfirmationPageUrl() {
    await expect(this.page).toHaveURL(this.confirmationUrl);
  }

  async verifyThankYouMessage() {
    await expect(this.page.getByText('Thank you for your order!')).toBeVisible();
  }

  async verifyOrderConfirmationTitle() {
    await expect(this.page.getByText('Checkout: Complete!')).toBeVisible();
  }

  async verifyConfirmationVisible() {
    await this.verifyOrderConfirmationTitle();
    await this.verifyThankYouMessage();
  }

  async clickBackHome() {
    await this.page.locator(this.backHomeButton).click();
  }
}
