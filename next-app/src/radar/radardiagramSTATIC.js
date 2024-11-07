let numPoints = 5; // Number of points (dimensions) for the radar chart
let radius = 200; // Radius of the radar chart
let points = []; // Array to hold the points' positions for the dataset
let radarColor; // Color for the radar chart

// Sample chemical data (simulating database values)
const chemicalData = {
  chemicals: [
    { name: 'Vanillin', value: 70 },
    { name: 'Acetone', value: 80 },
    { name: 'Guaiacol', value: 50 },
    { name: 'Acetic Acid', value: 60 },
    { name: 'Xylenol', value: 90 },
  ],
};

function setup() {
  createCanvas(900, 600);
  radarColor = color(180, 120, 60, 150);
  textSize(16);

  // Calculate points based on chemical values
  for (let j = 0; j < numPoints; j++) {
    let angle = (TWO_PI / numPoints) * j;
    let x =
      width / 2 +
      80 +
      cos(angle) * (chemicalData.chemicals[j].value / 100) * radius;
    let y =
      height / 2 +
      sin(angle) * (chemicalData.chemicals[j].value / 100) * radius;
    points.push(createVector(x, y));
  }
}

function draw() {
  background(255);
  drawTitle();
  drawValueLabels();

  // Draw radar chart
  stroke(radarColor);
  fill(radarColor);
  beginShape();
  for (let j = 0; j < numPoints; j++) {
    vertex(points[j].x, points[j].y);
  }
  endShape(CLOSE);

  // Draw axis lines and labels
  stroke(0);
  fill(0);
  for (let i = 0; i < numPoints; i++) {
    let angle = (TWO_PI / numPoints) * i;
    let x = width / 2 + 80 + cos(angle) * radius;
    let y = height / 2 + sin(angle) * radius;
    line(width / 2 + 80, height / 2, x, y);
    textAlign(CENTER, CENTER);
    text(chemicalData.chemicals[i].name, x, y - 10);
  }

  drawSpiderwebBorders();
}

function drawTitle() {
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(24);
  text('Radar Diagram - Whisky Chemicals', width / 2, 30);
  textAlign(LEFT);
  textSize(16);
}

function drawValueLabels() {
  fill(0);
  for (let i = 10; i <= 100; i += 10) {
    let r = map(i, 10, 100, radius / 10, radius);
    text(i, width / 2 + 50, height / 2 - r + 10);
  }
}

function drawSpiderwebBorders() {
  stroke(150);
  noFill();
  for (let i = 1; i <= 10; i++) {
    let r = (radius * i) / 10;
    beginShape();
    for (let j = 0; j < numPoints; j++) {
      let angle = (TWO_PI / numPoints) * j;
      let x = width / 2 + 80 + cos(angle) * r;
      let y = height / 2 + sin(angle) * r;
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
