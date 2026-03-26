import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { testData } from '../fixtures/testData';

test.describe('Product Interactions', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.navigate();
    
    const { username, password } = testData.users.standard;
    await loginPage.loginAndVerifyInventory(username, password);
  });

  test('should display all 6 products', async () => {
    await inventoryPage.verifyAllProductsVisible();
  });

  test('should sort products by name A to Z', async () => {
    await inventoryPage.sortByNameAZ();
    const firstProduct = await inventoryPage.page.locator('div[data-test*="inventory-item"]').first().innerText();
    expect(firstProduct).toContain('Backpack');
  });

  test('should sort products by name Z to A', async () => {
    await inventoryPage.sortByNameZA();
    const firstProduct = await inventoryPage.page.locator('div[data-test*="inventory-item"]').first().innerText();
    expect(firstProduct).toContain('Test.allTheThings()');
  });

  test('should sort products by price low to high', async () => {
    await inventoryPage.sortByPriceLowHigh();
    await inventoryPage.verifyProductVisible('Sauce Labs Onesie');
  });

  test('should sort products by price high to low', async () => {
    await inventoryPage.sortByPriceHighLow();
    await inventoryPage.verifyProductVisible('Sauce Labs Fleece Jacket');
  });

  test('should open product detail page', async () => {
    const { name, price } = testData.products.backpack;
    await inventoryPage.openProductDetail(name);
    
    await expect(inventoryPage.page.getByText(name)).toBeVisible();
    await expect(inventoryPage.page.getByText(price)).toBeVisible();
  });

  test('should add product to cart from inventory', async () => {
    const { dataTestId } = testData.products.backpack;
    await inventoryPage.addProductToCart(dataTestId);
    
    await expect(inventoryPage.page.locator(`[data-test="remove-${dataTestId}"]`)).toBeVisible();
    await inventoryPage.verifyCartCount(1);
  });

  test('should remove product from inventory', async () => {
    const { dataTestId } = testData.products.backpack;
    await inventoryPage.addProductToCart(dataTestId);
    await inventoryPage.removeProductFromCart(dataTestId);
    
    await expect(inventoryPage.page.locator(`[data-test="add-to-cart-${dataTestId}"]`)).toBeVisible();
    await inventoryPage.verifyCartBadgeNotVisible();
  });

  test('should toggle add/remove product repeatedly', async () => {
    const { dataTestId } = testData.products.backpack;
    
    await inventoryPage.addProductToCart(dataTestId);
    await inventoryPage.removeProductFromCart(dataTestId);
    await inventoryPage.addProductToCart(dataTestId);
    
    await inventoryPage.verifyCartCount(1);
    await expect(inventoryPage.page.locator(`[data-test="remove-${dataTestId}"]`)).toBeVisible();
  });

  test('should verify product prices in correct format', async () => {
    const priceElements = inventoryPage.page.locator('[data-test="inventory-item-price"]');
    const count = await priceElements.count();
    expect(count).toBe(6); // Should have 6 products

    for (let i = 0; i < count; i++) {
      const priceText = await priceElements.nth(i).textContent();
      expect(priceText).toMatch(/^\$\d+\.\d{2}$/); // Should match format like $29.99
    }
  });
});
