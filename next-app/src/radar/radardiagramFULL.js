let numPoints = 5; // Number of points (dimensions) for the radar chart
let radius = 200; // Radius of the radar chart
let points = []; // Array to hold the points' positions for the dataset
let radarColor; // Color for the radar chart
let searchInput; // Search input for whisky names

// Simulated whisky data database (replace with actual API fetch in production)
const whiskyDatabase = {
  "Highland Park": { chemicals: [{ name: "Vanillin", value: 70 }, { name: "Acetone", value: 80 }, { name: "Guaiacol", value: 50 }, { name: "Acetic Acid", value: 60 }, { name: "Xylenol", value: 90 }] },
  "Macallan": { chemicals: [{ name: "Vanillin", value: 60 }, { name: "Acetone", value: 65 }, { name: "Guaiacol", value: 55 }, { name: "Acetic Acid", value: 70 }, { name: "Xylenol", value: 85 }] },
  "Glenlivet": { chemicals: [{ name: "Vanillin", value: 80 }, { name: "Acetone", value: 75 }, { name: "Guaiacol", value: 65 }, { name: "Acetic Acid", value: 85 }, { name: "Xylenol", value: 60 }] }
};

// Initial data (set as empty until search is performed)
let currentWhiskyData = { chemicals: [] };

function setup() {
  createCanvas(900, 600);
  radarColor = color(180, 120, 60, 150);
  textSize(16);

  // Create search bar
  searchInput = createInput();
  searchInput.position(20, 620);
  searchInput.size(200);
  searchInput.attribute("placeholder", "Enter Whisky Name");

  // Search button
  const searchButton = createButton("Search");
  searchButton.position(searchInput.x + searchInput.width + 10, 620);
  searchButton.mousePressed(fetchWhiskyData);

  // Default empty points setup
  for (let j = 0; j < numPoints; j++) {
    points.push(createVector(width / 2, height / 2));
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
    if (currentWhiskyData.chemicals[j]) {
      vertex(points[j].x, points[j].y);
    }
  }
  endShape(CLOSE);

  // Draw axis lines and labels
  stroke(0);
  fill(0);
  for (let i = 0; i < numPoints; i++) {
    let angle = TWO_PI / numPoints * i;
    let x = width / 2 + 80 + cos(angle) * radius;
    let y = height / 2 + sin(angle) * radius;
    line(width / 2 + 80, height / 2, x, y);

    if (currentWhiskyData.chemicals[i]) {
      textAlign(CENTER, CENTER);
      text(currentWhiskyData.chemicals[i].name, x, y - 10);
    }
  }

  drawSpiderwebBorders();
}

function drawTitle() {
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("Radar Diagram - Whisky Chemicals", width / 2, 30);
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
    let r = radius * i / 10;
    beginShape();
    for (let j = 0; j < numPoints; j++) {
      let angle = TWO_PI / numPoints * j;
      let x = width / 2 + 80 + cos(angle) * r;
      let y = height / 2 + sin(angle) * r;
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}

// Function to fetch whisky data from the simulated database
function fetchWhiskyData() {
  const whiskyName = searchInput.value().trim();

  if (whiskyDatabase[whiskyName]) {
    currentWhiskyData = whiskyDatabase[whiskyName];

    // Update points positions based on new data
    points = [];
    for (let j = 0; j < numPoints; j++) {
      let angle = TWO_PI / numPoints * j;
      let valueRatio = currentWhiskyData.chemicals[j].value / 100;
      let x = width / 2 + 80 + cos(angle) * valueRatio * radius;
      let y = height / 2 + sin(angle) * valueRatio * radius;
      points.push(createVector(x, y));
    }
  } else {
    alert("Whisky not found in the database.");
  }
}
