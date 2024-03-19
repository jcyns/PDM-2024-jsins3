function preload() {
  img = loadImage('assets/marioblock.JPG');
}

function setup() {
  createCanvas(400, 400);
  
  amSynth = new Tone.Synth({
    oscillator: {
      type: 'sine'
    },
    envelope: {
      attack: 0.005,
      decay: 0.1,
      sustain: 0,
      release: 0.1
    }
  }).toDestination();
}

function draw() {
  if (mouseIsPressed) {
    background(img);
  } else {
    background(240);
    text('press mouse', 150, height / 3);
  }
}

function mousePressed() {
  playCoinSound();
}

function playCoinSound() {
  amSynth.triggerAttackRelease(800, '8n');
}



