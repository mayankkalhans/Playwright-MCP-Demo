# SauceDemo 30 Case E2E Plan

## Application Overview

30 end-to-end high-priority scenarios for SauceDemo (https://www.saucedemo.com/) across login, products, cart, checkout, edge cases, and validation.

## Test Scenarios

### 1. Login Scenarios

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful login with standard_user

**File:** `tests/e2e/login/successful-login-standard-user.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: login page loads with username and password fields
    - expect: login button visible
  2. Enter standard_user + secret_sauce
    - expect: username field contains standard_user
  3. Click login
    - expect: redirect to inventory page
    - expect: products list visible
    - expect: cart icon visible

#### 1.2. Locked out user cannot login

**File:** `tests/e2e/login/locked-out-user.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: login page loads
  2. Enter locked_out_user + secret_sauce
    - expect: value present
  3. Click login
    - expect: error locked out shown

#### 1.3. Problem user login success

**File:** `tests/e2e/login/problem-user.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: login page loads
  2. Enter problem_user + secret_sauce
    - expect: value present
  3. Click login
    - expect: inventory loads

#### 1.4. Performance glitch user login success

**File:** `tests/e2e/login/performance-glitch-user.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: login page loads
  2. Enter performance_glitch_user + secret_sauce
    - expect: value present
  3. Click login
    - expect: inventory loads maybe slow

#### 1.5. Error user login success

**File:** `tests/e2e/login/error-user.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: login page loads
  2. Enter error_user + secret_sauce
    - expect: value present
  3. Click login
    - expect: inventory loads

#### 1.6. Empty username validation

**File:** `tests/e2e/login/empty-username.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: login page loads
  2. Enter empty username + secret_sauce
    - expect: value accepted
  3. Click login
    - expect: username required error

#### 1.7. Empty password validation

**File:** `tests/e2e/login/empty-password.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: login page loads
  2. Enter standard_user + empty password
    - expect: username value present
  3. Click login
    - expect: password required error

#### 1.8. Invalid credentials

**File:** `tests/e2e/login/invalid-login.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: login page loads
  2. Enter invalid_user + invalid_password
    - expect: values present
  3. Click login
    - expect: username/password mismatch error

### 2. Product Interactions

**Seed:** `tests/seed.spec.ts`

#### 2.1. View all products

**File:** `tests/e2e/products/view-all-products.spec.ts`

**Steps:**
  1. Login standard_user
    - expect: inventory loads
  2. Assert all 6 product cards visible
    - expect: backpack, bike light, bolt t-shirt, fleece jacket, onesie, test t-shirt present

#### 2.2. Sort products name A to Z

**File:** `tests/e2e/products/sort-by-name-a-z.spec.ts`

**Steps:**
  1. Login standard_user
    - expect: inventory loads
  2. Select sort Name (A to Z)
    - expect: products sorted alphabetically

#### 2.3. Sort products name Z to A

**File:** `tests/e2e/products/sort-by-name-z-a.spec.ts`

**Steps:**
  1. Login standard_user
    - expect: inventory loads
  2. Select sort Name (Z to A)
    - expect: products reverse sorted alphabetically

#### 2.4. Sort products price low to high

**File:** `tests/e2e/products/sort-by-price-low-high.spec.ts`

**Steps:**
  1. Login standard_user
    - expect: inventory loads
  2. Select sort Price (low to high)
    - expect: prices ascending

#### 2.5. Sort products price high to low

**File:** `tests/e2e/products/sort-by-price-high-low.spec.ts`

**Steps:**
  1. Login standard_user
    - expect: inventory loads
  2. Select sort Price (high to low)
    - expect: prices descending

#### 2.6. Open product detail from name click

**File:** `tests/e2e/products/product-details.spec.ts`

**Steps:**
  1. Login standard_user
    - expect: inventory loads
  2. Click on Backpack link
    - expect: product detail page shows name/price/description
    - expect: back to inventory control visible

#### 2.7. Add product to cart from inventory

**File:** `tests/e2e/products/add-product.spec.ts`

**Steps:**
  1. Login standard_user
    - expect: inventory loads
  2. Add Sauce Labs Backpack
    - expect: button changes to remove
    - expect: cart count updates 1

#### 2.8. Remove product from inventory list

**File:** `tests/e2e/products/remove-product.spec.ts`

**Steps:**
  1. Login standard_user
    - expect: inventory loads
  2. Add Backpack then remove it
    - expect: button returns to add
    - expect: cart count 0

### 3. Cart Operations

**Seed:** `tests/seed.spec.ts`

#### 3.1. Add single item to cart and verify

**File:** `tests/e2e/cart/add-single-item.spec.ts`

**Steps:**
  1. Login standard_user
    - expect: inventory loads
  2. Add Backpack
    - expect: cart count 1
  3. Go to cart
    - expect: Backpack item present
    - expect: price 29.99

#### 3.2. Add multiple items to cart

**File:** `tests/e2e/cart/add-multiple-items.spec.ts`

**Steps:**
  1. Login standard_user
    - expect: inventory loads
  2. Add Backpack, Bike Light, Bolt T-Shirt
    - expect: cart count 3
  3. Go cart
    - expect: 3 items
    - expect: subtotal 55.97

#### 3.3. Remove item from cart

**File:** `tests/e2e/cart/remove-item.spec.ts`

**Steps:**
  1. Add 2 items to cart
    - expect: cart count 2
  2. Remove one
    - expect: cart count 1
    - expect: item removed
    - expect: subtotal updated

#### 3.4. Continue shopping from cart

**File:** `tests/e2e/cart/continue-shopping.spec.ts`

**Steps:**
  1. Add item and go cart
    - expect: cart list
  2. Continue shopping
    - expect: inventory reload
    - expect: cart count retained

#### 3.5. Cart button badge after add/remove

**File:** `tests/e2e/cart/badge-count.spec.ts`

**Steps:**
  1. Login standard_user
    - expect: inventory loads
  2. Add and remove items
    - expect: badge increments/decrements accordingly

#### 3.6. Verify cart page and empty state

**File:** `tests/e2e/cart/cart-empty.spec.ts`

**Steps:**
  1. Login standard_user
    - expect: inventory loads
  2. Go cart no items
    - expect: empty cart message

### 4. Checkout Flow

**Seed:** `tests/seed.spec.ts`

#### 4.1. Complete checkout with valid information

**File:** `tests/e2e/checkout/complete-checkout.spec.ts`

**Steps:**
  1. Add product to cart
    - expect: cart has item
  2. Proceed to checkout
    - expect: step one visible
  3. Enter valid info
    - expect: step two visible
    - expect: payment and shipping info visible
  4. Finish
    - expect: confirmation page
    - expect: thank you message

#### 4.2. Checkout required first name

**File:** `tests/e2e/checkout/validate-first-name.spec.ts`

**Steps:**
  1. Add item and proceed checkout
    - expect: step 1 visible
  2. Leave first name blank, click continue
    - expect: error first name required

#### 4.3. Checkout required last name

**File:** `tests/e2e/checkout/validate-last-name.spec.ts`

**Steps:**
  1. Add item and proceed checkout
    - expect: step 1 visible
  2. Leave last name blank, click continue
    - expect: error last name required

#### 4.4. Checkout required postal code

**File:** `tests/e2e/checkout/validate-postal-code.spec.ts`

**Steps:**
  1. Add item and proceed checkout
    - expect: step 1 visible
  2. Leave postal code blank, click continue
    - expect: error postal code required

#### 4.5. Cancel checkout returns to cart

**File:** `tests/e2e/checkout/cancel-checkout.spec.ts`

**Steps:**
  1. Add item and start checkout
    - expect: step 1 visible
  2. Click cancel
    - expect: cart page visible
    - expect: cart item intact

#### 4.6. Verify order totals on Step 2

**File:** `tests/e2e/checkout/verify-totals.spec.ts`

**Steps:**
  1. Add item and complete step 1 with data
    - expect: step 2 visible
  2. Assert item total/tax/total present
    - expect: values consistent

#### 4.7. Confirm button back home resets state

**File:** `tests/e2e/checkout/backhome-reset-state.spec.ts`

**Steps:**
  1. Complete checkout
    - expect: confirmation visible
  2. Click back home
    - expect: inventory visible
    - expect: cart badge cleared

### 5. Edge Cases and Validations

**Seed:** `tests/seed.spec.ts`

#### 5.1. Add/remove same product repeatedly

**File:** `tests/e2e/edge-cases/add-remove-toggle.spec.ts`

**Steps:**
  1. Login + add Backpack
    - expect: button removes
  2. Remove backpack and add again
    - expect: cart count 1
    - expect: product present

#### 5.2. Complete multiple sequential orders

**File:** `tests/e2e/edge-cases/multiple-orders.spec.ts`

**Steps:**
  1. Checkout first item
    - expect: order confirm
  2. Back home + add second item + checkout
    - expect: second confirmation

#### 5.3. Checkout with special characters in name

**File:** `tests/e2e/edge-cases/special-chars.spec.ts`

**Steps:**
  1. Add item, go checkout
    - expect: step 1 visible
  2. Enter first Jean-Paul, last O'Reilly
    - expect: no validation error
    - expect: step 2

#### 5.4. Logout and login again

**File:** `tests/e2e/edge-cases/logout-login.spec.ts`

**Steps:**
  1. Login standard_user
    - expect: inventory visible
  2. Open menu + logout
    - expect: login visible
  3. Login again
    - expect: inventory visible

#### 5.5. Reset app state clears cart

**File:** `tests/e2e/edge-cases/reset-state.spec.ts`

**Steps:**
  1. Add products
    - expect: cart badge >0
  2. Open menu -> reset app state
    - expect: cart empty
    - expect: inventory still reachable

#### 5.6. Performance glitch user completes checkout

**File:** `tests/e2e/edge-cases/performance-signoff.spec.ts`

**Steps:**
  1. Login performance_glitch_user
    - expect: inventory eventually visible
  2. Add item + checkout + confirm
    - expect: confirmation visible

#### 5.7. Error user completes checkout

**File:** `tests/e2e/edge-cases/error-user-checkout.spec.ts`

**Steps:**
  1. Login error_user
    - expect: inventory visible
  2. Add item + checkout + confirm
    - expect: confirmation visible

#### 5.8. Visual user GUI checks

**File:** `tests/e2e/edge-cases/visual-layout.spec.ts`

**Steps:**
  1. Login visual_user
    - expect: inventory & images visible
  2. Add item + cart + checkout
    - expect: workflow complete

#### 5.9. Price format validation ($xx.xx)

**File:** `tests/e2e/edge-cases/price-format.spec.ts`

**Steps:**
  1. Login standard_user
    - expect: inventory visible
  2. Assertion price elements use format
    - expect: all prices match regex

#### 5.10. Unauthenticated direct URL access redirect

**File:** `tests/e2e/edge-cases/direct-url-auth.spec.ts`

**Steps:**
  1. Navigate directly to /inventory.html
    - expect: redirect to login
  2. Navigate to /checkout-step-one.html
    - expect: redirect to login
