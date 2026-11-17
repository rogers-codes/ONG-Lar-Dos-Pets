const formulario = document.getElementById("formulario-voluntario");
const mensagemRetorno = document.getElementById("mensagem-retorno");
const numeroWhatsApp = "5513996282186";

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const dados = new FormData(formulario);
  const disponibilidade = dados.get("disponibilidade");
  let disponibilidadeFormatada = "";

  if (disponibilidade) {
    const data = new Date(disponibilidade);
    disponibilidadeFormatada = data.toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short"
    });
  }

  const mensagem = [
    "Olá! Gostaria de me tornar voluntário na ONG Lar dos Pets.",
    "",
    `Nome: ${dados.get("nome")}`,
    `E-mail: ${dados.get("email")}`,
    `Telefone: ${dados.get("telefone")}`,
    `Cidade: ${dados.get("cidade")}`,
    `Disponibilidade: ${disponibilidadeFormatada}`,
    `Como posso ajudar: ${dados.get("mensagem")}`
  ].join("\n");

  const linkWhatsApp =
    `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

  window.open(linkWhatsApp, "_blank", "noopener,noreferrer");
  mensagemRetorno.textContent =
    "Confira os dados e envie a mensagem pelo WhatsApp.";
});
