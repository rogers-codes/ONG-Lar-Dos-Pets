const formulario = document.getElementById("formulario-voluntario");
const mensagemRetorno = document.getElementById("mensagem-retorno");
const numeroWhatsApp = "5513997170586";

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const dados = new FormData(formulario);
  const mensagem = [
    "Olá! Gostaria de me tornar um voluntário na Lar dos Pets.",
    "",
    `Nome: ${dados.get("nome")}`,
    `E-mail: ${dados.get("email")}`,
    `Telefone: ${dados.get("telefone")}`,
    `Cidade: ${dados.get("cidade")}`,
    `Disponibilidade: ${dados.get("disponibilidade")}`,
    `Como desejo ajudar: ${dados.get("mensagem")}`
  ].join("\n");

  const linkWhatsApp =
    `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

  window.open(linkWhatsApp, "_blank", "noopener,noreferrer");
  mensagemRetorno.textContent =
    "Revise os dados e clique em enviar no WhatsApp.";
});
