describe("Gestão de usuários", () => {
  beforeEach(() => {
    cy.exec("npm --prefix ../user-api run clear:db");
  });

  describe("Listagem", () => {
    it("contendo 1 usuário", () => {});

    it("sem usuarios", () => {});
  });

  it("Criar um novo usuário", () => {
    //Abrir formulario cadastro
    cy.visit("/#/users");
    cy.get("a[aria-label=Create").click();

    //preencher o formulário
    cy.get("#name").type("Joyn Doe");
    cy.get("#email").type("John does.com");

    //Enviar o formulário
    cy.get("button[type=submit]").click();

    cy.wait(1000);

    cy.get(".MuiListItemIcon-root > .MuiSvgIcon-root > path").click();

    cy.get(".MuiTable-root tbody tr").should("have.length", 1);
  });
});
