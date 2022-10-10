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

visualiser.addEventListener("click", function () {
  //input data
  const osc = new Tone.Oscillator("C4").start();
  //process data
  analyser = new Tone.Analyser("fft", 32);
  // audioSource.connect(analyser);
  // audioSource.toDestination();
  osc.connect(analyser).toDestination();
  console.log(analyser.getValue());

  // const bufferLength = analyser.frequencyBinCount;
  // const dataArray = new Uint8Array(bufferLength);

  // const barWidth = (canvas.width / bufferLength) * 2.5;
  // let barHeight;
  // let x;
  // //output data to canvas
  // function animate() {
  //   x = 0;
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   analyser.getByteFrequencyData(dataArray);
  //   drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
  //   requestAnimationFrame(animate);
  // }
  // animate();
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