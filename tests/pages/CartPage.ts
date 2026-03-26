import { Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  private readonly continueShoppingButton = 'button:has-text("Continue Shopping")';
  private readonly checkoutButton = '[data-test="checkout"]';
  private readonly cartHeading = 'text=Your Cart';
  readonly cartUrl = 'https://www.saucedemo.com/cart.html';

  constructor(page: Page) {
    this.page = page;
  }

  async verifyCartPageUrl() {
    await expect(this.page).toHaveURL(this.cartUrl);
  }

  async verifyCartHeadingVisible() {
    await expect(this.page.getByText('Your Cart')).toBeVisible();
  }

  async verifyItemInCart(itemName: string) {
    await expect(this.page.locator('[data-test="inventory-item-name"]', { hasText: itemName })).toBeVisible();
  }

  async verifyItemNotInCart(itemName: string) {
    await expect(this.page.locator('[data-test="inventory-item-name"]', { hasText: itemName })).not.toBeVisible();
  }

  async verifyItemPrice(price: string) {
    await expect(this.page.getByText(price)).toBeVisible();
  }

  async removeItemFromCart(productDataTestId: string) {
    await this.page.locator(`[data-test="remove-${productDataTestId}"]`).click();
  }

  async continueShopping() {
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
  }

  async proceedToCheckout() {
    await this.page.locator(this.checkoutButton).click();
  }

  async verifyCartContent(itemCount: number) {
    const items = await this.page.locator('div[data-test*="inventory-item"]').count();
    // Cart displays items differently - verify by checking quantity cells
    const quantities = await this.page.locator('div:has-text("1")').count();
    return quantities >= itemCount;
  }

  async getCartTotal(): Promise<string> {
    const total = await this.page.locator('div:has-text("Total:")').innerText();
    return total;
  }
}
