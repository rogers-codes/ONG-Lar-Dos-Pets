const botaoCopiarPix = document.querySelector('#botao-copiar-pix');
const chavePix = document.querySelector('#chave-pix');
const mensagemCopia = document.querySelector('#mensagem-copia');

if (botaoCopiarPix && chavePix && mensagemCopia) {
  botaoCopiarPix.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(chavePix.textContent.trim());
      mensagemCopia.textContent = 'Chave Pix copiada com sucesso!';
    } catch (error) {
      mensagemCopia.textContent = 'Não foi possível copiar. Selecione a chave manualmente.';
      console.error('Não foi possível copiar a chave Pix.', error);
    }
  });
}
