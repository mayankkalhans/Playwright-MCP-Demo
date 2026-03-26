import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { testData } from '../fixtures/testData';

test.describe('Login Scenarios', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.navigate();
  });

  test('should login successfully with standard_user', async ({ page }) => {
    await loginPage.verifyLoginPageVisible();
    
    const { username, password } = testData.users.standard;
    await loginPage.login(username, password);
    
    await inventoryPage.verifyInventoryPageUrl();
    await inventoryPage.verifyProductsVisible();
  });

  test('should prevent locked out user from logging in', async () => {
    const { username, password } = testData.users.lockedOut;
    await loginPage.login(username, password);
    
    await loginPage.verifyErrorMessage(testData.errorMessages.lockedOut);
  });

  test('should login successfully as problem user', async () => {
    const { username, password } = testData.users.problem;
    await loginPage.loginAndVerifyInventory(username, password);
  });

  test('should login successfully as performance glitch user', async () => {
    const { username, password } = testData.users.performanceGlitch;
    await loginPage.loginAndVerifyInventory(username, password, 15000);
  });

  test('should login successfully as error user', async () => {
    const { username, password } = testData.users.error;
    await loginPage.loginAndVerifyInventory(username, password);
  });

  test('should validate empty username error', async () => {
    const { password } = testData.users.standard;
    await loginPage.page.locator('[data-test="password"]').fill(password);
    await loginPage.page.locator('[data-test="login-button"]').click();
    
    await loginPage.verifyErrorMessage(testData.errorMessages.usernameRequired);
  });

  test('should validate empty password error', async () => {
    const { username } = testData.users.standard;
    await loginPage.page.locator('[data-test="username"]').fill(username);
    await loginPage.page.locator('[data-test="login-button"]').click();
    
    await loginPage.verifyErrorMessage(testData.errorMessages.passwordRequired);
  });

  test('should show error for invalid credentials', async () => {
    const { username, password } = testData.users.invalid;
    await loginPage.login(username, password);
    
    await loginPage.verifyErrorMessage(testData.errorMessages.credentialsMismatch);
  });
});
