let myShader;
let pic;
let vid;
let colors = [];

function windowResized() {
  resizeCanvas(windowWidth, windowHeight-20);
}

function preload(){
  myShader = loadShader('shader.vert', 'shader.frag');
  pic = loadImage('image2.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight-30, WEBGL);
  noStroke();
  for (let i = 0; i < 5; i++){
    let x = createColorPicker([random(255), random(255), random(255)]);
    colors.push(x);
  }
}

function draw() {
  background(220);
  shader(myShader);

  myShader.setUniform('uTexture', pic);
  myShader.setUniform('uWidth', width);
  myShader.setUniform('uHeight', height);
  for (let i = 0; i < 5; i++){
    myShader.setUniform(`uColor${i}`, [red(colors[i].value())/255,green(colors[i].value())/255,blue(colors[i].value())/255]);
  }
  rect(0, 0, width, height);
  // image(pic, -width/2, -height/2, width, height);
}
