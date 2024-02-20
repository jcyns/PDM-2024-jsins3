let bugs = [];
let squishedBugs = 0;
let timer = 30;
let bugSpeed = 1;
let bugSprite;
let bugDeadSprite;
let deadBugs = [];

function preload() {
  bugSprite = loadImage('assets/bug.png');
  bugDeadSprite = loadImage('assets/bugdead.png');
}

function setup() {
  createCanvas(600, 400);
  setInterval(countdown, 1000);
  spawnBugs(); // Call the function to spawn bugs when the game starts
}

function draw() {
  background(220);
  
  for (let bug of bugs) {
    bug.update();
    bug.display();
  }
  
  // Remove dead bugs after 5 seconds
  for (let i = deadBugs.length - 1; i >= 0; i--) {
    deadBugs[i].timer--;
    if (deadBugs[i].timer <= 0) {
      deadBugs.splice(i, 1);
    }
  }
  
  textSize(20);
  textAlign(LEFT, TOP);
  fill(0);
  text("Squished Bugs: " + squishedBugs, 10, 10);
  text("Time: " + timer, 10, 40);
}

function mouseClicked() {
  for (let i = bugs.length - 1; i >= 0; i--) {
    if (bugs[i].contains(mouseX, mouseY)) {
      squishedBugs++;
      bugs[i].squish();
      bugSpeed += 0.1;
      deadBugs.push({timer: 5});
      bugs.push(new Bug()); // Call the function to spawn a new bug after one is squished
      break; // Exit loop after squishing one bug
    }
  }
}

function countdown() {
  timer--;
  if (timer <= 0) {
    noLoop();
    textSize(40);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0);
    text("Game Over!", width / 2, height / 2);
  }
}

function spawnBugs() {
  bugs = []; // Clear existing bugs
  for (let i = 0; i < 10; i++) {
    bugs.push(new Bug());
  }
}

class Bug {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.diameter = 40;
    this.speed = bugSpeed;
    this.xSpeed = random(-this.speed, this.speed);
    this.ySpeed = random(-this.speed, this.speed);
    this.angle = 0;
    this.alive = true;
  }
  
  update() {
    if (!this.alive) return; // Don't update if dead
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    
    if (this.x > width || this.x < 0) {
      this.xSpeed *= -1;
    }
    if (this.y > height || this.y < 0) {
      this.ySpeed *= -1;
    }
    
    // Calculate angle of motion
    this.angle = atan2(this.ySpeed, this.xSpeed);
  }
  
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    imageMode(CENTER);
    if (this.alive) {
      image(bugSprite, 0, 0, this.diameter, this.diameter);
    } else {
      image(bugDeadSprite, 0, 0, this.diameter, this.diameter);
    }
    pop();
  }
  
  contains(px, py) {
    if (!this.alive) return false; // Dead bugs cannot be squished
    let d = dist(px, py, this.x, this.y);
    if (d < this.diameter / 2) {
      return true;
    } else {
      return false;
    }
  }
  
  squish() {
    this.alive = false;
  }
}

