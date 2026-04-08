/*
  checklist
  projectile
  projectile collision
  menu
  states
  second phase
  yamcha
  timers
  gauge
  presentation (art, sounds, background)
*/

let x = 350;
let y = 350;
let speed = 5;
let ki = [];
let timer = 0;
let currentKi = 0;
let lives = 3;
let timeMult = 200;
let speedMult = 4.5;


function preload() {
  sky = loadImage("skies.png");
}

function setup() {
  let canvas = createCanvas(700, 800);
  canvas.parent("project");
}

function draw() {
  frameRate(60);
  background(sky);
  fill(0, 255, 0);
  ellipse(x, y, 50, 50);
  
  if (keyIsDown(RIGHT_ARROW)){
    x = x + speed;
  }

  if (keyIsDown(LEFT_ARROW)){
    x = x - speed;
  }
  
  if (keyIsDown(DOWN_ARROW)){
    y = y + speed;
  }
  
  if (keyIsDown(UP_ARROW)){
    y = y - speed;
  }
  
  if (x > width){
    x = x - speed;
  }

  if (x < 0){
    x = x + speed;
  }
  
  if (y > height){
    y = y - speed;
  }
  
  if (y < 0){
    y = y + speed;
  }
  
  //Collision
for (let i = ki.length - 1; i >= 0; i--) {
  ki[i].display();
  ki[i].move();
  
let d = dist(x, y, ki[i].position.x, ki[i].position.y);
  
  if (d < 40) {
    ki.splice(i, 1);
    lives = lives - 1;
    console.log("Lives left: " + lives);
  }
  
  else if (ki[i].position.y > height + 100) {
    ki.splice(i, 1);
  }
  }
  
  if (millis() > timer){
    ki.push(new Ki());
    timer = millis() + timeMult;
  }
  
  
  //halfway through phase 1
  if (millis() >= 60000){
    timeMult = 150;
    speedMult = 5;
  }
  //start of phase 2
  if (millis() >= 120000){
    timeMult = 100;
    speedMult = 5.5;
  }
  //halfway through phase 2
  if (millis() >= 210000){
    timeMult = 75;
    speedMult = 6;
  }
  //after 5 minutes
  if (millis() >= 300000){
    timeMult = 5;
  }
  
  console.log(timeMult, speedMult);
  



drawHearts();

if (lives <= 0) {
  noLoop(); 
  textAlign(CENTER);
  fill(255, 0, 0);
  textSize(50);
  text("GAME OVER", width/2, height/2);
}
}

function drawHearts() {
  fill(255, 0, 0);
  textAlign(LEFT)
  for (let i = 0; i < lives; i++) {
    textSize(30);
   text("❤️" , 15 + (i * 40), 70); 
  }
}

class Ki{
  constructor(){
    this.position = createVector(random(width), -30);
    this.size = (30);
  }
  display(){
    fill(255, 255, 0);
    ellipse(this.position.x, this.position.y, 30, 40);
  }
  move(){
    this.position.y = this.position.y + speedMult;
  }

}
