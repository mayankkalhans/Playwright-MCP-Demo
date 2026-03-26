import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  private readonly usernameInput = '[data-test="username"]';
  private readonly passwordInput = '[data-test="password"]';
  private readonly loginButton = '[data-test="login-button"]';
  private readonly errorMessage = '//h3[@data-test="error"]';
  readonly baseUrl = 'https://www.saucedemo.com';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
  }

  async verifyLoginPageVisible() {
    await expect(this.page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(this.page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Login' })).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.page.locator(this.usernameInput).fill(username);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.loginButton).click();
  }

  async verifyUsernameValue(username: string) {
    await expect(this.page.locator(this.usernameInput)).toHaveValue(username);
  }

  async verifyPasswordValue(password: string) {
    await expect(this.page.locator(this.passwordInput)).toHaveValue(password);
  }

  async verifyErrorMessage(errorText: string) {
    await expect(this.page.getByText(errorText)).toBeVisible();
  }

  async loginAndVerifyInventory(username: string, password: string, timeout: number = 5000) {
    await this.login(username, password);
    await expect(this.page.getByText('Products')).toBeVisible({ timeout });
  }
}
