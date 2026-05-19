describe("E-Commerce App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Home Page", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("shows products and can open a product", () => {

      cy.getByTestId("home-page").should("be.visible");

      cy.get('[data-testid^="product-item-"]', {
        timeout: 20000,
      }).should("have.length.greaterThan", 0);

      cy.get('[data-testid^="product-item-"]')
        .first()
        .should("be.visible")
        .click();

      cy.getByTestId("product-page").should("be.visible");

      cy.getByTestId("add-to-cart-btn").should("be.visible");

      cy.url().should("include", "/product");
    });
  });

  it("filters products by category", () => {
    cy.intercept("GET", "**/products*").as("getProducts");

    cy.getByTestId("category-filter-toggle").should("be.visible").click();

    cy.get('[data-testid^="category-checkbox-"]', {
      timeout: 20000,
    })
      .should("have.length.greaterThan", 0)
      .first()
      .click();

    cy.wait("@getProducts");

    cy.url().should("include", "category=");

    cy.get("body").then(($body) => {
      const hasProducts =
        $body.find('[data-testid^="product-item-"]').length > 0;

      const hasEmptyState =
        $body.find('[data-testid="empty-products-state"]').length > 0;

      expect(
        hasProducts || hasEmptyState,
        "products or empty state should render",
      ).to.equal(true);
    });
  });

  describe("Cart", () => {
    it("user can add and remove item from cart", () => {

      cy.get('[data-testid^="product-item-"]').first().click();

      cy.getByTestId("add-to-cart-btn").should("be.visible").click();

      cy.getByTestId("cart-link").should("contain", "1");

      cy.getByTestId("cart-link").click();

      cy.url().should("include", "/cart");

      cy.getByTestId("cart-page").should("be.visible");

      cy.get('[data-testid^="cart-line-item-"]').should("have.length", 1);

      cy.getByTestId("cart-total").should("be.visible");

      cy.getByTestId("decrease-qty-btn").should("be.visible").click();

      cy.getByTestId("empty-cart-state").should("be.visible");
    });

    it("user can increase and decrease cart quantity", () => {
      cy.get('[data-testid^="product-item-"]').first().click();

      cy.getByTestId("add-to-cart-btn").click();

      cy.getByTestId("increase-qty-btn").should("be.visible").click();

      cy.getByTestId("quantity-display").should("contain", "2");

      cy.getByTestId("decrease-qty-btn").click();

      cy.getByTestId("quantity-display").should("contain", "1");

      cy.getByTestId("decrease-qty-btn").should("be.visible");
    });

    it("persists cart items after page refresh", () => {
      cy.get('[data-testid^="product-item-"]', {
        timeout: 20000,
      })
        .should("have.length.greaterThan", 0)
        .first()
        .click();

      cy.getByTestId("add-to-cart-btn").should("be.visible").click();

      cy.getByTestId("cart-link").should("contain", "1");

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
