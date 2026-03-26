import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  private readonly firstNameInput = '[data-test="firstName"]';
  private readonly lastNameInput = '[data-test="lastName"]';
  private readonly postalCodeInput = '[data-test="postalCode"]';
  private readonly continueButton = '[data-test="continue"]';
  private readonly cancelButton = '[data-test="cancel"]';
  private readonly finishButton = '[data-test="finish"]';
  private readonly errorMessage = '[data-test="error"]';
  readonly checkoutStepOneUrl = 'https://www.saucedemo.com/checkout-step-one.html';
  readonly checkoutStepTwoUrl = 'https://www.saucedemo.com/checkout-step-two.html';

  constructor(page: Page) {
    this.page = page;
  }

  async verifyCheckoutPageStepOne() {
    await expect(this.page.getByText('Checkout: Your Information')).toBeVisible();
  }

  async verifyCheckoutPageStepTwo() {
    await expect(this.page.getByText('Checkout: Overview')).toBeVisible();
  }

  async fillCustomerInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.locator(this.firstNameInput).fill(firstName);
    await this.page.locator(this.lastNameInput).fill(lastName);
    await this.page.locator(this.postalCodeInput).fill(postalCode);
  }

  async verifyFirstNameValue(firstName: string) {
    await expect(this.page.locator(this.firstNameInput)).toHaveValue(firstName);
  }

  async verifyLastNameValue(lastName: string) {
    await expect(this.page.locator(this.lastNameInput)).toHaveValue(lastName);
  }

  async verifyPostalCodeValue(postalCode: string) {
    await expect(this.page.locator(this.postalCodeInput)).toHaveValue(postalCode);
  }

  async clickContinue() {
    await this.page.locator(this.continueButton).click();
  }

  async clickCancel() {
    await this.page.locator(this.cancelButton).click();
  }

  async clickFinish() {
    await this.page.locator(this.finishButton).click();
  }

  async fillAndContinue(firstName: string, lastName: string, postalCode: string) {
    await this.fillCustomerInfo(firstName, lastName, postalCode);
    await this.clickContinue();
  }

  async verifyErrorMessage(errorText: string) {
    await expect(this.page.getByText(errorText)).toBeVisible();
  }

  async verifyPaymentInformationVisible() {
    await expect(this.page.getByText('Payment Information')).toBeVisible();
  }

  async verifyShippingInformationVisible() {
    await expect(this.page.getByText('Shipping Information')).toBeVisible();
  }

  async verifyBothInformationSections() {
    await this.verifyPaymentInformationVisible();
    await this.verifyShippingInformationVisible();
  }
}
