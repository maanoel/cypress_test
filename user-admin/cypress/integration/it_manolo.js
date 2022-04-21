describe("Login de usuário", () => {
  beforeEach(() => {
    cy.Cookies.preserveOnce("JSESSIONID");
  });

  it("should login into application using an email and password", () => {
    cy.Cookies.defaults({
      preserve: "JSESSIONID",
    });

    cy.visit("https://ciaweb-homolog.conqueronline.com.br/login");

    //A máquina vai digitar o login e a senha
    cy.get("#email").type("matheus.miranda@escolaconquer.com.br");
    cy.get("#senha").type("conquer01");

    //Acesso a página de login, onde eu vou inserir o login e senha
    cy.request(
      "POST",
      "https://ciaweb-homolog.conqueronline.com.br/login?email=matheus.miranda%40escolaconquer.com.br&password=conquer01"
    ).should((response) => {
      const INGRESSCOOKIE = response.requestHeaders["cookie"].split(";")[0];
      const INGRESSCOOKIEVALUE = INGRESSCOOKIE.split("=")[1];

      const JSESSIONID = response.requestHeaders["cookie"].split(";")[1];
      const JSESSIONIDVALUE = JSESSIONID.split("=")[1];

      cy.Cookies.preserveOnce("INGRESSCOOKIE");
      cy.Cookies.preserveOnce("JSESSIONID");

      cy.setCookie("INGRESSCOOKIE", INGRESSCOOKIEVALUE);
      cy.setCookie("JSESSIONID", JSESSIONIDVALUE);

      cy.request("GET", "https://ciaweb-homolog.conqueronline.com.br/aluno");

      cy.visit("https://ciaweb-homolog.conqueronline.com.br/aluno");

      cy.url().should(
        "contain",
        "https://ciaweb-homolog.conqueronline.com.br/aluno"
      );
    });
  });
});
