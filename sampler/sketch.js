let soundFX, sample1, sample2, sample3, sample4;
let delaySlider, fbSlider, distSlider;

let sounds = new Tone.Players({
    boom : "assets/boom.mp3",


}).toDestination();

let delAmt = new Tone.Feedbackdelay("8n",0.5);
let distAmt = new Tone.Distortion(0.5);

sounds.connect(delAmt);
delAmt.connect(distAmt);
distAmt.toDestination();


function setup() {
  createCanvas(400, 400);

  sample1 = createButton('Vine');
  sample1.position (85,150);
  sample1.mousePressed(() =>sounds.player ('boom').start() );

  sample2 = createButton('Sample 2');
  sample2.position(145,150);
  sample2.mousePressed(() => sounds.player ('Sample 2').start());

  sample3 = createButton('Sample 3');
  sample3.position(235,150);
  sample3.mousePressed(() => sounds.player ('Sample 3').start());

  sample4 = createButton('Sample 4');
  sample4.position(320,150);
  sample4.mousePressed(() => sounds.player ('Sample 4').start());

  delaySlider = createSlider (0., 0.9, 0, 0.05);
  delaySlider.position (120,200);
  delaySlider.mouseMoved(() => delAmt.delayTime.value = delaySlider.value());
  
  fbSlider = createSlider (0., 0.9, 0 , 0.05);
  fbSlider.position (120,250);
  fbSlider.mouseMoved(() => delAmt.feedback.value = fbSlider.VALUE());

  distSlider = createSlider (0., 0.9, 0 , 0.05);
  distSlider.position (120,300);
  distSlider.mouseMoved(() => distAmt.Distortion = distSlider.VALUE());

}

function draw() {
  background(220);
}
