let myShader;
let pic;
let vid;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function preload(){
  myShader = loadShader('shader.vert', 'shader.frag');
  pic = loadImage('image2.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {
  background(220);
  myShader.setUniform('uTexture', pic);
  myShader.setUniform('uWidth', width);
  myShader.setUniform('uHeight', height);
  shader(myShader);
  rect(0, 0, width, height);
  // image(pic, -width/2, -height/2, width, height);
}
