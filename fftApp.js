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
let freqSlider = document.getElementById("freq-slider");
let freqValue = document.getElementById("freq-value");

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
    processAudioToFrequency();
  })
  .catch((e) => {
    // promise is rejected when the user doesn't have or allow mic access
    console.log("mic not open");
  });

function processAudioToFrequency() {
  console.log("processAudioToFrequency called");

  // print the incoming mic levels in decibels
  setInterval(() => {
    console.log("The Decibel level is:", meter.getValue().toFixed(2), "dB");

    //TODO convert decibel level to integer value
    frequencyValueRead = meter.getValue();
    console.log("The frequencyValueRead value is:", frequencyValueRead);

    const hertz = Tone.Frequency(frequencyValueRead, "hz")
      .toFrequency()
      .toFixed(2);
    console.log("The Frequency is:", hertz, "Hz");
  }, 1000);
}

freqValue.textContent = freqSlider.value;

freqSlider.oninput = function () {
  freqValue.textContent = this.value;
};

//todo: change the frequency of the oscillator
let freq = freqSlider.value;
console.log("Slider value: ", freq);

//todo: read the frequency slider value and change the oscillator frequency
const osc = new Tone.Oscillator(freq).toDestination().start();
console.log(
  "Frequency of Note played is: " +
    osc.toFrequency(osc.frequency.value).toFixed(2)
);

//todo: get the frequency value after the slider is changed

// visualiser.addEventListener("click", function () {
//   //input data
//   const osc = new Tone.Oscillator("a3").toDestination().start();
//   const fft = new Tone.FFT(32);

//   osc.connect(fft);

//   console.log(fft.getValue());
//   //process data
//   // analyser = new Tone.Analyser("fft", 32);
//   // audioSource.connect(analyser);
//   // audioSource.toDestination();
//   // osc.connect(analyser).toDestination();

//   // console.log(analyser.getValue());
//   // get frequency data of the audio source - osc
//   console.log(
//     "Frequency of Note played is: " +
//       osc.toFrequency(osc.frequency.value).toFixed(2)
//   );

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
