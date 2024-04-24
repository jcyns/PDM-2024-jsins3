let port;
let joyX = 0, joyY = 0, sw = 0;
let cursorX, cursorY;
let prevCursorX, prevCursorY; // Store previous cursor position
let cursorColor = "black";
let speed = 3;
let paint = true; // Set to true to start drawing
let lines = []; // Array to store drawn lines

function setup() {
  port = createSerial();
  createCanvas(900, 500);
  cursorX = width / 2;
  cursorY = height / 2;
  prevCursorX = cursorX; // Initialize previous cursor position
  prevCursorY = cursorY; // Initialize previous cursor position
  
  connectButton = createButton("Connect");
  connectButton.mousePressed(connect);
  
  undoButton = createButton("Undo");
  undoButton.mousePressed(undo);
}

function draw() {
  background(220);

  // Draw stored lines
  for (let i = 0; i < lines.length; i++) {
    let lineCoords = lines[i];
    stroke(lineCoords.color);
    strokeWeight(6);
    line(lineCoords.x1, lineCoords.y1, lineCoords.x2, lineCoords.y2);
  }
  
  let str = port.readUntil("\n");
  let values = str.split(",");
  if(values.length > 2){
    joyX = parseInt(values[0]);
    joyY = parseInt(values[1]);
    sw = parseInt(values[2]);
  }

  if (joyX > 0){
    cursorX += speed;
  } else if (joyX < 0){
    cursorX -= speed;
  }

  if (joyY > 0){
    cursorY += speed;
  } else if (joyY < 0){
    cursorY -= speed;
  }

  // Draw new line segment
  if(paint){ 
    stroke(cursorColor);
    strokeWeight(6);
    line(prevCursorX, prevCursorY, cursorX, cursorY);
    
    // Store line coordinates
    lines.push({
      x1: prevCursorX,
      y1: prevCursorY,
      x2: cursorX,
      y2: cursorY,
      color: cursorColor
    });
  }

  // Update previous cursor position
  prevCursorX = cursorX;
  prevCursorY = cursorY;
  
  // Update cursor color based on selected color
  updateCursorColor();
  
  // Display color options
  displayColorOptions();
}

function updateCursorColor() {
  noFill();
  stroke(cursorColor);
  strokeWeight(2);
  circle(cursorX, cursorY, 15);
}

function displayColorOptions() {
  noStroke();
  fill(255,0,0);
  rect(0,0,20,20);

  fill(255,165,0);
  rect(0,20,20,20)

  fill(255,255,0);
  rect(0,40,20,20)

  fill(0,255,0);
  rect(0,60,20,20);

  fill(0,255,255);
  rect(0,80,20,20)

  fill(0,0,255);
  rect(0,100,20,20)

  fill(255,0,255);
  rect(0,120,20,20);

  fill(150,75,0);
  rect(0,140,20,20);

  fill(255,255,255);
  rect(0,160,20,20);

  fill(0,0,0);
  rect(0,180,20,20);
}

function mousePressed(){
  // Check if mouse is over color options
  if (mouseX > 0 && mouseX < 20 && mouseY > 0 && mouseY < 20){
    cursorColor = color(255,0,0);
  }
  if (mouseX > 0 && mouseX < 20 && mouseY > 20 && mouseY < 40){
    cursorColor = color(255,165,0);
  }
  if (mouseX > 0 && mouseX < 20 && mouseY > 40 && mouseY < 60){
    cursorColor = color(255,255,0);
  }
  if (mouseX > 0 && mouseX < 20 && mouseY > 60 && mouseY < 80){
    cursorColor = color(0,255,0);
  }
  if (mouseX > 0 && mouseX < 20 && mouseY > 80 && mouseY < 100){
    cursorColor = color(0,255,255);
  }
  if (mouseX > 0 && mouseX < 20 && mouseY > 100 && mouseY < 120){
    cursorColor = color(0,0,255);
  }
  if (mouseX > 0 && mouseX < 20 && mouseY > 120 && mouseY < 140){
    cursorColor = color(255,0,255);
  }
  if (mouseX > 0 && mouseX < 20 && mouseY > 140 && mouseY < 160){
    cursorColor = color(150,75,0);
  }
  if (mouseX > 0 && mouseX < 20 && mouseY > 160 && mouseY < 180){
    cursorColor = color(255,255,255);
  }
  if (mouseX > 0 && mouseX < 20 && mouseY > 180 && mouseY < 200){
    cursorColor = color(0,0,0);
  }
}

function undo() {
  lines = []; // Clear the lines array
}

function connect(){
  if(!port.opened()){
    port.open('Arduino', 9600);
  } else {
    port.close();
  }
}
