const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const now = Tone.now();

const clock = new Tone.Clock((time) => {
  console.log(time);
  synth.triggerAttackRelease("a4", "16n");
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
};