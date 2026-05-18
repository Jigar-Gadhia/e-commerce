declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId: (testId: string) => Chainable<JQuery<HTMLElement>>;
      getByRole: (
        role: string,
        options: { name: string | RegExp }
      ) => Chainable<JQuery<HTMLElement>>;
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

export {};
