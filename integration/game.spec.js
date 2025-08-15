describe("Memory Matching Game", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  it("Displays game title", () => {
    cy.contains("Memory Matching Game").should("be.visible");
  });

  it("Has difficulty options", () => {
    cy.get("#easy").should("exist");
    cy.get("#normal").should("exist");
    cy.get("#hard").should("exist");
  });

  it("Starts game in easy mode", () => {
    cy.get("#easy").check();
    cy.contains("Start Game").click();
    cy.get(".cell").should("have.length", 8);
  });
});
