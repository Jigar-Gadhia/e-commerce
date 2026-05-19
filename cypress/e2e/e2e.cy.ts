// describe("E-Commerce App", () => {
//   beforeEach(() => {
//     cy.visit("/");
//   });

//   describe("Home Page", () => {
//     beforeEach(() => {
//       cy.visit("/");
//     });

//     it("shows products and can open a product", () => {
//       cy.getByTestId("home-page").should("be.visible");

//       cy.waitForProducts();

//       cy.openFirstProduct();

//       cy.getByTestId("product-page").should("be.visible");

//       cy.getByTestId("add-to-cart-btn").should("be.visible");

//       cy.url().should("include", "/product");
//     });
//   });

//   it("filters products by category", () => {
//     cy.intercept("GET", "**/products*").as("getProducts");

//     cy.clickVisibleElement('[data-testid="category-filter-toggle"]');

//     cy.getCategoryCheckboxes()
//       .should("have.length.greaterThan", 0)
//       .first()
//       .click();

//     cy.wait("@getProducts");

//     cy.url().should("include", "category=");

//     cy.get("body").then(($body) => {
//       const hasProducts =
//         $body.find('[data-testid^="product-item-"]').length > 0;

//       const hasEmptyState =
//         $body.find('[data-testid="empty-products-state"]').length > 0;

//       expect(
//         hasProducts || hasEmptyState,
//         "products or empty state should render",
//       ).to.equal(true);
//     });
//   });

//   describe("Cart", () => {
//     it("user can add and remove item from cart", () => {
//       cy.getProductItems().then(($products) => {
//         if ($products.length > 0) {
//           cy.openFirstProduct();

//           cy.addProductToCart();

//           cy.getByTestId("cart-link").should("contain", "1");

//           cy.clickVisibleElement('[data-testid="cart-link"]');

//           cy.url().should("include", "/cart");

//           cy.getByTestId("cart-page").should("be.visible");

//           cy.getCartLineItems().should("have.length", 1);

//           cy.getByTestId("cart-total").should("be.visible");

//           cy.clickVisibleElement('[data-testid="decrease-qty-btn"]');

//           cy.getByTestId("empty-cart-state").should("be.visible");
//         } else {
//           cy.skip();
//         }
//       });
//     });

//     it("user can increase and decrease cart quantity", () => {
//       cy.getProductItems().then(($products) => {
//         if ($products.length > 0) {
//           cy.openFirstProduct();

//           cy.addProductToCart();

//           cy.clickVisibleElement('[data-testid="increase-qty-btn"]');

//           cy.getByTestId("quantity-display").should("contain", "2");

//           cy.clickVisibleElement('[data-testid="decrease-qty-btn"]');

//           cy.getByTestId("quantity-display").should("contain", "1");

//           cy.getByTestId("decrease-qty-btn").should("be.visible");
//         } else {
//           cy.skip();
//         }
//       });
//     });

//     it("persists cart items after page refresh", () => {
//       cy.getProductItems().then(($products) => {
//         if ($products.length > 0) {
//           cy.openFirstProduct();

//           cy.addProductToCart();

//           cy.getByTestId("cart-link").should("contain", "1");

//           cy.reload();

//           cy.getByTestId("cart-link").should("contain", "1");
//         } else {
//           cy.skip();
//         }
//       });
//     });

//     it("shows empty cart state initially", () => {
//       cy.clickVisibleElement('[data-testid="cart-link"]');

//       cy.getByTestId("empty-cart-state").should("be.visible");

//       cy.getByTestId("continue-shopping-btn").should("be.visible");
//     });
//   });
// });
describe("E-Commerce App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Home Page", () => {
    it("shows products and can open a product", () => {
      cy.getByTestId("home-page").should("be.visible");

      cy.waitForProducts();

      cy.getProductItems()
        .its("length")
        .should("be.greaterThan", 0);

      cy.openFirstProduct();

      cy.getByTestId("product-page").should("be.visible");

      cy.getByTestId("add-to-cart-btn").should("be.visible");

      cy.url().should("include", "/product");
    });
  });

  it("filters products by category", () => {
    cy.intercept("GET", "**/products*").as("getProducts");

    cy.clickVisibleElement('[data-testid="category-filter-toggle"]');

    cy.getCategoryCheckboxes()
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
    beforeEach(() => {
      cy.waitForProducts();

      cy.getProductItems()
        .its("length")
        .should("be.greaterThan", 0);
    });

    it("user can add and remove item from cart", () => {
      cy.openFirstProduct();

      cy.addProductToCart();

      cy.getByTestId("cart-link").should("contain", "1");

      cy.clickVisibleElement('[data-testid="cart-link"]');

      cy.url().should("include", "/cart");

      cy.getByTestId("cart-page").should("be.visible");

      cy.getCartLineItems().should("have.length", 1);

      cy.getByTestId("cart-total").should("be.visible");

      cy.clickVisibleElement('[data-testid="decrease-qty-btn"]');

      cy.getByTestId("empty-cart-state").should("be.visible");
    });

    it("user can increase and decrease cart quantity", () => {
      cy.openFirstProduct();

      cy.addProductToCart();

      cy.clickVisibleElement('[data-testid="increase-qty-btn"]');

      cy.getByTestId("quantity-display").should("contain", "2");

      cy.clickVisibleElement('[data-testid="decrease-qty-btn"]');

      cy.getByTestId("quantity-display").should("contain", "1");

      cy.getByTestId("decrease-qty-btn").should("be.visible");
    });

    it("persists cart items after page refresh", () => {
      cy.openFirstProduct();

      cy.addProductToCart();

      cy.getByTestId("cart-link").should("contain", "1");

      cy.reload();

      cy.getByTestId("cart-link").should("contain", "1");
    });

    it("shows empty cart state initially", () => {
      cy.clickVisibleElement('[data-testid="cart-link"]');

      cy.getByTestId("empty-cart-state").should("be.visible");

      cy.getByTestId("continue-shopping-btn").should("be.visible");
    });
  });
});
