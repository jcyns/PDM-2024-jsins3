let c = "black";
let synth;
let lines = []; // Array to store drawn lines
let playing = false; // Flag to indicate if the tone is currently playing
let baseFrequency = 200; // Base frequency for the tone
let frequencyStep = 50; // Frequency step for each pixel drawn

function setup() {
  createCanvas(900, 500);
  background(220);

  // Create a synth
  synth = new Tone.Synth().toDestination();
}

function draw() {
  if (mouseIsPressed) {
    // If mouse is pressed, draw line and play tone
    stroke(c);
    strokeWeight(6);
    line(mouseX, mouseY, pmouseX, pmouseY);
    if (!playing) {
      // If tone is not already playing, start playing it
      playTone();
      playing = true;
    }
  } else {
    // If mouse is released, stop playing tone
    if (playing) {
      stopTone();
      playing = false;
    }
  }

  noStroke();
  fill(255, 0, 0);
  rect(0, 0, 20, 20);

  fill(255, 165, 0);
  rect(0, 20, 20, 20);

  fill(255, 255, 0);
  rect(0, 40, 20, 20);

  fill(0, 255, 0);
  rect(0, 60, 20, 20);

  fill(0, 255, 255);
  rect(0, 80, 20, 20)

  fill(0, 0, 255);
  rect(0, 100, 20, 20)

  fill(255, 0, 255);
  rect(0, 120, 20, 20);

  fill(150, 75, 0);
  rect(0, 140, 20, 20);

  fill(255, 255, 255);
  rect(0, 160, 20, 20);

  fill(0, 0, 0);
  rect(0, 180, 20, 20);
}

function mousePressed() {
  if (mouseX < 20) {
    if (mouseY < 20) {
      c = color(255, 0, 0);
    } else if (mouseY < 40) {
      c = color(255, 165, 0);
    } else if (mouseY < 60) {
      c = color(255, 255, 0);
    } else if (mouseY < 80) {
      c = color(0, 255, 0);
    } else if (mouseY < 100) {
      c = color(0, 255, 255);
    } else if (mouseY < 120) {
      c = color(0, 0, 255);
    } else if (mouseY < 140) {
      c = color(255, 0, 255);
    } else if (mouseY < 160) {
      c = color(150, 75, 0);
    } else if (mouseY < 180) {
      c = color(255, 255, 255);
    } else {
      c = color(0, 0, 0);
    }
  } else {
    // Store the coordinates of the line drawn
    lines.push({ x1: pmouseX, y1: pmouseY, x2: mouseX, y2: mouseY });
  }
}

function playTone() {
  // Calculate the length of the drawn line
  let length = dist(pmouseX, pmouseY, mouseX, mouseY);
  // Map the length to a logarithmic scale for a smoother pitch shift
  let logLength = map(Math.log10(length + 1), 0, 2, 0, 1); // Adjust the range as needed
  // Calculate the frequency based on the mapped length
  let frequency = baseFrequency * pow(2, logLength);
  // Play the tone
  synth.triggerAttack(frequency);
}

function stopTone() {
  // Stop playing the tone
  synth.triggerRelease();
}

function keyPressed() {
  // If Ctrl key is pressed
  if (keyIsDown(CONTROL)) {
    // If Z key is also pressed
    if (key === 'z' || key === 'Z') {
      // Play a synth sound
      playUndoSound();
      
      // Remove the last drawn line
      lines.pop();
      // Redraw the canvas
      background(220);
      for (let line of lines) {
        stroke(c);
        strokeWeight(6);
        line(line.x1, line.y1, line.x2, line.y2);
      }
    }
  }
}

function playUndoSound() {
  // Play a synth sound when undoing
  let undoSynth = new Tone.Synth().toDestination();
  undoSynth.triggerAttackRelease("C4", "8n");
}
