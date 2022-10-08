//learning fft analysis
//resources used:
//https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
//https://github.com/mdn/content/blob/main/files/en-us/web/api/web_audio_api/visualizations_with_web_audio_api/index.md?plain=1
//https://github.com/mdn/voice-change-o-matic

const heading = document.querySelector("h1");
heading.textContent = "CLICK HERE TO START AUDIO";
document.body.addEventListener("click", init);

function init() {
  heading.textContent = "AUDIO STARTED";
  document.body.removeEventListener("click", init);
  console.log("audio started");
}

const audioCtx = new (window.AudioContext || window.webkitAudioContext)(); //allows access to audio context and creation
const analyser = audioCtx.createAnalyser();

// Set up canvas context for visualizer
const canvas = document.querySelector(".visualizer");
const canvasCtx = canvas.getContext("2d");

let osc = audioCtx.createOscillator();
osc.type = "triangle";
osc.frequency.value = 73;
osc.connect(audioCtx.destination);
osc.start();
osc.stop();

// let fft = new Tone.FFT(256);

analyser.fftSize = 256;
analyser.minDecibels = -90;
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.85;

const bufferLength = analyser.frequencyBinCount;
console.log('buffer length is: ' + bufferLength);
const dataArray = new Uint8Array(bufferLength);

osc.connect(analyser);
analyser.connect(audioCtx.destination);

// let freqDomain = new Float32Array(analyser.frequencyBinCount);
// analyser.getFloatFrequencyData(freqDomain);

// function getFrequencyValue(freq) {
//   let nyquist = audioCtx.sampleRate / 2;
//   let index = Math.round((freq / nyquist) * freqDomain.length);
//   return freqDomain[index];
//   }

//   getFrequencyValue(osc);

// function draw() {
//   drawVisual = requestAnimationFrame(draw);

//   analyser.getByteTimeDomainData(dataArray);

//   canvasCtx.fillStyle = "rgb(200, 200, 200)";
//   canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

//   canvasCtx.lineWidth = 2;
//   canvasCtx.strokeStyle = "rgb(0, 0, 0)";

//   canvasCtx.beginPath();

//   const sliceWidth = (WIDTH * 1.0) / bufferLength;
//   let x = 0;

//   for (let i = 0; i < bufferLength; i++) {
//     const v = dataArray[i] / 128.0;
//     const y = (v * HEIGHT) / 2;

//     if (i === 0) {
//       canvasCtx.moveTo(x, y);
//     } else {
//       canvasCtx.lineTo(x, y);
//     }

//     x += sliceWidth;
//   }

//   canvasCtx.lineTo(canvas.width, canvas.height / 2);
//   canvasCtx.stroke();
// }
// draw();
