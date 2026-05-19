describe("E-Commerce App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Home Page", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("shows products and can open a product", () => {
      // page visible
      cy.getByTestId("home-page").should("be.visible");

      // wait for loading to finish
      cy.get('[data-testid^="product-item-"]', {
        timeout: 10000,
      }).should("have.length.greaterThan", 0);

      // open first product
      cy.get('[data-testid^="product-item-"]')
        .first()
        .should("be.visible")
        .click();

      // product page visible
      cy.getByTestId("product-page").should("be.visible");

      // add to cart visible
      cy.getByTestId("add-to-cart-btn").should("be.visible");

      // route validation
      cy.url().should("include", "/product");
    });
  });

  it("filters products by category", () => {
    cy.getByTestId("category-filter-toggle").click();

    cy.get('[data-testid^="category-checkbox-"]', {
      timeout: 10000,
    })
      .should("have.length.greaterThan", 0)
      .first()
      .click();

    cy.url().should("include", "category=");

    cy.get('[data-testid^="product-item-"]').should(
      "have.length.greaterThan",
      0,
    );
  });

  describe("Cart", () => {
    it("user can add and remove item from cart", () => {
      // open product
      cy.get('[data-testid^="product-item-"]').first().click();

      // add to cart
      cy.getByTestId("add-to-cart-btn").should("be.visible").click();

      // cart badge updates
      cy.getByTestId("cart-link").should("contain", "1");

      // open cart
      cy.getByTestId("cart-link").click();

      cy.url().should("include", "/cart");

      cy.getByTestId("cart-page").should("be.visible");

      cy.get('[data-testid^="cart-line-item-"]').should("have.length", 1);

      cy.getByTestId("cart-total").should("be.visible");

      // remove item
      cy.getByTestId("decrease-qty-btn").should("be.visible").click();

      // empty state visible
      cy.getByTestId("empty-cart-state").should("be.visible");
    });

    it("user can increase and decrease cart quantity", () => {
      cy.get('[data-testid^="product-item-"]').first().click();

      // add first item
      cy.getByTestId("add-to-cart-btn").click();

      // increase quantity
      cy.getByTestId("increase-qty-btn").should("be.visible").click();

      // quantity = 2
      cy.getByTestId("quantity-display").should("contain", "2");

      // decrease quantity
      cy.getByTestId("decrease-qty-btn").click();

      // quantity = 1
      cy.getByTestId("quantity-display").should("contain", "1");

      // remove button still visible
      cy.getByTestId("decrease-qty-btn").should("be.visible");
    });

    it("persists cart after page refresh", () => {
      cy.get('[data-testid^="product-item-"]').first().click();

      cy.getByTestId("add-to-cart-btn").click();

      cy.reload();

      cy.getByTestId("cart-link").should("contain", "1");
    });

    it("shows empty cart state initially", () => {
      cy.getByTestId("cart-link").click();

      cy.getByTestId("empty-cart-state").should("be.visible");

      cy.getByTestId("continue-shopping-btn").should("be.visible");
    });
  });
});
