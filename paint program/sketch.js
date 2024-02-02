var c = "black";

function setup() {
  createCanvas(900, 500);
  background(220);
}

function draw() {
  
  if(mouseIsPressed){
      stroke(c);
      strokeWeight(6);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
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
  if (mouseX > 0 && mouseX < 20 && mouseY > 0 && mouseY < 20){
    c = color(255,0,0);
  }
  if (mouseX > 0 && mouseX < 20 && mouseY > 20 && mouseY < 40){
    c = color(255,165,0);
  }
  if (mouseX > 0 && mouseX < 20 && mouseY > 40 && mouseY < 60){
    c = color(255,255,0);
  }
  if (mouseX > 0 && mouseX < 20 && mouseY > 60 && mouseY < 80){
    c = color(0,255,0);
  }
  if (mouseX > 0 && mouseX < 20 && mouseY > 80 && mouseY < 100){
    c = color(0,255,255);
  }
  if (mouseX > 0 && mouseX < 20 && mouseY > 100 && mouseY < 120){
    c = color(0,0,255);
  }
  if (mouseX > 0 && mouseX < 20 && mouseY > 120 && mouseY < 140){
    c = color(255,0,255);
  }
  if (mouseX > 0 && mouseX < 20 && mouseY > 140 && mouseY < 160){
    c = color(150,75,0);
  }
  if (mouseX > 0 && mouseX < 20 && mouseY > 160 && mouseY < 180){
    c = color(255,255,255);
  }
  if (mouseX > 0 && mouseX < 20 && mouseY > 180 && mouseY < 200){
    c = color(0,0,0);
  }
}
