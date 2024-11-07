let numPoints = 5; // Number of points (dimensions) for the radar chart
let radius = 200; // Radius of the radar chart
let points = []; // Array to hold the points' positions for the dataset
let dragging = []; // Array to track if a point is being dragged
let values = [0.7, 0.8, 0.5, 0.6, 0.9]; // Dataset with only 5 values
let labels = ['Vanillin', 'Acetone', 'Guaiacol', 'Acetic Acid', 'Xylenol']; // Axis labels
let inputNames = []; // Array for input names
let radarColor; // Color for the radar chart
let webValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; // Values for the spiderweb effect
let inputMode = false; // Toggle input mode
let currentInputIndex = -1; // Track which point is being renamed
let submitClicked = false; // Track if submit button is clicked
let submitFlashDuration = 30; // Flash duration for animation (in frames)

function setup() {
  createCanvas(900, 600); // Increased width to allow space for the diagram
  radarColor = color(180, 120, 60, 150); // Set the radar color
  textSize(16);

  // Initialize points positions for the dataset
  for (let j = 0; j < numPoints; j++) {
    let angle = (TWO_PI / numPoints) * j;
    let x = width / 2 + 80 + cos(angle) * values[j] * radius; // Move diagram slightly to the left
    let y = height / 2 + sin(angle) * values[j] * radius;
    points.push(createVector(x, y));
    inputNames.push(labels[j]); // Initialize input names with default labels
    dragging.push(false); // Initialize dragging state
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

  // Allow dragging of points to update values
  for (let j = 0; j < numPoints; j++) {
    if (dragging[j]) {
      let dx = mouseX - (width / 2 + 80); // Update center point for dragging
      let dy = mouseY - height / 2;
      let axisIndex = j; // Snap to the correct axis
      let axisAngle = (TWO_PI / numPoints) * axisIndex; // Calculate the angle for the current axis
      let distFromCenter = dist(width / 2 + 80, height / 2, mouseX, mouseY);
      distFromCenter = constrain(distFromCenter, 0, radius); // Limit dragging to within the radar radius
      values[j] = distFromCenter / radius; // Update the value based on distance from center
      points[j].x = width / 2 + 80 + cos(axisAngle) * distFromCenter; // Constrain movement to axis line
      points[j].y = height / 2 + sin(axisAngle) * distFromCenter;
    }

    // Draw the draggable points
    fill(0);
    ellipse(points[j].x, points[j].y, 10, 10);
  }

  // Draw axis lines and labels
  stroke(0);
  fill(0);
  for (let i = 0; i < numPoints; i++) {
    let angle = (TWO_PI / numPoints) * i;
    let x = width / 2 + 80 + cos(angle) * radius; // Move axis lines and labels to the left
    let y = height / 2 + sin(angle) * radius;
    line(width / 2 + 80, height / 2, x, y);
    textAlign(CENTER, CENTER);
    text(inputNames[i], x, y - 10);
  }

  drawSpiderwebBorders();
  drawInputTable();
  drawSubmitButton();
  handleSubmitAnimation();
}

function drawTitle() {
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(24);
  text('Radar Diagram Version 1.0', width / 2, 30);
  textAlign(LEFT);
  textSize(16);
}

function drawValueLabels() {
  fill(0);
  for (let i = 0; i < webValues.length; i++) {
    let r = map(webValues[i], 10, 100, radius / 10, radius); // Map the values to the radius
    text(webValues[i], width / 2 + 50, height / 2 - r + 10);
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

function drawInputTable() {
  fill(240, 200, 150);
  rect(10, 20, 200, 180);
  fill(0);
  text('Chemicals', 30, 40);
  for (let i = 0; i < 5; i++) {
    if (currentInputIndex === i && inputMode) {
      fill(255);
    } else {
      fill(240, 200, 150);
    }
    rect(30, 50 + i * 30, 150, 25);
    fill(0);
    textAlign(LEFT, CENTER);
    text(inputNames[i], 40, 62 + i * 30);
  }
}

function drawSubmitButton() {
  fill(240, 200, 150);
  rect(width / 2 - 50, height - 50, 100, 40);
  fill(0);
  textAlign(CENTER, CENTER);
  text('Submit', width / 2, height - 30);
  textAlign(LEFT);
}

function handleSubmitAnimation() {
  if (submitClicked) {
    if (frameCount % 20 < 10) {
      fill(0, 255, 0);
    } else {
      fill(240, 200, 150);
    }
    rect(width / 2 - 50, height - 50, 100, 40);
    fill(0);
    textAlign(CENTER, CENTER);
    text('Submit', width / 2, height - 30);
    textAlign(LEFT);
    submitFlashDuration--;
    if (submitFlashDuration <= 0) {
      submitClicked = false;
      submitFlashDuration = 30;
    }
  }
}

function mousePressed() {
  for (let j = 0; j < numPoints; j++) {
    if (dist(mouseX, mouseY, points[j].x, points[j].y) < 10) {
      dragging[j] = true;
    }
  }
  for (let i = 0; i < 5; i++) {
    if (
      mouseX > 30 &&
      mouseX < 180 &&
      mouseY > 50 + i * 30 &&
      mouseY < 75 + i * 30
    ) {
      inputMode = true;
      currentInputIndex = i;
      return;
    }
  }
  if (
    mouseX > width / 2 - 50 &&
    mouseX < width / 2 + 50 &&
    mouseY > height - 50 &&
    mouseY < height - 10
  ) {
    submitClicked = true;
    inputMode = false;
  }
  inputMode = false;
}

function mouseReleased() {
  for (let j = 0; j < numPoints; j++) {
    dragging[j] = false;
  }
}

function keyPressed() {
  if (inputMode && currentInputIndex >= 0) {
    if (keyCode === BACKSPACE && inputNames[currentInputIndex].length > 0) {
      inputNames[currentInputIndex] = inputNames[currentInputIndex].substring(
        0,
        inputNames[currentInputIndex].length - 1,
      );
    } else if (
      keyCode !== BACKSPACE &&
      keyCode !== ENTER &&
      keyCode !== RETURN
    ) {
      inputNames[currentInputIndex] += key;
    }
  }
}
