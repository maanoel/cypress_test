describe("User Login", () => {
  it("should login into application using an email and password", () => {
    //O que caracteriza um teste automatizado?
    //Programar uma máquina, para que faça algo que o ser humano faria, poupando nosso tempo de humano para
    // desempenharmos atividades que exigem criatividade, coisa que a máquina não consegue fazer =)

    cy.visit("https://ciaweb-homolog.conqueronline.com.br/login");

    //A máquina vai digitar o login e a senha
    cy.get("#email").type("matheus.miranda@escolaconquer.com.br");
    cy.get("#senha").type("conquer01");

    // A máquina via http faz uma requisição, para um servidor
    //Percebeu como ela passou os dados de login e senha para o servidor?
    //Os dados foram passados na própria url, o nome disso é queryParams

    //A máquina vai clicar no botão de login
    cy.request(
      "POST",
      "https://ciaweb-homolog.conqueronline.com.br/login?email=matheus.miranda%40escolaconquer.com.br&password=conquer01"
    ).should((response) => {
      //Caso uma dia precise usar cookie
      // const INGRESSCOOKIE = response.requestHeaders["cookie"].split(";")[0];
      // const INGRESSCOOKIEVALUE = INGRESSCOOKIE.split("=")[1];

      // const JSESSIONID = response.requestHeaders["cookie"].split(";")[1];
      // const JSESSIONIDVALUE = JSESSIONID.split("=")[1];

      // cy.Cookies.preserveOnce("INGRESSCOOKIE");
      // cy.Cookies.preserveOnce("JSESSIONID");

      // cy.setCookie("INGRESSCOOKIE", INGRESSCOOKIEVALUE);
      // cy.setCookie("JSESSIONID", JSESSIONIDVALUE);

      cy.request("GET", "https://ciaweb-homolog.conqueronline.com.br/aluno");

      cy.visit("https://ciaweb-homolog.conqueronline.com.br/aluno");

      cy.url().should(
        "contain",
        "https://ciaweb-homolog.conqueronline.com.br/aluno"
      );
    });

    //Essa linha abaixo é executada antes do código que está dentro do should?
    //Mas por quê? Por que é quando enviamos um POST, ou um get para o servidor, precisamos esperar uma resposta.
    //A resposta do servidor é executada depois, dentro do should( isso se chama código assincrono, ele executa depois em algum momento)
    //Após realizar a requisição do POST, esse código é executado em seguida, pois a aplicação não deve ficar travada.

    let oCodigoDessaLinhaVaiExecutarAntesDoShould = "";
  });
});
