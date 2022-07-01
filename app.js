const startStopButton = document.getElementById(".seqButton");

let isPlaying = false;
let isLooping = false;
let isSequencing = false;

startStopButton.addEventListener("click", () => {
    if (!isPlaying) {
        Tone.Transport.start();
        isPlaying = true;
        startStopButton.innerHTML = "Stop";
    } else {
        Tone.Transport.stop();
        isPlaying = false;
        startStopButton.innerHTML = "Start";
    }
});