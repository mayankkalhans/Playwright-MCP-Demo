import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { testData } from '../fixtures/testData';

test.describe('Cart Operations', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await loginPage.navigate();
    
    const { username, password } = testData.users.standard;
    await loginPage.loginAndVerifyInventory(username, password);
  });

  test('should add single item to cart and verify', async () => {
    const { dataTestId, name, price } = testData.products.backpack;
    
    await inventoryPage.addProductToCart(dataTestId);
    await inventoryPage.verifyCartCount(1);
    
    await inventoryPage.openCart();
    await cartPage.verifyCartPageUrl();
    await cartPage.verifyItemInCart(name);
    await cartPage.verifyItemPrice(price);
  });

  test('should add multiple items to cart', async () => {
    const { backpack, bikeLight, boltTShirt } = testData.products;
    
    await inventoryPage.addProductToCart(backpack.dataTestId);
    await inventoryPage.addProductToCart(bikeLight.dataTestId);
    await inventoryPage.addProductToCart(boltTShirt.dataTestId);
    
    await inventoryPage.verifyCartCount(3);
    
    await inventoryPage.openCart();
    await cartPage.verifyItemInCart(backpack.name);
    await cartPage.verifyItemInCart(bikeLight.name);
    await cartPage.verifyItemInCart(boltTShirt.name);
  });

  test('should remove item from cart', async () => {
    const { backpack, bikeLight } = testData.products;
    
    // Add two items
    await inventoryPage.addProductToCart(backpack.dataTestId);
    await inventoryPage.addProductToCart(bikeLight.dataTestId);
    await inventoryPage.verifyCartCount(2);
    
    // Go to cart and remove one
    await inventoryPage.openCart();
    await cartPage.removeItemFromCart(backpack.dataTestId);
    
    // Verify removal
    await inventoryPage.verifyCartCount(1);
    await cartPage.verifyItemNotInCart(backpack.name);
    await cartPage.verifyItemInCart(bikeLight.name);
  });

  test('should continue shopping and retain cart items', async () => {
    const { dataTestId } = testData.products.backpack;
    
    await inventoryPage.addProductToCart(dataTestId);
    await inventoryPage.openCart();
    await cartPage.continueShopping();
    
    // Should be back at inventory with cart preserved
    await inventoryPage.verifyInventoryPageUrl();
    await inventoryPage.verifyCartCount(1);
  });

  test('should update cart badge when adding/removing items', async () => {
    const { backpack, bikeLight } = testData.products;
    
    await inventoryPage.addProductToCart(backpack.dataTestId);
    await inventoryPage.verifyCartCount(1);
    
    await inventoryPage.addProductToCart(bikeLight.dataTestId);
    await inventoryPage.verifyCartCount(2);
    
    await inventoryPage.removeProductFromCart(backpack.dataTestId);
    await inventoryPage.verifyCartCount(1);
  });

  test('should show empty cart state', async () => {
    await inventoryPage.openCart();
    await cartPage.verifyCartPageUrl();
    await cartPage.verifyCartHeadingVisible();
  });

  test('should proceed to checkout from cart', async () => {
    const { dataTestId } = testData.products.backpack;
    
    await inventoryPage.addProductToCart(dataTestId);
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();
    
    // Verify we're on checkout page
    await expect(inventoryPage.page.getByText('Checkout: Your Information')).toBeVisible();
  });
});
