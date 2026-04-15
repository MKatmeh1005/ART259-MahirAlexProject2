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
let timeMult = 175;
let speedMult = 5;
let state = 0;
let sound1,
  sound2,
  sound3 = [];
let soundS = [];
let soundT = [];
let gauge = 0;
let isCharged = false;
let isRunning = false;
let isVisible = true;
let yamX = 350;
let hasPlayed = false;
let finishTime = 0;

function preload() {
  sky = loadImage("skies.png");
  ki_gif = loadImage("ki_animated.gif");
  saibaman = loadImage("saibaman.png");
  gauge_icon = loadImage("gauge_icon.png");
  gauge_bg = loadImage("gauge_background.png");
  sound3 = loadSound("Dragon Ball Voice 3.wav");
  soundS = loadSound("Dragon Ball Voice 4.wav");
  soundM = createAudio ("Dragon Ball Voice 5.wav");
  yamcha_sprite = loadImage("yamcha_sprite.png");
  yamcha_pr = loadImage("yamcha_pr.png");
  ending = loadImage("ending.gif");
  endingS = loadSound("endingS.mp3");
  kiH = loadSound("ki_hit.wav");
  saibaDead = loadSound("saibaman_dead.wav");
  gaugeS = loadSound("gauge_ready.ogg");
  theme = createAudio("battletheme.ogg");
  finish = loadSound("finish.mp3");
}

function setup() {
  let canvas = createCanvas(700, 800);
  canvas.parent("project");
  angleMode(DEGREES);
  noLoop();
}

function draw() {
  frameRate(60);
  background(sky);

  switch (state) {
    case 0:
      background(255, 165, 0);
      fill(0);
      textAlign(LEFT);

      textFont("Verdana");
      textSize(30);
      fill(20, 60, 20);
      text("Saibaman's Revenge", 198, 60);

      textSize(25);
      fill(200, 0, 0);
      text("to start the game", 245, 425);

      textSize(20);
      fill(0);
      textAlign(CENTER);
      text("You are a Saibaman. Your job is destroy Yamcha, a Z Fighter who is trying to protect Earth. You must evade the upcoming Ki blasts to survive long enough to retaliate against Yamcha. A special gauge will charge as you survive, and when you do survive, be sure to blow Yamcha up to smithereens. If you do, this will be your path towards Earth's Domination!!", 125, 100, 450);

      textSize(20);
      fill(0);
      text("Controls:", 100, 370);
      
      square(width / 5, height / 1.75, 70);
      square(width / 3.25, height / 1.5, 70);
      square(width / 5, height / 1.5, 70);
      square(width / 11, height / 1.5, 70);
      square(width / 2.08, height / 1.75, 70);
      square(width / 2.08, height / 1.45, 70);
      rect(width / 1.355, height / 1.55, 100, 80);
      rect(width / 1.5, height / 1.5, 150, 70);
      rectMode(CENTER);
      rect(width / 2, height / 2.2, 250, 70);
      
      text("to move", 175, 630);
      text("to kill Yamcha (only if gauge is full)", width / 1.27, height / 1.3, 150);
      text("Mute / Unmute music", width / 1.9, height / 1.26, 75)
      textSize(25);
      text("<<< Gauge", width / 3.2, height / 1.1);
      
      push();
      textFont('Verdana');
      fill(255);
      textSize(50);
      textAlign(CENTER);
      text("^", width / 4, height / 1.55);
      text(">", width / 2.7, height / 1.37);
      text("<", width / 7.5, height / 1.37);
      textSize(50);
      text("v", width / 4, height / 1.370);
      textSize(30);
      text("Enter", width / 1.26, height / 1.375);
      text("Space", width / 2, height / 2.13);
      text("M", width / 1.9, height / 1.6);
      text("P", width / 1.9, height / 1.35);
      pop();
      
      image(saibaman, 140, 30);
      image(saibaman, 515, 30);

      if (keyIsPressed && keyCode === 32) {
        state = 1;
        theme.play();
      }

      break;
    case 1:
      fill(0, 255, 0);
      ellipse(x, y, 50, 50);
      image(saibaman, x - 35, y - 30, 71, 70);
      theme.loop();

      if (keyIsDown(RIGHT_ARROW)) {
        x = x + speed;
      }

      if (keyIsDown(LEFT_ARROW)) {
        x = x - speed;
      }

      if (keyIsDown(DOWN_ARROW)) {
        y = y + speed;
      }

      if (keyIsDown(UP_ARROW)) {
        y = y - speed;
      }

      if (x > width) {
        x = x - speed;
      }

      if (x < 0) {
        x = x + speed;
      }

      if (y > height) {
        y = y - speed;
      }

      if (y < 0) {
        y = y + speed;
      }

      //Collision
      for (let i = ki.length - 1; i >= 0; i--) {
        ki[i].display();
        ki[i].move();

        let d = dist(x, y, ki[i].position.x, ki[i].position.y);

        if (d < 40) {
          kiH.play();
          sound3.play();
          ki.splice(i, 1);
          lives = lives - 1;
        } else if (ki[i].position.y > height + 100) {
          ki.splice(i, 1);
        }
      }

      if (millis() > timer) {
        ki.push(new Ki());
        timer = millis() + timeMult;
      }

      //halfway through phase 1
      if (millis() >= 60000) {
        timeMult = 150;
        speedMult = 5.5;
      }
      if (millis() >= 119999) {
        state = 2;
        soundM.play();
      }

      drawHearts();

      if (lives <= 0) {
        noLoop();
        saibaDead.play();
        textAlign(CENTER);
        fill(255, 0, 0);
        stroke(0);
        strokeWeight(4);
        textSize(80);
        textFont("Times New Roman");
        text("GAME OVER", width / 2, height / 2);
        theme.pause();
      }

      push();
      imageMode(CENTER);
      image(yamcha_pr, yamX, height / 2);
      pop();

      if (frameCount > 120) {
        yamX = 800;
      }
      break;
    case 2:
      fill(0, 255, 0);
      ellipse(x, y, 50, 50);
      image(saibaman, x - 35, y - 30, 71, 70);
      theme.loop();

      fill(255, 0, 0);
      ellipse(width / 2, height / 10, 50, 50);
      push();
      imageMode(CENTER);
      image(yamcha_sprite, width / 2, height / 11, 110, 110);
      pop();

      if (keyIsDown(RIGHT_ARROW)) {
        x = x + speed;
      }

      if (keyIsDown(LEFT_ARROW)) {
        x = x - speed;
      }

      if (keyIsDown(DOWN_ARROW)) {
        y = y + speed;
      }

      if (keyIsDown(UP_ARROW)) {
        y = y - speed;
      }

      if (x > width) {
        x = x - speed;
      }

      if (x < 0) {
        x = x + speed;
      }

      if (y > height) {
        y = y - speed;
      }

      if (y < 0) {
        y = y + speed;
      }

      //Collision
      for (let i = ki.length - 1; i >= 0; i--) {
        ki[i].display();
        ki[i].move();

        let d = dist(x, y, ki[i].position.x, ki[i].position.y);

        if (d < 40) {
          ki.splice(i, 1);
          sound3.play();
          kiH.play();
          lives = lives - 1;
        } else if (ki[i].position.y > height + 100) {
          ki.splice(i, 1);
        }
      }

      if (millis() > timer) {
        ki.push(new Ki());
        timer = millis() + timeMult;
      }

      drawHearts();

      if (lives <= 0) {
        noLoop();
        textAlign(CENTER);
        fill(255, 0, 0);
        stroke(0);
        strokeWeight(4);
        textSize(80);
        textFont("Times New Roman");
        text("GAME OVER", width / 2, height / 2);
        theme.pause();
        saibaDead.play();
      }
      //start of phase 2
      if (millis() >= 120000) {
        timeMult = 90;
        speedMult = 6;
      }
      //halfway through phase 2
      if (millis() >= 180000) {
        timeMult = 75;
      }
      //after 5 minutes
      if (millis() >= 240000) {
        timeMult = 60;
        speedMult = 6.5;
      }
      
      break;
    case 3:
      isVisible = false;
      background(0);
      push();
      imageMode(CENTER);
      image(ending, width / 2, height / 2, 700, 540);
      pop();
      theme.pause();
      finishTime++;
      if (finishTime === 530){
        finish.play();
      }
      if (finishTime > 530){
        textSize(50);
        textFont("Courier New");
        textAlign(CENTER);
        fill(255);
        text("DRAMATIC FINISH!", width / 2, height / 6);
      }
      if (finishTime > 650){
        text("Thank you for playing!", width / 2, height / 1.1);
      }
      break;
  }
  if (isVisible === true) {
    push();
    imageMode(CENTER);
    fill(0);
    strokeWeight(4);
    ellipse(width / 9, height / 1.1, 100, 100);
    image(gauge_bg, width / 9, height / 1.1);
    fill(255);
    strokeWeight(1);
    arc(width / 9, height / 1.1, 100, 100, 0, gauge);
    circle(width / 9, height / 1.1, 70);
    fill(0);
    ellipse(width / 9, height / 1.1, 70, 70);
    image(gauge_icon, width / 9, height / 1.1, 70, 70);
    pop();

    if (isRunning === true) {
      if (frameCount < 14400) {
        gauge = gauge + 1 / 40;
      }

      if (frameCount >= 14400) {
        isCharged = true;
        textSize(25);
        textFont("Verdana");
        textStyle(BOLD);
        fill(255, 0, 0);
        stroke(0);
        text("GAUGE FULL!", width / 6, height / 1.22);
      }

      if (isCharged === true) {
        if (keyCode === 13) {
          state = 3;
        }
      }
      if (frameCount === 14400) {
        gaugeS.play();
      }
    }

    if (state === 1 || state === 2) {
      isRunning = true;
    }
  }
}

function keyPressed() {
  if (state === 0 && keyIsPressed && keyCode === 32) {
    loop();
    soundS.play();
  }
  if (isCharged === true && keyCode === 13) {
    endingS.play();
  }
  if (keyCode === 77){
    theme.volume(0);
  }
  if (keyCode === 80){
    theme.volume(1);
  }
}

function drawHearts() {
  fill(255, 0, 0);
  textAlign(LEFT);
  for (let i = 0; i < lives; i++) {
    textSize(60);
    text("🟥", 100 + i * 55, 750);
  }
}


class Ki {
  constructor() {
    this.position = createVector(random(width), -30);
    this.size = 30;
  }
  display() {
    fill(255, 255, 0);
    ellipse(this.position.x, this.position.y, 30, 40);
    image(ki_gif, this.position.x - 24, this.position.y - 32, 48, 64);
  }
  move() {
    this.position.y = this.position.y + speedMult;
  }
}