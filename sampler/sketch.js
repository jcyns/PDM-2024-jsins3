let soundFX, sample1, sample2, sample3, sample4;

function preload() {
  soundFX = new Tone.Players({
    boom : "assets/boom.mp3",

  }).toDestination();
}

function setup() {
  createCanvas(400, 400);

  sample1 = createButton('Vine');
  sample1.position (85,150);
  sample1.mousePressed(() =>soundFX.player ('boom').start() );

  sample2 = createButton('Sample 2');
  sample2.position(145,150);
  sample2.mousePressed(() => soundFX.player ('Sample 2').start());

  sample3 = createButton('Sample 3');
  sample3.position(235,150);
  sample3.mousePressed(() => soundFX.player ('Sample 3').start());
}

function draw() {
  background(220);
}
