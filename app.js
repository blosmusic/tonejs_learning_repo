let startButton = document.getElementById("startButton");
let tempoSlider = document.getElementById("tempoSlider");
let bpmDisplay = document.getElementById("bpmDisplay");

bpmDisplay.innerHTML = tempoSlider.value;

tempoSlider.oninput = function () {
  bpmDisplay.innerHTML = this.value;
  Tone.Transport.bpm.value = tempoSlider.value;
};

let synth;
let loop = new Tone.Sequence(
  function (time, col) {
    console.log(col);
    synth.triggerAttackRelease("C2", "64n");
  },
  [0, 1, 2, 3, 4, 5, 6, 7],
  "8n"
).start(0);

let loop2 = new Tone.Sequence(
  function (time, col) {
    console.log(col);
    synth.triggerAttackRelease("F2", "64n");
  },
  [0, 1, 2, 3, 4, 5, 6, 7],
  "8n"
).start("16n");

Tone.Transport.on("stop", function () {
  console.log("loop stopped");
});
Tone.Transport.bpm.value = tempoSlider.value;
startButton.onclick = function () {
  if (!synth) {
    synth = new Tone.Synth().toMaster();
    console.log("created synth");
  }
  if (Tone.Transport.state !== "started") {
    Tone.Transport.start();
    startButton.innerText = "stop";
  } else {
    Tone.Transport.stop();
    startButton.innerText = "start";
  }
};
