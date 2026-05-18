describe("E-Commerce App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("home page shows products and can open a product", () => {
    cy.getByTestId("home-page").should("be.visible");

    cy.get('[data-testid^="product-item-"]').first().should("be.visible").click();

    cy.getByTestId("product-page").should("be.visible");
    cy.getByTestId("add-to-cart").should("be.visible");
  });

  it("user can add and remove item from cart", () => {
    // open product
    cy.get('[data-testid^="product-item-"]').first().click();

    // add to cart
    cy.getByTestId("add-to-cart").click();

    // cart badge visible
    cy.getByTestId("cart-link").should("contain.text", "1");

    // open cart
    cy.getByTestId("cart-link").click();

    cy.getByTestId("cart-page").should("be.visible");
    cy.getByTestId("cart-total").should("be.visible");

    // remove button appears for quantity 1
    cy.getByTestId("quantity-display").should("have.attr", "data-show-remove", "true");
    cy.getByTestId("minus-button").should("contain.text", "Remove");

    // remove item
    cy.getByTestId("minus-button").click();

    // cart empty state
    cy.contains(/your cart is empty/i).should("be.visible");
  });

  it("user can increase and decrease cart quantity", () => {
    cy.get('[data-testid^="product-item-"]').first().click();

    // add first item
    cy.getByTestId("add-to-cart").click();

    // add second item using pill
    cy.getByTestId("plus-button").click();

    // quantity visible
    cy.getByTestId("quantity-display").should("contain.text", "2");

    // remove one item
    cy.getByTestId("minus-button").click();

    // quantity visible
    cy.getByTestId("quantity-display").should("contain.text", "1");

    // debug info
    cy.getByTestId("quantity-display").should("have.attr", "data-show-remove", "true");

    // remove button should appear for qty 1
    cy.getByTestId("minus-button").should("contain.text", "Remove");
  });
});
