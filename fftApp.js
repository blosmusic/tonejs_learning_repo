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

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let source;
let stream;

const analyser = audioCtx.createAnalyser();
analyser.minDecibels = -90;
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.85;

if (navigator.mediaDevices.getUserMedia) {
  console.log("getUserMedia supported.");
  const constraints = { audio: true };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      source = audioCtx.createMediaStreamSource(stream);

      visualize();
    })
    .catch(function (err) {
      console.log("The following gUM error occured: " + err);
    });
} else {
  console.log("getUserMedia not supported on your browser!");
}

function visualize() {
  WIDTH = canvas.width;
  HEIGHT = canvas.height;

  analyser.fftSize = 256;
  const bufferLength = analyser.frequencyBinCount;
  console.log(bufferLength);

  const dataArray = new Uint8Array(bufferLength);

  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

  function draw() {
    drawVisual = requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);

    canvasCtx.fillStyle = "rgb(0, 0, 0)";
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    const barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] / 2;

      canvasCtx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
      canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);

      x += barWidth + 1;
    }
  }
}
