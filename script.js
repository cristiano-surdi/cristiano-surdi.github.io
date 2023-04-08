const cliquesDiv = document.getElementById("cliques");
const bpmP = document.getElementById("bpm");
const btnIniciar = document.getElementById("btn-iniciar");
const btnParar = document.getElementById("btn-parar");
let isRunning = false;
let temposCliques = [];

function adicionarClique() {
  const tempoClique = Date.now();
  temposCliques.push(tempoClique);
}

function limparCliques() {
  bpmP.innerText = "";
  temposCliques = [];
}

function calcularBPM() {
  if (temposCliques.length <= 1) {
    return 0;
  }
  const duracaoTotal = temposCliques[temposCliques.length - 1] - temposCliques[0];
  const intervalos = temposCliques.slice(1).map((tempo, index) => tempo - temposCliques[index]);
  const intervaloMedio = intervalos.reduce((total, intervalo) => total + intervalo, 0) / intervalos.length;
  const bpm = 60 * 1000 / intervaloMedio;
  return bpm;
}

function iniciar() {
  temposCliques = [];
  limparCliques();
  isRunning = true;
  cliquesDiv.innerHTML = "Click Here";
}

function parar() {
  isRunning = false;
  const bpm = calcularBPM();
  const fantasma = encontrarFantasma(bpm);
  bpmP.innerText = `BPM: ${bpm.toFixed(2)}. ${fantasma}`;
  cliquesDiv.innerHTML = "";
}

function cliqueHandler() {
  if (isRunning) {
    adicionarClique();
  }
}

btnIniciar.addEventListener("click", iniciar);
btnParar.addEventListener("click", parar);
cliquesDiv.addEventListener("click", cliqueHandler);

const fantasmas = [
  { nome: "Normal", bpm: 115 },
  { nome: "Twin decoy", bpm: 135 },
  { nome: "Twin original", bpm: 100 },
  { nome: "Revenant while roaming", bpm: 77 },
  { nome: "Rev while chasing", bpm: 209 },
  { nome: "Thaye (early)", bpm: 192 },
  { nome: "Moroi (at 0 sanity)", bpm: 157 },
  { nome: "Raiju near electronics", bpm: 174 },
  { nome: "Jinn with LoS with breaker on", bpm: 174 }
];

function encontrarFantasma(bpm) {
  let fantasmaMaisProximo = null;
  let diferencaMaisProxima = Infinity;
  
  for (const fantasma of fantasmas) {
    const diferenca = Math.abs(fantasma.bpm - bpm);
    
    if (diferenca < diferencaMaisProxima) {
      diferencaMaisProxima = diferenca;
      fantasmaMaisProximo = fantasma;
    }
  }
  
  if (diferencaMaisProxima > 0) {
    return `The most likely ghost is ${fantasmaMaisProximo.nome} (${fantasmaMaisProximo.bpm} BPM).`;
  } else {
    return `The most likely ghost is ${fantasmaMaisProximo.nome} (${fantasmaMaisProximo.bpm} BPM).`;
  }
}