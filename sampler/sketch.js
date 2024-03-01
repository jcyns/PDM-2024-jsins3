let sample1, sample2, sample3, sample4;
let delaySlider, fbSlider, distSlider;

let sounds = new Tone.Players({
    boom : "assets/boom.mp3",
    click :"assets/click.mp3",
    pikmin : "assets/pikmin.mp3",
    malichite : "assets/malichite.mp3",

}).toDestination();

let delAmt = new Tone.Feedbackdelay("8n",2);
let distAmt = new Tone.Distortion(1);

sounds.connect(delAmt);
delAmt.connect(distAmt);
distAmt.toDestination();


function setup() {
  createCanvas(400, 400);
  

  sample1 = createButton('Vine');
  sample1.position (65,150);
  sample1.mousePressed(() =>sounds.player ('boom').start() );

  sample2 = createButton('Click');
  sample2.position(125,150);
  sample2.mousePressed(() => sounds.player ('click').start());

  sample3 = createButton('Pikmin');
  sample3.position(215,150);
  sample3.mousePressed(() => sounds.player ('pikmin').start());

  sample4 = createButton('Malichite');
  sample4.position(300,150);
  sample4.mousePressed(() => sounds.player ('malichite').start());

  
  delaySlider = createSlider (0, 1, 0, 0.05);
  delaySlider.position (120,250);
  delaySlider.mouseMoved(() => delAmt.delayTime.value = delaySlider.value());
  text('Delay', 255, 260);
  
  fbSlider = createSlider (0, 0.9, 0 , 0.05);
  fbSlider.position (120,300);
  fbSlider.mouseMoved(() => delAmt.feedback.value = fbSlider.VALUE());
  text('Feedback', 255, 310);


  distSlider = createSlider (0, 0.9, 0 , 0.05);
  distSlider.position (120,350);
  distSlider.mouseMoved(() => distAmt.Distortion = distSlider.VALUE());
  text('Distortion', 255, 360);

}


