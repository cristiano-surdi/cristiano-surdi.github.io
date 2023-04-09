const clicksDiv = document.getElementById("clicks");
const bpmP = document.getElementById("bpm");
const startBtn = document.getElementById("btn-start");
const stopBtn = document.getElementById("btn-stop");
let ghostSpeedSelect = document.getElementById('ghost-speed');
let selectedGhostSpeed = ghostSpeedSelect.value;
let isRunning = false;
let clickTimes = [];

function addClick() {
  const clickTime = Date.now();
  clickTimes.push(clickTime);
}

function clearClicks() {
  bpmP.innerText = "";
  clickTimes = [];
}

function calculateBPM() {
  if (clickTimes.length <= 1) {
    return 0;
  }
  const totalDuration = clickTimes[clickTimes.length - 1] - clickTimes[0];
  const intervals = clickTimes.slice(1).map((time, index) => time - clickTimes[index]);
  const averageInterval = intervals.reduce((total, interval) => total + interval, 0) / intervals.length;
  const bpm = 60 * 1000 / averageInterval;
  return bpm;
}

function start() {
  clickTimes = [];
  clearClicks();
  isRunning = true;
  clicksDiv.innerHTML = "Click Here";
}

function stop() {
  isRunning = false;
  const bpm = calculateBPM();
  const ghost = findGhost(bpm);
  bpmP.innerText = `${ghost}`;
  clicksDiv.innerHTML = `BPM: ${bpm.toFixed(2)}`;
}

function clickHandler() {
  if (isRunning) {
    addClick();
  }
}

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
clicksDiv.addEventListener("click", clickHandler);

const ghosts = [
  { name: "Normal Ghost", bpm: 115 },
  { name: "Twin Decoy", bpm: 135 },
  { name: "Twin Original", bpm: 100 },
  { name: "Revenant while roaming", bpm: 77 },
  { name: "Revenant while chasing", bpm: 209 },
  { name: "Thaye (early)", bpm: 192 },
  { name: "Moroi (at 0 sanity) or Hantu on cold temp", bpm: 157 },
  { name: "Raiju near electronics or Jinn with LoS", bpm: 174 },
];

function findGhost(bpm) {
  let closestGhost = null;
  let closestDifference = Infinity;
    
  ghostSpeedSelect.addEventListener('change', function() {selectedGhostSpeed = ghostSpeedSelect.value});
  let multipleSpeed = (selectedGhostSpeed/100);
  
  for (const ghost of ghosts) {
    const difference = Math.abs(ghost.bpm * multipleSpeed - bpm);
    if (difference < closestDifference) {
      closestDifference = difference;
      closestGhost = ghost;
    }
  }
  
  if (bpm == 0) {
	return `There are no ghosts with 0 BPM`;
  } else {
	return `The most likely ghost is ${closestGhost.name} (${closestGhost.bpm * multipleSpeed} BPM)`;		
  }
 
}