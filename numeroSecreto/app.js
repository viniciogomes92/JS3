let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, id, texto) {
  if (tag != '') {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );
  } else if (id != '') {
    let campo = document.getElementById(id);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );
  }
}

exibirTextoNaTela('h1', '', 'Jogo do Número Secreto');
exibirTextoNaTela('p', '', 'Escolha um número entre 1 e 10:');

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * 10 + 1);
  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
  }

}

function verificarChute () {
  let chute = parseInt(document.querySelector('input').value);
  console.log(chute, numeroSecreto);
  if (chute == numeroSecreto) {
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    exibirTextoNaTela('', 'resultado', `Parabéns, você acertou o número secreto em ${tentativas} ${palavraTentativa}.`);
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela('', 'resultado', 'O número secreto é menor.');
    } else {
      exibirTextoNaTela('', 'resultado', 'O número secreto é maior.');
    }
    tentativas++;
  }

  document.getElementById('reiniciar').removeAttribute('disabled');
};

function reiniciarJogo() {
  document.getElementById('reiniciar').setAttribute('disabled', true);
  
  exibirTextoNaTela('', 'resultado', '');

  document.querySelector('input').value = '';

  numeroSecreto = gerarNumeroAleatorio();

  tentativas = 1;
}