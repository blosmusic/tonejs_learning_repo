//learning fft analysis
//resources used:
//https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
//https://github.com/mdn/content/blob/main/files/en-us/web/api/web_audio_api/visualizations_with_web_audio_api/index.md?plain=1
//https://github.com/mdn/voice-change-o-matic

//set up global variables
const visualiser = document.getElementById("visualiser");
const canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d"); //calls the canvas context
let audioSource;
let analyser;
let fft;

let freqSlider = document.getElementById("freq-slider");
let freqValue = document.getElementById("freq-value");
let wavetypeChecked = document.querySelectorAll('input[name="wave"]');
let wavetypeValue;
let waveType = "sine";

let frequencyOfOscillator = new Tone.Oscillator(freqSlider.value, waveType)
  .toDestination()
  .start();

// get microphone input
const meter = new Tone.Meter();
const mic = new Tone.UserMedia().connect(meter);
let frequencyValueRead = null;

mic
  .open()
  .then(() => {
    // promise resolves when input is available
    console.log("mic open");
    // what to do when the mic is open
    updateOscillator();
    setInterval(() => {
      // processAudioToFrequency();
      // processFFT();
    }, 10000);
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

// // create FFT processor
// function processFFT() {
//   console.log("processFFT called");

//   //process FFT method
//   fft = new Tone.FFT(32);
//   // osc.connect(fft).toDestination().start();
//   //process analyser method
//   analyser = new Tone.Analyser("fft", 32);
//   // osc.connect(analyser).toDestination();
//   // start ocs amd read data
//   meter.chain(fft, analyser);
//   console.log("FFT values:", fft.getValue());
//   console.log("Analyser values:", analyser.getValue());
//   console.log(
//     "Frequency of Note played is:",
//     osc.toFrequency(osc.frequency.value).toFixed(2)
//   );
// }

// visualiser.addEventListener("click", function () {
//   // const bufferLength = analyser.frequencyBinCount;
//   // const dataArray = new Uint8Array(bufferLength);

//   // const barWidth = (canvas.width / bufferLength) * 2.5;
//   // let barHeight;
//   // let x;
//   // //output data to canvas
//   // function animate() {
//   //   x = 0;
//   //   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   //   analyser.getByteFrequencyData(dataArray);
//   //   drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
//   //   requestAnimationFrame(animate);
//   // }
//   // animate();
// });

// function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray) {
//   for (let i = 0; i < bufferLength; i++) {
//     barHeight = dataArray[i];
//     const r = barHeight + 25 * (i / bufferLength);
//     const g = 250 * (i / bufferLength);
//     const b = 50;
//     ctx.fillStyle = "white";
//     ctx.fillRect(x, canvas.height - barHeight - 15, barWidth, 10);
//     ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
//     ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
//     x += barWidth + 1;
//   }
// }
