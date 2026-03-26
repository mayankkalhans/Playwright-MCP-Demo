import { Page, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  private readonly productSortContainer = '[data-test="product-sort-container"]';
  private readonly shoppingCartLink = '[data-test="shopping-cart-link"]';
  private readonly shoppingCartBadge = '[data-test="shopping-cart-badge"]';
  private readonly menuButton = '#react-burger-menu-btn';
  private readonly logoutLink = '[data-test="logout-sidebar-link"]';
  private readonly resetLink = '[data-test="reset-sidebar-link"]';
  private readonly allItemsLink = 'a[href="#inventory"]';
  readonly inventoryUrl = 'https://www.saucedemo.com/inventory.html';

  constructor(page: Page) {
    this.page = page;
  }

  async verifyInventoryPageUrl() {
    await expect(this.page).toHaveURL(this.inventoryUrl);
  }

  async verifyProductsVisible() {
    await expect(this.page.getByText('Products')).toBeVisible();
  }

  async verifyAllProductsVisible() {
    await expect(this.page.locator('[data-test="inventory-item-name"]', { hasText: 'Sauce Labs Backpack' })).toBeVisible();
    await expect(this.page.locator('[data-test="inventory-item-name"]', { hasText: 'Sauce Labs Bike Light' })).toBeVisible();
    await expect(this.page.locator('[data-test="inventory-item-name"]', { hasText: 'Sauce Labs Bolt T-Shirt' })).toBeVisible();
    await expect(this.page.locator('[data-test="inventory-item-name"]', { hasText: 'Sauce Labs Fleece Jacket' })).toBeVisible();
    await expect(this.page.locator('[data-test="inventory-item-name"]', { hasText: 'Sauce Labs Onesie' })).toBeVisible();
    await expect(this.page.locator('[data-test="inventory-item-name"]', { hasText: 'Test.allTheThings() T-Shirt (Red)' })).toBeVisible();
  }

  async sortByNameAZ() {
    await this.page.locator(this.productSortContainer).selectOption(['Name (A to Z)']);
  }

  async sortByNameZA() {
    await this.page.locator(this.productSortContainer).selectOption(['Name (Z to A)']);
  }

  async sortByPriceLowHigh() {
    await this.page.locator(this.productSortContainer).selectOption(['Price (low to high)']);
  }

  async sortByPriceHighLow() {
    await this.page.locator(this.productSortContainer).selectOption(['Price (high to low)']);
  }

  async openProductDetail(productName: string) {
    await this.page.getByRole('link', { name: productName }).first().click();
  }

  async addProductToCart(productDataTestId: string) {
    await this.page.locator(`[data-test="add-to-cart-${productDataTestId}"]`).click();
  }

  async removeProductFromCart(productDataTestId: string) {
    await this.page.locator(`[data-test="remove-${productDataTestId}"]`).click();
  }

  async verifyCartCount(count: number) {
    await expect(this.page.locator(this.shoppingCartBadge)).toHaveText(count.toString());
  }

  async verifyCartBadgeNotVisible() {
    await expect(this.page.locator(this.shoppingCartBadge)).not.toBeVisible();
  }

  async verifyProductVisible(productName: string) {
    await expect(this.page.getByText(productName)).toBeVisible();
  }

  async openCart() {
    await this.page.locator(this.shoppingCartLink).click();
  }

  async isMenuOpen() {
    return await this.page.locator(this.logoutLink).isVisible();
  }

  async openMenu() {
    if (await this.isMenuOpen()) {
      return;
    }
    await this.page.locator(this.menuButton).click();
    await expect(this.page.locator(this.logoutLink)).toBeVisible();
  }

  async logout() {
    await this.openMenu();
    await this.page.locator(this.logoutLink).evaluate((el: HTMLElement) => el.click());
  }

  async resetAppState() {
    await this.openMenu();
    await this.page.locator(this.resetLink).evaluate((el: HTMLElement) => el.click());
  }

  async navigateToAllItems() {
    await this.openMenu();
    await this.page.locator('[data-test="inventory-sidebar-link"]').evaluate((el: HTMLElement) => el.click());
  }

  async verifyProductPrice(productName: string, price: string) {
    const productSection = this.page.locator('div').filter({ 
      has: this.page.getByText(productName) 
    }).first();
    await expect(productSection.getByText(price)).toBeVisible();
  }
}
