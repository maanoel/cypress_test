describe("Gestão de usuários", () => {
  it("Criar um novo usuário", () => {
    cy.visit("#/users");
    cy.get("a[aria-label=Create").click();
  });
});
