function setup() {
  createCanvas(700, 700);
}
function draw() {
  let white = color('#ffffff');
  let black = color('#000000');
  
  background(220);

  //example 1
  
  fill(0,255,0);
  rect(20,20,200,100);
  stroke(1);
  fill(white);
  rect(140,35,70,70);
  circle(70,70,70);


  //example 2
  noStroke(1);
  fill(white);
  rect(300,20,200,200);
  fill(255,0,0,90);
  circle(400,90,90);
  fill(0,255,0,90);
  circle(430,140,90);
  fill(0,0,255,90);
  circle(370,140,90);

  //example 3
  //pac-man ghost
  fill(black);
  rect(20,160,200,100);
  fill(255,0,0);
  rect(145,200,60,40);
  noStroke();
  circle(175,200,60);
  fill(white);
  circle(190,200,20);
  circle(160,200,20);
  fill(0,0,255);
  circle(190,200,10);
  circle(160,200,10);

  //pac-man
  fill(255,255,0);
  arc(70,210,80,80,180,2.4);

  //example 4
  fill(0,0,160);
  rect(20,300,200,200);
  fill(white);
  circle(120,400,120);
  fill(0,160,0);
  circle(120,400,110);

  fill(white);
  beginShape();
    vertex(105,370);
    vertex(120,333);
    vertex(135,370);
    vertex(180,370);
    vertex(140,400);
    vertex(160,460);
    vertex(120,420);
    vertex(80,460);
    vertex(100,400);
    vertex(60,370);
    endShape();

    fill(255,0,0)
    beginShape();
    vertex(108,373);
    vertex(120,338);
    vertex(132,373);
    vertex(175,372);
    vertex(137,397);
    vertex(156,454);
    vertex(119,416);
    vertex(82,457);
    vertex(103,400);
    vertex(67,372);
    endShape();

}
