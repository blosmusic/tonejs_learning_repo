const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const now = Tone.now();
const time = 1;

//
document.querySelector("button")?.addEventListener("click", async () => {
  await Tone.start();
  console.log("audio is ready");
});

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

const note1 = new Tone.Loop(time => {
  synth.triggerAttackRelease("e3", "8n", time);
}, "4n").start(0);
const note2 = new Tone.Loop((time) => {
  synth.triggerAttackRelease("a3", "8n", time);
}, "4n").start("8n");

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