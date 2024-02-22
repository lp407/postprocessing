// let myShader;
// let pic;
// let vid;
// let colors = [];

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight-20);
// }

// function preload(){
//   myShader = loadShader('shader.vert', 'shader.frag');
//   pic = loadImage('image2.jpg');
// }

// function setup() {
//   createCanvas(windowWidth, windowHeight-30, WEBGL);
//   noStroke();
//   for (let i = 0; i < 5; i++){
//     let x = createColorPicker([random(255), random(255), random(255)]);
//     colors.push(x);
//   }
// }

// function draw() {
//   background(220);
//   shader(myShader);

//   myShader.setUniform('uTexture', pic);
//   myShader.setUniform('uWidth', width);
//   myShader.setUniform('uHeight', height);
//   for (let i = 0; i < 5; i++){
//     myShader.setUniform(`uColor${i}`, [red(colors[i].value())/255,green(colors[i].value())/255,blue(colors[i].value())/255]);
//   }
//   rect(0, 0, width, height);
//   // image(pic, -width/2, -height/2, width, height);
// }


let myShader;
let pic;
let vid;
let colors = [];
let serial; // Instance of the serialport library
let latestData = "waiting for data"; // Latest data from the serial port
let serialPortName = '/dev/ttyACM0';
let currentIndex = 0;

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
  for (let i = 0; i < 5; i++){
    let x = [random(255), random(255), random(255)];
    colors.push(x);
  }

  serial = new p5.SerialPort(); // Make a new instance of the serialport library
  serial.on('data', serialEvent); // Callback function for when new data arrives
  serial.openPort(serialPortName); // Open a serial port
}

function draw() {
  background(220);
  shader(myShader);

  myShader.setUniform('uTexture', pic);
  myShader.setUniform('uWidth', width);
  myShader.setUniform('uHeight', height);
  for (let i = 0; i < 5; i++){
    myShader.setUniform(`uColor${i}`, colors[i]);
  }
  rect(0, 0, width, height);
  // image(pic, -width/2, -height/2, width, height);
}

function serialEvent() {
  latestData = serial.readLine(); // Read the latest data from the serial port
  let data = latestData.split(',').map(Number); // Split the data on commas and convert to numbers
  console.log(data);
  if (data.length === 4) {
    // Set the current index and color using the values from the Arduino
    currentIndex = data[0];
    colors[currentIndex] = [data[1]/1023, data[2]/1023, data[3]/1023];//color(data[1]/1023, data[2]/1023, data[3]/1023);
  }
}