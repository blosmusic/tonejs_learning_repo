//allows access to audio context and creation including Safairi
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const heading = document.querySelector("h2");
heading.textContent = "CLICK HERE TO START AUDIO";
document.body.addEventListener("click", init);

function init() {
  heading.textContent = "AUDIO STARTED";
  document.body.removeEventListener("click", init);
  console.log("audio started");
}

//using audio files
const play100Sound = document.getElementById("play-100-sound");
const play250Sound = document.getElementById("play-250-sound");
const play440Sound = document.getElementById("play-440-sound");
let audioFile1 = new Audio();
let audioFile2 = new Audio();
let audioFile3 = new Audio();
audioFile1.src = "./sounds/100Hz.mp3";
audioFile2.src = "./sounds/250Hz.mp3";
audioFile3.src = "./sounds/440Hz.mp3";

play100Sound.addEventListener("click", function () {
  audioFile1.play();
});

play250Sound.addEventListener("click", function () {
  audioFile2.play();
});

play440Sound.addEventListener("click", function () {
  audioFile3.play();
});

//using oscillator nodes
let oscButton = document.getElementById("osc-button");
let pitch = document.querySelector("value");

//generate oscillator tones
let osc1 = audioCtx.createOscillator();
// let osc2 = audioCtx.createOscillator();
// let osc3 = audioCtx.createOscillator();

let gainNode = audioCtx.createGain();

osc1.type = "sine";
osc1.frequency.setValueAtTime(261.6, audioCtx.currentTime); //todo make osc1 frequency change with selected button
// osc2.type = "sine";
// osc2.frequency.setValueAtTime(329.63, audioCtx.currentTime);
// osc3.type = "sine";
// osc3.frequency.setValueAtTime(392.0, audioCtx.currentTime);

osc1.connect(gainNode);
// osc2.connect(gainNode);
// osc3.connect(gainNode);

gainNode.connect(audioCtx.destination);

gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.001);

osc1.start();
// osc2.start();
// osc3.start();

oscButton.onmousedown = function () {
  gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.001);
};

oscButton.onmouseup = function () {
  gainNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.001);
};
