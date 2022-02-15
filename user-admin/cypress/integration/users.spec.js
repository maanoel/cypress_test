describe("Gestão de usuários", () => {
  beforeEach(() => {
    cy.exec("npm --prefix ../user-api run clear:db");
  });

  describe("Listagem", () => {
    it("contendo 1 usuário", () => {
      cy.request("POST", "http://localhost:4000/users", {
        name: "Usuário 1",
        email: "manoelvitorbrito@gmail.com",
      }).should((response) => {
        expect(response.status).eq(201);
        cy.visit("/users");
        cy.wait(1000);
        cy.get(".MuiTable-root tbody tr").should("have.length", 1);
      });
    });

    it("sem usuarios", () => {
      cy.visit("/users");
      cy.wait(1000);
      cy.contains("No User Yet");
      cy.contains("");
      cy.contains("Do you want to add one?").should("exist");
      cy.contains("Create").should("exist");
    });
  });

  it("Criar um novo usuário", () => {
    //Abrir formulario cadastro
    cy.visit("/#/users");
    cy.get("a[aria-label=Create").click();

    //preencher o formulário
    cy.get("#name").type("vitor");
    cy.get("#email").type("manoelvitorbrito@gmail.com");

    //Enviar o formulário
    cy.get("button[type=submit]").click();

    cy.wait(1000);

    cy.get(".MuiListItemIcon-root > .MuiSvgIcon-root > path").click();

    cy.get(".MuiTable-root tbody tr").should("have.length", 1);
  });

  it("Editar usuario", () => {
    cy.request("POST", "http://localhost:4000/users", {
      name: "vitor",
      email: "manoelvitorbrito@gmail.com",
    }).should((response) => {
      expect(response.status).to.equal(201);
      cy.visit(`users/${response.body.id}`);

      //verifica estado inicial do formulário
      cy.wait(2000);
      cy.get("#name").should("have.value", "vitor");
      cy.get("#email").should("have.value", "manoelvitorbrito@gmail.com");

      //altera os dados do usuário

      cy.get("#name").clear().type("vitor");
      cy.get("#email").clear().type("manoelvitorbrito@gmail.com");
    });
  });
});
