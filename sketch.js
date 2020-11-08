var particles1 = [];
var particles2 = [];

function setup() {
  createCanvas(640, 360);
  // var p = new Particle(random(width), 280, 2);
  // var q = new Particle(random(width), 100, 0.5);
  //   for (var i = 0; i<10; i++) {
  //   // 낮고 힘차게 쿵쾅쿵쾅
  //   particles1[i] = new Particle(200, 280, 2);
  //   // 높고 신나게 쿵쾅쿵쾅
  //   particles2[i] = new Particle(600, 100, 0.5);
  //   }
}

function keyTyped() {
  //jumping low
  if (key == 'a') {
    var p = new Particle(random(width), 280, 2);
    particles1.push(p);
  }
  //jumping high
  else if (key == 's') {
    var q = new Particle(random(width), 100, 0.5);
    particles2.push(q);
  }
  //out low
  else if (key == 'c') {
    particles1.splice(0, 1);
  }
  //out highaa
  else if (key == 'v') {
    particles2.splice(0, 1);
  }
}

function draw() {
  background(231,231,231);

  // 공에 무게감 주기
  var wind = createVector(0.02, 0);

  for (var i = 0; i < particles1.length; i++) {
    var gravity1 = createVector(0.1 * particles1[i], 0.8 * particles1[i].mass);
    particles1[i].applyForce(gravity1);

    if (mouseIsPressed) {
      particles1[i].applyForce(wind);
    }
    particles1[i].update();
    particles1[i].edges();
    particles1[i].display();
  }
 for(var i=0; i< particles2.length; i++) {
      var gravity2 = createVector(0.1 * particles2[i], 0.5 * particles2[i].mass);
    particles2[i].applyForce(gravity2);
   if (mouseIsPressed) {
     particles2[i].applyForce(wind);
   }
   particles2[i].update();
   particles2[i].edges();
   particles2[i].display();
 }
}
////////////////////////////////////////////////////

//function Particle
function Particle(x, y, m) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.mass = m;

  this.applyForce = function(force) {
    var f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  // 공 생김새
  this.display = function() {
    // drawHorn(this.pos.x,this.pos,y);
    drawGradient(this.pos.x, this.pos.y);
  }

  // function drawHorn(x,y) {
  //   fill(102,0,88);
  //   triangle(x-40,y-35,x,y-20,x-35,y);
  //   triangle(x+40,y-40,x,y-20,x+35,y);
  //   noStroke();
  // }

  function drawGradient(x, y) {
    //뿔
    fill(102, 0, 88);
    triangle(x - 40, y - 35, x, y - 20, x - 35, y);
    triangle(x + 40, y - 40, x, y - 20, x + 35, y);
    noStroke();
    //그라디언트
    frameRate(1000);
    ellipse(RADIUS);
    noStroke();
    let radius = 80
    let h = random(90, 91);
    for (let r = radius; r > 0; --r) {
      fill(h, 0, random(80, 100));
      ellipse(x, y, r, r);
      h = (h + 0.6) % 255;
    }
  }

  //화면 안에 공 가두기
  this.edges = function() {
    if (this.pos.y > height) {
      this.vel.y *= -1;
      this.pos.y = height;
    }

    if (this.pos.x > width) {
      this.vel.x *= -1;
      this.pos.x = width;
    }

    if (this.pos.x < 0) {
      this.vel.x *= -1;
      this.pos.x = 0;
    }
    if (this.pos.y < 0) {
      this.vel.y *= -1;
      this.pos.y = 0;
    }
  }
}
