let sine = new Tone.Synth({
  oscillator: {
    type: "sine"
  },
  envelope : {
    attack: 0.1,
    decay: 0.2,
    sustain: 0.5,
    release: 0.01,
  }
}).toDestination();

let sqaure = new Tone.Synth({
  oscillator: {
    type: "square"
  },
  envelope : {
    attack: 0.1,
    decay: 0.2,
    sustain: 0.5,
    release: 0.01,
  }
}).toDestination();

function setup() {
  createCanvas(400, 400);

mySelect = createSelect();
mySelect.position(100,100);
mySelect.option ('Sine');
mySelect.option ('Square');
mySelect.selected('Sine');

pitchSlider = createSlider(-12,12,-12,0.1);
pitchSlider.position (120,200);
pitchSlider.mouseMoved(() => bend.pitch = pitchSlider.value());
}

let notes = {
  'a' : 'C4',
  's' : 'D4',
  'd' : 'Eb4',
  'f' : 'F4',
  'g' : 'G4',
  'h' : 'Ab4',
  'j' : 'B4',
  'k' : 'C5'
}



function draw(){
  background(150,200,175);
  text("Play A through K and bend pitch with slider", 75, 150);
}

function keyPressed(){
  if(mySelect.selected() === 'Sine'){
  let playNotes = notes[key];
  sine.triggerAttackRelease(playNotes, 0.8);
} else if (mySelect.selected() === "Square"){
  let playNotes = notes[key];
  square.triggerAttackRelease(playNotes);
}

//function keyReleased(){
//  let playNotes = notes[key];
//  synth.triggerRelease(playNotes,'+0.03');
//}

function draw() {
  background(150, 200, 175);
  text("use key's A-K for the Synth", 113, 200)
}
}
