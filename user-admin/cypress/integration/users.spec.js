describe("Gestão de usuários", () => {
  it("Criar um novo usuário", () => {
    //Abrir formulario cadastro
    cy.visit("#/users");
    cy.get("a[aria-label=Create").click();

    //preencher o formulário
    cy.get("#name").type("Joyn Doe");
    cy.get("#email").type("John does.com");

    //Enviar o formulário
    cy.get("button[type=submit]").click();
  });
});
