describe("Memory Matching Game", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  it("Renders the game", () => {
    cy.contains("Memory Matching Game").should("be.visible");
    cy.contains("Select Difficulty Level").should("be.visible");
  });

  it("Validates different modes", () => {
    cy.get("#easy").should("exist");
    cy.get("#normal").should("exist");
    cy.get("#hard").should("exist");
  });

  it("Starts game in easy mode", () => {
    cy.get("#easy").check();
    cy.contains("Start Game").click();
    cy.get(".card").should("have.length", 8);
  });

  it("Counts attempts correctly", () => {
    cy.get("#easy").check();
    cy.contains("Start Game").click();
    cy.get(".card").first().click();
    cy.get(".card").eq(1).click();
    cy.contains("Attempts: 1").should("be.visible");
  });
});
