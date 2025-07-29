let listaDeNumerosSorteados = [];
let numeroLimite = 10;

// colocando titulo no <h1>
// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';

// colcoando conteudo no <p>
// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10:';

// função para preencher tags no html
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
};

function gerarNumeroAleatorio() {

    let numeroEscolhido =  parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    };

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    };
};

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
};

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
};

// acao do botao novo jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
};

let tentativas = 1;
let numeroSecreto = gerarNumeroAleatorio();
exibirMensagemInicial();

// açao do botão chutar
function verificarChute(){
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto){

        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{

        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor!');
        }else{
            exibirTextoNaTela('p', 'O número secreto é maior!');
        };
        
        tentativas++;
        limparCampo();

    };
};