const playMobileSound = document.querySelector(".playMobileSound");
let oscButton = document.getElementById("osc-button");

//generate oscillator tones
let osc1 = audioCtx.createOscillator();
let osc2 = audioCtx.createOscillator();
let osc3 = audioCtx.createOscillator();
let gainNode = audioCtx.createGain();

osc1.type = "sine";
osc1.frequency.value = 261.63;
osc2.type = "sine";
osc2.frequency.value = 329.63;
osc3.type = "sine";
osc3.frequency.value = 392.0;

osc1.connect(gainNode);
osc2.connect(gainNode);
osc3.connect(gainNode);

gainNode.connect(audioCtx.destination);

gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.001);

osc1.start();
osc2.start();
osc3.start();

oscButton.onmousedown = function () {
    gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.001);
};

oscButton.onmouseup = function () {
    gainNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.001);
};
