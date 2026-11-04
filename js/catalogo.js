const gatos = [
  "gatos_ferrugem/gato-ferrugem1.jpg", "gatos_ferrugem/gato-ferrugem2.jpg",
  "gatos_ferrugem/gato-ferrugem3.jpg", "gatos_ferrugem/gato-ferrugem4.jpg",
  "gatos_fumaca/gato-fumaca1.jpg", "gatos_fumaca/gato-fumaca2.jpg",
  "gatos_mingau/gato-mingau1.jpg", "gatos_mingau/gato-mingau2.jpg",
  "gatos_nina/gato-nina1.jpg", "gatos_nina/gato-nina2.jpg",
  "gatos_pipoca/gato-pipoca1.jpg", "gatos_pipoca/gato-pipoca2.jpg"
];

const cachorros = [
  "cachorro_apollo/cachorro-apollo1.jpg",
  "cachorro_billy/cachorro-billy1.jpg", "cachorro_billy/cachorro-billy2.jpg",
  "cachorro_bolota/cachorro-bolota1.jpg", "cachorro_bolota/cachorro-bolota2.jpg",
  "cachorro_bolota/cachorro-bolota3.jpg", "cachorro_bolota/cachorro-bolota4.jpg",
  "cachorro_branquinhoedonatella/cachorro-branquinhoedonatella1.jpg", "cachorro_branquinhoedonatella/cachorro-branquinhoedonatella2.jpg",
  "cachorro_branquinhoedonatella/cachorro-branquinhoedonatella3.jpg", "cachorro_branquinhoedonatella/cachorro-branquinhoedonatella4.jpg",
  "cachorro_cambitinho/cachorro-cambitinho.jpg",
  "cachorro_chiquinho/cachorro-chiquinho1.jpg", "cachorro_chiquinho/cachorro-chiquinho2.jpg",
  "cachorro_chiquinho/cachorro-chiquinho3.jpg", "cachorro_chiquinho/cachorro-chiquinho4.jpg", "cachorro_chiquinho/cachorro-chiquinho5.jpg",
  "cachorro_cristal/cachorro-cristal.jpg",
  "cachorro_fiel/cachorro-fiel.jpg",
  "cachorro_frajola/cachorro-frajola3.jpg", "cachorro_frajola/cachorro-frajola2.jpg",
  "cachorro_frajola/cachorro-frajola1.jpg", "cachorro_frajola/cachorro-frajola4.jpg", "cachorro_frajola/cachorro-frajola5.jpg",
  "cachorro_hanna/cachorro-hanna1.jpg", "cachorro_hanna/cachorro-hanna2.jpg",
  "cachorro_luna/cachorro-luna1.jpg", "cachorro_luna/cachorro-luna2.jpg",
  "cachorro_luna/cachorro-luna3.jpg", "cachorro_luna/cachorro-luna4.jpg", "cachorro_luna/cachorro-luna5.jpg",
  "cachorro_negao/cachorro-negao1.jpg", "cachorro_negao/cachorro-negao2.jpg",
  "cachorro_negao/cachorro-negao3.jpg", "cachorro_negao/cachorro-negao4.jpg",
  "cachorro_perdigueiro/cachorro-perdigueiro.jpg",
  "cachorro_rex/cachorro-rex1.jpg", "cachorro_rex/cachorro-rex2.jpg",
  "cachorro_romeueestopa/cachorro-romeueestopa1.jpg", "cachorro_romeueestopa/cachorro-romeueestopa2.jpg",
  "cachorro_romeueestopa/cachorro-romeueestopa3.jpg", "cachorro_romeueestopa/cachorro-romeueestopa4.jpg",
  "cachorro_zeca/cachorro-zeca1.jpg", "cachorro_zeca/cachorro-zeca2.jpg"
];

const nomes = {
  "Cachorro 01": "Apollo", "Cachorro 02": "Billy", "Cachorro 03": "Bolota",
  "Cachorro 04": "Branquinho e Donatella", "Cachorro 05": "Cambitinho",
  "Cachorro 06": "Chiquinho", "Cachorro 07": "Cristal", "Cachorro 08": "Fiel",
  "Cachorro 09": "Frajola", "Cachorro 10": "Hanna", "Cachorro 11": "Luna",
  "Cachorro 12": "Negão", "Cachorro 13": "Perdigueiro", "Cachorro 14": "Rex",
  "Cachorro 15": "Romeu e Estopa", "Cachorro 16": "Zeca",
  "Gato 01": "Ferrugem", "Gato 02": "Fumaça", "Gato 03": "Mingau",
  "Gato 04": "Nina", "Gato 05": "Pipoca"
};

const grupos = (arquivos) => Object.values(arquivos.reduce((resultado, arquivo) => {
  const pasta = arquivo.split("/")[0];
  if (!resultado[pasta]) resultado[pasta] = [];
  resultado[pasta].push(arquivo);
  return resultado;
}, {}));

const escapar = (texto) => texto.replace(/&/g, "&amp;").replace(/"/g, "&quot;")
  .replace(/</g, "&lt;").replace(/>/g, "&gt;");

function montarCartoes(arquivos, tipo) {
  const pasta = tipo === "Gato" ? "gato" : "cachorro";
  return grupos(arquivos).map((imagens, indice) => {
    const nome = `${tipo} ${String(indice + 1).padStart(2, "0")}`;
    const grupo = imagens[0].split("/")[0];
    const imagensJson = escapar(JSON.stringify(imagens));
    return `<article class="cartao-catalogo">
      <button class="imagem-catalogo imagem-clicavel imagem-catalogo-${grupo}" type="button"
        data-pasta="${pasta}" data-imagens="${imagensJson}"
        data-nome="${nome}" aria-label="Ver fotos de ${nome}">
        <img src="../../imgs-${pasta}/${imagens[0]}" alt="${nome} disponível para adoção" loading="lazy">
        ${imagens.length > 1 ? `<span class="indicador-galeria">${imagens.length} fotos</span>` : ""}
      </button>
      <div class="conteudo-catalogo"><h3>${nomes[nome] || nome}</h3></div>
    </article>`;
  }).join("");
}

document.querySelector("#gatos .grade-catalogo").innerHTML = montarCartoes(gatos, "Gato");
document.querySelector("#cachorros .grade-catalogo").innerHTML = montarCartoes(cachorros, "Cachorro");

document.body.insertAdjacentHTML("beforeend", `
  <div class="modal-galeria" role="dialog" aria-modal="true" aria-labelledby="titulo-galeria" hidden>
    <div class="galeria-conteudo">
      <button class="fechar-galeria" type="button" aria-label="Fechar galeria">&times;</button>
      <h2 id="titulo-galeria"></h2>
      <div class="galeria-imagem">
        <button class="controle-galeria anterior" type="button" aria-label="Foto anterior">&#8592;</button>
        <img alt="">
        <button class="controle-galeria proxima" type="button" aria-label="Próxima foto">&#8594;</button>
      </div>
      <p class="contador-galeria"></p>
      <div class="miniaturas-galeria"></div>
    </div>
  </div>
`);

const modal = document.querySelector(".modal-galeria");
const imagemGaleria = modal.querySelector(".galeria-imagem img");
const tituloGaleria = modal.querySelector("#titulo-galeria");
const contadorGaleria = modal.querySelector(".contador-galeria");
const miniaturasGaleria = modal.querySelector(".miniaturas-galeria");
let imagensAtuais = [];
let indiceAtual = 0;

function atualizarGaleria() {
  const imagem = imagensAtuais[indiceAtual];
  imagemGaleria.src = `../../imgs-${modal.dataset.pasta}/${imagem}`;
  imagemGaleria.alt = `${tituloGaleria.textContent}, foto ${indiceAtual + 1}`;
  contadorGaleria.textContent = `${indiceAtual + 1} de ${imagensAtuais.length}`;
  miniaturasGaleria.querySelectorAll("button").forEach((botao, indice) => {
    botao.classList.toggle("selecionada", indice === indiceAtual);
  });
}

function abrirGaleria(botao) {
  imagensAtuais = JSON.parse(botao.dataset.imagens);
  indiceAtual = 0;
  modal.dataset.pasta = botao.dataset.pasta;
  tituloGaleria.textContent = nomes[botao.dataset.nome] || botao.dataset.nome;
  miniaturasGaleria.innerHTML = imagensAtuais.map((imagem, indice) =>
    `<button type="button" aria-label="Ver foto ${indice + 1}">
      <img src="../../imgs-${botao.dataset.pasta}/${imagem}" alt="">
    </button>`
  ).join("");
  miniaturasGaleria.querySelectorAll("button").forEach((miniatura, indice) => {
    miniatura.addEventListener("click", () => {
      indiceAtual = indice;
      atualizarGaleria();
    });
  });
  atualizarGaleria();
  modal.hidden = false;
  document.body.classList.add("galeria-aberta");
  modal.querySelector(".fechar-galeria").focus();
}

document.querySelectorAll(".imagem-clicavel").forEach((botao) => {
  botao.addEventListener("click", () => abrirGaleria(botao));
});
modal.querySelector(".fechar-galeria").addEventListener("click", () => {
  modal.hidden = true;
  document.body.classList.remove("galeria-aberta");
});
modal.querySelector(".anterior").addEventListener("click", () => {
  indiceAtual = (indiceAtual - 1 + imagensAtuais.length) % imagensAtuais.length;
  atualizarGaleria();
});
modal.querySelector(".proxima").addEventListener("click", () => {
  indiceAtual = (indiceAtual + 1) % imagensAtuais.length;
  atualizarGaleria();
});
modal.addEventListener("click", (evento) => {
  if (evento.target === modal) modal.querySelector(".fechar-galeria").click();
});
document.addEventListener("keydown", (evento) => {
  if (modal.hidden) return;
  if (evento.key === "Escape") modal.querySelector(".fechar-galeria").click();
  if (evento.key === "ArrowLeft") modal.querySelector(".anterior").click();
  if (evento.key === "ArrowRight") modal.querySelector(".proxima").click();
});
