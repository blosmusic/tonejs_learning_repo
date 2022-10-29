//learning fft analysis
//resources used:
//https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
//https://github.com/mdn/content/blob/main/files/en-us/web/api/web_audio_api/visualizations_with_web_audio_api/index.md?plain=1
//https://github.com/mdn/voice-change-o-matic

//set up global variables
// get microphone input
const meter = new Tone.Meter();
const mic = new Tone.UserMedia().connect(meter);
let frequencyValueRead = null;

// set up frequency and canvas
const visualiser = document.getElementById("visualiser");
const canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d"); //calls the canvas context
let audioSource;

let freqSlider = document.getElementById("freq-slider");
let freqValue = document.getElementById("freq-value");
let wavetypeChecked = document.querySelectorAll('input[name="wave"]');
let wavetypeValue;
let waveType = "sine";

let toneFFT = new Tone.FFT(32);
let microphoneAnalyser = new Tone.Analyser("fft", 32);

let frequencyOfOscillator = new Tone.Oscillator(freqSlider.value, waveType)
  .toDestination()
  .start().stop();;

frequencyOfOscillator.connect(toneFFT);
meter.connect(microphoneAnalyser);

//ml5 library for pitch detection
const audioContext = new AudioContext();
// const MicStream = MicStream
const pitch = ml5.pitchDetection(
  "./model/",
  audioContext,
  MicStream,
  modelLoaded
);

// When the model is loaded
function modelLoaded() {
  console.log("Model Loaded!");
}

pitch.getPitch((err, frequency) => {
  console.log(frequency);
});

// mic in use from tone.js
mic
  .open()
  .then(() => {
    // promise resolves when input is available
    console.log("mic open");
    // what to do when the mic is open
    updateOscillator();
    setInterval(() => {
      processFFT();
      // processAudioToFrequency();
    }, 1000);
    
  })
  .catch((e) => {
    // promise is rejected when the user doesn't have or allow mic access
    console.log("mic not open");
  });

// get oscillator value
freqSlider.oninput = function () {
  freqValue.innerHTML = this.value;
  console.log("Slider value: ", freqValue.innerHTML, "Hz");
  updateOscillator();
};

let updateOscillator = function () {
  freqValue.innerHTML = freqSlider.value;
  console.log("Oscillator value: ", freqSlider.value, "Hz");
  frequencyOfOscillator.frequency.value = freqSlider.value;
};

// get wavetype value
wavetypeChecked.forEach(function (wavetypeValue) {
  wavetypeValue.oninput = function () {
    waveType = wavetypeValue.value;
    console.log("Wavetype: ", waveType);
    console.log("Wavetype value: ", wavetypeValue.value);
    updateWavetype();
  };
});

let updateWavetype = function () {
  console.log("Wavetype updated to:", waveType);
  frequencyOfOscillator.type = waveType;
};

// // convert audio to frequency
// function processAudioToFrequency() {
//   console.log("processAudioToFrequency called");

//   // print the incoming mic levels in decibels
//   console.log("The Decibel level is:", meter.getValue().toFixed(2), "dB");

//   //TODO convert decibel level to integer value
//   frequencyValueRead = Math.max(-100, meter.getValue());
//   console.log("The frequencyValueRead value is:", frequencyValueRead);

//   const hertz = Tone.Frequency(frequencyValueRead, "hz")
//     .toFrequency()
//     .toFixed(2);
//   console.log("The Frequency is:", hertz, "Hz");
// }

// create FFT processor
function processFFT() {
  console.log("processFFT called");
  //returns an array of values between -1 and 1 representing the frequency spectrum of the oscillator
  console.log("FFT values:", toneFFT.getValue()); 
  //returns an array of values between -1 and 1 representing the frequency spectrum of the microphone
  console.log("Analyser values:", microphoneAnalyser.getValue());
}

visualiser.addEventListener("click", function () {
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const barWidth = (canvas.width / bufferLength) * 2.5;
  let barHeight;
  let x;
  //output data to canvas
  function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
    requestAnimationFrame(animate);
  }
  animate();
});

function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray) {
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];
    const r = barHeight + 25 * (i / bufferLength);
    const g = 250 * (i / bufferLength);
    const b = 50;
    ctx.fillStyle = "white";
    ctx.fillRect(x, canvas.height - barHeight - 15, barWidth, 10);
    ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    x += barWidth + 1;
  }
}
