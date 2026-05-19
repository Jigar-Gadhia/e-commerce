declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId: (testId: string) => Chainable<JQuery<HTMLElement>>;
      getByRole: (
        role: string,
        options: { name: string | RegExp }
      ) => Chainable<JQuery<HTMLElement>>;
      getProductItems: () => Chainable<JQuery<HTMLElement>>;
      getCategoryCheckboxes: () => Chainable<JQuery<HTMLElement>>;
      getCartLineItems: () => Chainable<JQuery<HTMLElement>>;
      clickVisibleElement: (selector: string) => Chainable<JQuery<HTMLElement>>;
      waitForProducts: () => Chainable<JQuery<HTMLElement>>;
      openFirstProduct: () => Chainable<void>;
      addProductToCart: () => Chainable<void>;
    }
  }
}

Cypress.Commands.add("getByTestId", (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add(
  "getByRole",
  (role: string, options: { name: string | RegExp }) => {
    if (role === "button") {
      return cy.contains("button", options.name);
    }
    return cy.get(role).contains(options.name);
  }
);

// Get all product items with timeout
Cypress.Commands.add("getProductItems", () => {
  return cy.get('[data-testid^="product-item-"]', {
    timeout: 20000,
  });
});

// Get all category checkboxes with timeout
Cypress.Commands.add("getCategoryCheckboxes", () => {
  return cy.get('[data-testid^="category-checkbox-"]', {
    timeout: 20000,
  });
});

// Get all cart line items
Cypress.Commands.add("getCartLineItems", () => {
  return cy.get('[data-testid^="cart-line-item-"]');
});

// Click an element after it becomes visible
Cypress.Commands.add("clickVisibleElement", (selector: string) => {
  return cy.get(selector).should("be.visible").click();
});

// Wait for products to load and ensure at least one exists
Cypress.Commands.add("waitForProducts", () => {
  return cy.getProductItems().should("have.length.greaterThan", 0);
});

// Open the first product
Cypress.Commands.add("openFirstProduct", () => {
  cy.getProductItems().first().should("be.visible").click();
});

// Add product to cart (assumes product page is open)
Cypress.Commands.add("addProductToCart", () => {
  cy.clickVisibleElement('[data-testid="add-to-cart-btn"]');
});

export {};
