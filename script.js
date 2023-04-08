const cliquesDiv = document.getElementById("cliques");
const bpmP = document.getElementById("bpm");
const btnIniciar = document.getElementById("btn-iniciar");
const btnParar = document.getElementById("btn-parar");
let isRunning = false;
let temposCliques = [];

function adicionarClique() {
  const tempoClique = Date.now();
  const divClique = document.createElement("div");
  //divClique.classList.add("clique");
  //divClique.innerText = `Clique ${temposCliques.length}`;
  //cliquesDiv.appendChild(divClique);
  temposCliques.push(tempoClique);
}

function limparCliques() {
  cliquesDiv.innerHTML = "";
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
}

function parar() {
  isRunning = false;
  const bpm = calcularBPM();
  bpmP.innerText = `BPM: ${bpm.toFixed(2)}`;
}

function cliqueHandler() {
  if (isRunning) {
    adicionarClique();
  }
}

btnIniciar.addEventListener("click", iniciar);
btnParar.addEventListener("click", parar);
document.addEventListener("click", cliqueHandler);

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
    return `O BPM fornecido não corresponde a nenhum fantasma. O fantasma mais próximo é ${fantasmaMaisProximo.nome} (${fantasmaMaisProximo.bpm} BPM).`;
  } else {
    return `O fantasma correspondente é ${fantasmaMaisProximo.nome} (${fantasmaMaisProximo.bpm} BPM).`;
  }
}

function parar() {
  isRunning = false;
  const bpm = calcularBPM();
  const fantasma = encontrarFantasma(bpm);
  bpmP.innerText = `BPM: ${bpm.toFixed(2)}. ${fantasma}`;
}