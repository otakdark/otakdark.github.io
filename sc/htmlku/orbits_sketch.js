const samplingFreq = 1;

let drawing;
let drawingState;
let cycleData;
let cycleTime;
let n;
let cycleCount;
let cycleColor;

function initialize() {
  drawing = [];
  drawingState = -1;
  cycleData = null;
  n = null;
  cycleCount = null;
  cycleTime = 0;
  cycleColor = color(255, 234, 176);
  hideSlider();
}

function setup() {
  createCanvas(400, 400);
  initialize();
}

function draw() {
  background(50);

  handleDrawing();
  drawDrawing();

  if (drawingState === 1 && !cycleData) {
    getCycleData();
  }

  if (drawingState === 1) {
    drawCycles();
    cycleTime += 2 * PI / samplingFreq;
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    changeSlider(-1);
  }
  if (keyCode === RIGHT_ARROW) {
    changeSlider(1);
  }
}

function mouseInCanvas() {
  return (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height);
}

function handleDrawing() {
  if (drawingState === 0) {
    if (!mouseIsPressed) {
      drawingState = 1;
      n = drawing.length;
      cycleCount = n;
      setCycleCountSliderRange();
      showSlider();
      return;
    }

    if (drawing.length > 0) {
      drawing.pop();
    }
    newPos = [mouseX - width / 2, mouseY - height / 2];
    drawing.push(newPos);
    if (drawing.length > 0) {
      drawing.push(drawing[0]);
    }
  }

  if (drawingState === -1 && mouseIsPressed && mouseInCanvas()) {
    drawingState = 0;
  }

  if (drawingState === 1 && mouseIsPressed && mouseInCanvas()) {
    initialize();
    drawingState = 0;
    hideSlider();
  }
}

function drawDrawing() {
  if (drawingState === 0) {
    stroke(255);
  } else if (drawingState === 1) {
    return;
  }

  strokeWeight(5);

  for (var i = 0; i < drawing.length; i++) {
    if (i > 0) {
      line(drawing[i - 1][0] + width / 2, drawing[i - 1][1] + height / 2, drawing[i][0] + width / 2, drawing[i][1] + height / 2);
    }
  }
}

function getCycleData() {
  let fft = nj.fft(drawing);
  fundamentalFreq = -samplingFreq / n; // negative to trace path in drawn order
  cycleData = [];

  for (var i = 0; i < n; i++) {
    if (i <= n / 2) {
      cycleData.push({
        freq: i * fundamentalFreq,
        amp: sqrt(fft.get(i, 0) ** 2 + fft.get(i, 1) ** 2) / n,
        phase: atan2(fft.get(i, 1), fft.get(i, 0))
      });
    } else {
      cycleData.push({
        freq: (i - n) * fundamentalFreq,
        amp: sqrt(fft.get(i, 0) ** 2 + fft.get(i, 1) ** 2) / n,
        phase: atan2(fft.get(i, 1), fft.get(i, 0))
      });
    }
  }

  cycleData.sort((a, b) => {
    return b.amp - a.amp;
  });
}

function drawCycles() {
  traced = [];
  for (var t = 0; t <= min(cycleTime, 2 * PI / samplingFreq * n) + 2 * PI / samplingFreq; t += 2 * PI / samplingFreq) {
    x = width / 2;
    y = height / 2;
    for (var i = 0; i < cycleCount; i++) {
      cycle = cycleData[i]
      newX = x + cycle.amp * cos(cycle.freq * t + cycle.phase);
      newY = y + cycle.amp * sin(cycle.freq * t + cycle.phase);

      x = newX;
      y = newY;
    }

    traced.push([x, y]);
  }

  stroke(255)
  strokeWeight(4);
  for (var i = 1; i < traced.length; i++) {
    line(traced[i - 1][0], traced[i - 1][1], traced[i][0], traced[i][1]);
  }

  stroke(cycleColor);
  strokeWeight(1);

  x = width / 2;
  y = height / 2;
  circle(x, y, 3);
  for (var i = 0; i < cycleCount; i++) {
    cycle = cycleData[i]
    newX = x + cycle.amp * cos(cycle.freq * cycleTime + cycle.phase);
    newY = y + cycle.amp * sin(cycle.freq * cycleTime + cycle.phase);

    noFill();
    circle(x, y, 2 * cycle.amp);
    fill(cycleColor);
    circle(newX, newY, 3);

    line(x, y, newX, newY);

    x = newX;
    y = newY;
  }
}