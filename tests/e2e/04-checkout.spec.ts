import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';
import { testData } from '../fixtures/testData';

test.describe('Checkout Flow', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let confirmationPage: ConfirmationPage;

  async function loginAndAddProductToCart(page: any) {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    
    await loginPage.navigate();
    const { username, password } = testData.users.standard;
    await loginPage.loginAndVerifyInventory(username, password);
    
    const { dataTestId } = testData.products.backpack;
    await inventoryPage.addProductToCart(dataTestId);
    await inventoryPage.openCart();
  }

  async function proceedToCheckout(page: any) {
    await cartPage.proceedToCheckout();
    checkoutPage = new CheckoutPage(page);
  }

  test.beforeEach(async ({ page }) => {
    checkoutPage = new CheckoutPage(page);
    confirmationPage = new ConfirmationPage(page);
  });

  test('should complete full checkout flow with valid information', async ({ page }) => {
    await loginAndAddProductToCart(page);
    await proceedToCheckout(page);
    
    await checkoutPage.verifyCheckoutPageStepOne();
    
    const { firstName, lastName, postalCode } = testData.checkout.validCustomer;
    await checkoutPage.fillAndContinue(firstName, lastName, postalCode);
    
    await checkoutPage.verifyCheckoutPageStepTwo();
    await checkoutPage.verifyBothInformationSections();
    
    await checkoutPage.clickFinish();
    
    await confirmationPage.verifyConfirmationVisible();
    await confirmationPage.verifyThankYouMessage();
  });

  test('should validate required first name', async ({ page }) => {
    await loginAndAddProductToCart(page);
    await proceedToCheckout(page);
    
    await checkoutPage.verifyCheckoutPageStepOne();
    
    const { lastName, postalCode } = testData.checkout.validCustomer;
    await checkoutPage.fillCustomerInfo('', lastName, postalCode);
    await checkoutPage.clickContinue();
    
    await checkoutPage.verifyErrorMessage(testData.errorMessages.firstNameRequired);
  });

  test('should validate required last name', async ({ page }) => {
    await loginAndAddProductToCart(page);
    await proceedToCheckout(page);
    
    await checkoutPage.verifyCheckoutPageStepOne();
    
    const { firstName, postalCode } = testData.checkout.validCustomer;
    await checkoutPage.fillCustomerInfo(firstName, '', postalCode);
    await checkoutPage.clickContinue();
    
    await checkoutPage.verifyErrorMessage(testData.errorMessages.lastNameRequired);
  });

  test('should validate required postal code', async ({ page }) => {
    await loginAndAddProductToCart(page);
    await proceedToCheckout(page);
    
    await checkoutPage.verifyCheckoutPageStepOne();
    
    const { firstName, lastName } = testData.checkout.validCustomer;
    await checkoutPage.fillCustomerInfo(firstName, lastName, '');
    await checkoutPage.clickContinue();
    
    await checkoutPage.verifyErrorMessage(testData.errorMessages.postalCodeRequired);
  });

  test('should cancel checkout and return to cart', async ({ page }) => {
    await loginAndAddProductToCart(page);
    await proceedToCheckout(page);
    
    await checkoutPage.verifyCheckoutPageStepOne();
    await checkoutPage.clickCancel();
    
    await cartPage.verifyCartPageUrl();
    await cartPage.verifyItemInCart(testData.products.backpack.name);
  });

  test('should verify order information on step 2', async ({ page }) => {
    await loginAndAddProductToCart(page);
    await proceedToCheckout(page);
    
    const { firstName, lastName, postalCode } = testData.checkout.validCustomer;
    await checkoutPage.fillAndContinue(firstName, lastName, postalCode);
    
    await checkoutPage.verifyCheckoutPageStepTwo();
    await checkoutPage.verifyPaymentInformationVisible();
    await checkoutPage.verifyShippingInformationVisible();
  });

  test('should reset cart state after completing checkout', async ({ page }) => {
    await loginAndAddProductToCart(page);
    await proceedToCheckout(page);
    
    const { firstName, lastName, postalCode } = testData.checkout.validCustomer;
    await checkoutPage.fillAndContinue(firstName, lastName, postalCode);
    await checkoutPage.clickFinish();
    
    await confirmationPage.verifyConfirmationVisible();
    await confirmationPage.clickBackHome();
    
    await inventoryPage.verifyInventoryPageUrl();
    await inventoryPage.verifyCartBadgeNotVisible();
  });

  test('should accept special characters in names', async ({ page }) => {
    await loginAndAddProductToCart(page);
    await proceedToCheckout(page);
    
    const { firstName, lastName, postalCode } = testData.checkout.specialCharsCustomer;
    await checkoutPage.fillAndContinue(firstName, lastName, postalCode);
    
    await checkoutPage.verifyCheckoutPageStepTwo();
  });

  test('should complete multiple sequential orders', async ({ page }) => {
    const { backpack, bikeLight } = testData.products;
    
    // First order
    await loginAndAddProductToCart(page);
    await proceedToCheckout(page);
    
    const { firstName, lastName, postalCode } = testData.checkout.validCustomer;
    await checkoutPage.fillAndContinue(firstName, lastName, postalCode);
    await checkoutPage.clickFinish();
    
    await confirmationPage.verifyThankYouMessage();
    
    // Back home and second order
    await confirmationPage.clickBackHome();
    await inventoryPage.addProductToCart(bikeLight.dataTestId);
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();
    
    const altCustomer = testData.checkout.alternateCustomer;
    await checkoutPage.fillAndContinue(altCustomer.firstName, altCustomer.lastName, altCustomer.postalCode);
    await checkoutPage.clickFinish();
    
    await confirmationPage.verifyThankYouMessage();
  });
});
