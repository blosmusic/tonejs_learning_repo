const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const now = Tone.now();
const time = 1;

//tells the browser to allow audio
document.querySelector("button")?.addEventListener("click", async () => {
  await Tone.start();
  console.log("audio is ready");
});

//create a timer that plays a note every 1s when button is pressed
const clock = new Tone.Clock((time) => {
  console.log(time);
  synth.triggerAttackRelease("f3", "16n");
}, 1);

let playIO = () => {
  console.log("button pressed");

  currentvalue = document.getElementById("onoff").value;
  if (currentvalue == "Off") {
    document.getElementById("onoff").value = "On";
    clock.start();
  } else {
    document.getElementById("onoff").value = "Off";
    clock.stop();
  }
}

//create a loop with two notes and set bpm
Tone.Transport.bpm.value = 80;

const note1 = new Tone.Loop(time => {
  synth.triggerAttackRelease("e2", "8n", time);
}, "2n").start(0);
const note2 = new Tone.Loop((time) => {
  synth.triggerAttackRelease("a2", "8n", time);
}, "2n").start("4n");

let loopIO = () => {
  console.log("loop pressed");

  currentvalue = document.getElementById("loopButton").value;
  if (currentvalue == "Off") {
    document.getElementById("loopButton").value = "On";
    Tone.Transport.start();
  } else {
    document.getElementById("loopButton").value = "Off";
    Tone.Transport.stop();
  }
}