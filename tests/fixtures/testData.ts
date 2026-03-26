export const testData = {
  users: {
    standard: {
      username: 'standard_user',
      password: 'secret_sauce'
    },
    lockedOut: {
      username: 'locked_out_user',
      password: 'secret_sauce'
    },
    problem: {
      username: 'problem_user',
      password: 'secret_sauce'
    },
    performanceGlitch: {
      username: 'performance_glitch_user',
      password: 'secret_sauce'
    },
    error: {
      username: 'error_user',
      password: 'secret_sauce'
    },
    visual: {
      username: 'visual_user',
      password: 'secret_sauce'
    },
    invalid: {
      username: 'invalid_user',
      password: 'invalid_password'
    }
  },
  products: {
    backpack: {
      name: 'Sauce Labs Backpack',
      dataTestId: 'sauce-labs-backpack',
      price: '$29.99'
    },
    bikeLight: {
      name: 'Sauce Labs Bike Light',
      dataTestId: 'sauce-labs-bike-light',
      price: '$9.99'
    },
    boltTShirt: {
      name: 'Sauce Labs Bolt T-Shirt',
      dataTestId: 'sauce-labs-bolt-t-shirt',
      price: '$15.99'
    },
    fleeceJacket: {
      name: 'Sauce Labs Fleece Jacket',
      dataTestId: 'sauce-labs-fleece-jacket',
      price: '$49.99'
    },
    onesie: {
      name: 'Sauce Labs Onesie',
      dataTestId: 'sauce-labs-onesie',
      price: '$7.99'
    },
    testShirt: {
      name: 'Test.allTheThings() T-Shirt (Red)',
      dataTestId: 'test-allthethings-t-shirt-red',
      price: '$15.99'
    }
  },
  checkout: {
    validCustomer: {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345'
    },
    alternateCustomer: {
      firstName: 'Jane',
      lastName: 'Smith',
      postalCode: '54321'
    },
    specialCharsCustomer: {
      firstName: 'Jean-Paul',
      lastName: "O'Reilly",
      postalCode: '99999'
    }
  },
  urls: {
    baseUrl: 'https://www.saucedemo.com',
    inventory: 'https://www.saucedemo.com/inventory.html',
    cart: 'https://www.saucedemo.com/cart.html',
    checkoutStepOne: 'https://www.saucedemo.com/checkout-step-one.html',
    checkoutStepTwo: 'https://www.saucedemo.com/checkout-step-two.html',
    checkoutComplete: 'https://www.saucedemo.com/checkout-complete.html'
  },
  errorMessages: {
    lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
    usernameRequired: 'Epic sadface: Username is required',
    passwordRequired: 'Epic sadface: Password is required',
    credentialsMismatch: 'Epic sadface: Username and password do not match any user in this service',
    firstNameRequired: 'Error: First Name is required',
    lastNameRequired: 'Error: Last Name is required',
    postalCodeRequired: 'Error: Postal Code is required'
  },
  messages: {
    thankYou: 'Thank you for your order!'
  }
};
