const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const now = Tone.now();
const time = 1;

//tells the browser to allow audio
document.querySelector("button")?.addEventListener("click", async () => {
  await Tone.start();
  console.log("audio is ready");
});

// create a timer that plays a note every 1s when button is pressed
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
// Tone.Transport.bpm.value = 60;

const note1 = new Tone.Loop((time) => {
  synth.triggerAttackRelease("C2", "8n", time);
}, "2n").start(0);
const note2 = new Tone.Loop((time) => {
  synth.triggerAttackRelease("F2", "8n", time);
}, "2n").start("4n");

const loopIO = () => {
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

//test sequence function
const seq1 = new Tone.Sequence(
  (time, note) => {
    synth.triggerAttackRelease(note, "16n", time);
    // subdivisions are given as subarrays
  },
  ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"],
).start(0);

const seq2 = new Tone.Sequence(
  (time, note) => {
    synth.triggerAttackRelease(note, "16n", time);
    // subdivisions are given as subarrays
  },
  ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"],
).start("8n");

const seqIO = () => {
  console.log("sequence pressed");

  currentvalue = document.getElementById("seqButton").value;
  if (currentvalue == "Off") {
    document.getElementById("seqButton").value = "On";
    Tone.Transport.start();
  } else {
    document.getElementById("seqButton").value = "Off";
    Tone.Transport.stop();
  }
}