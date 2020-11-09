describe("First test", () => {
  it("Navigates to App", () => {
    cy.visit("http://localhost:3001/");
    cy.url().should("include", "localhost");
  });

  it("Adds a Name", () => {
    cy.get('input[name="name"]')
      .type("Melanie")
      .should("have.value", "Melanie");
  });

  it("Adds a Password", () => {
    cy.get('input[name="password"]')
      .type("PASSWORD")
      .should("have.value", "PASSWORD");
  });

  it("Adds a Email", () => {
    cy.get('input[name="email"]')
      .type("melaniechele@gmail.com")
      .should("have.value", "melaniechele@gmail.com");
  });

  it("Checks Terms Box", () => {
    cy.get('input[name="terms"]').click();
  });
  it("Submits inputs", () => {
    cy.get("button.submit").should("not.be.disabled");
  });
});

describe("wont submit with missing inputs", () => {
  it("wont submit when email is missing", () => {
    cy.visit("http://localhost:3001/");

    cy.get('input[name="name"]').type("Melanie");
    cy.get('input[name="password"]').type("PASSWORD");
    cy.get('input[name="terms"]').click();
    cy.get("button").should("be.disabled");
  });
});

describe("Submit a user", () => {
  it("can submit a user", () => {
    cy.visit("http://localhost:3001/");
    cy.get('input[name="name"]').type("Melanie Chele");
    cy.get('input[name="email"]').type("melaniechele@gmail.com");
    cy.get('input[name="password"]').type("PASSWORD");
    cy.get('input[name="terms"]').click();
    cy.get("button").click();
  });
});
