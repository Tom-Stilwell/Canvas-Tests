document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("test-canvas");
  const ctx = canvasEl.getContext("2d");
  let W = window.innerWidth;
  let H = window.innerHeight;
  canvasEl.width = W;
  canvasEl.height = H;

  // ctx.globalCompositeOperation = "source-out";
  const colors = [
    "#80ff80",
    "#ff80d5",
    "#ff8533",
    "#ffff4d",
    "#84e1e1",
    "#ff99bb",
    "#ff531a",
    "#4d4dff"
  ];

  function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  const centers = [];
  const stems = [];
  const petals = [];

  function makeFlowers(num) {
    let center, stem, petal1, petal2, petal3, petal4;
    for (let i = 0; i < num; i++) {
      center = {
        x: Math.floor(Math.random() * (W - 200)) + 100,
        y: Math.floor(Math.random() * 200) + (H - 300),
        maxRadius: Math.floor(Math.random() * 10) + 5,
        color: randomColor()
      };

      stem = {
        x: center.x - center.maxRadius / 10,
        y: center.y + center.maxRadius / 2,
        width: center.maxRadius / 5,
        maxHeight: H - center.y
      };

      petal1 = {
        start: [center.x + center.maxRadius, center.y],
        maxPoint1: [
          center.x + 5 * center.maxRadius,
          center.y + 5 * center.maxRadius
        ],
        maxPoint2: [center.x + 5 * center.maxRadius, center.y],
        maxPoint3: [
          center.x + 5 * center.maxRadius,
          center.y - 5 * center.maxRadius
        ]
      };

      petal2 = {
        start: [center.x, center.y + center.maxRadius],
        maxPoint1: [
          center.x - 5 * center.maxRadius,
          center.y + 5 * center.maxRadius
        ],
        maxPoint2: [center.x, center.y + 5 * center.maxRadius],
        maxPoint3: [
          center.x + 5 * center.maxRadius,
          center.y + 5 * center.maxRadius
        ]
      };

      petal3 = {
        start: [center.x - center.maxRadius, center.y],
        maxPoint1: [
          center.x - 5 * center.maxRadius,
          center.y + 5 * center.maxRadius
        ],
        maxPoint2: [center.x - 5 * center.maxRadius, center.y],
        maxPoint3: [
          center.x - 5 * center.maxRadius,
          center.y - 5 * center.maxRadius
        ]
      };

      petal4 = {
        start: [center.x, center.y - center.maxRadius],
        maxPoint1: [
          center.x - 5 * center.maxRadius,
          center.y - 5 * center.maxRadius
        ],
        maxPoint2: [center.x, center.y - 5 * center.maxRadius],
        maxPoint3: [
          center.x + 5 * center.maxRadius,
          center.y - 5 * center.maxRadius
        ]
      };

      centers.push(center);
      stems.push(stem);
      petals.push(petal1, petal2, petal3, petal4);
    }
  }

  makeFlowers(20);

  // stem
  ctx.fillStyle = "green";

  const stemsInc = new Array(stems.length);

  for (let i = 0; i < stems.length; i++) {
    stemsInc[i] = {};
    stemsInc[i].x = stems[i].x;
    stemsInc[i].y = stems[i].y;
    stemsInc[i].width = stems[i].width;
    stemsInc[i].height = 0;
  }

  function drawStems() {
    let stem;
    for (let i = 0; i < stemsInc.length; i++) {
      stem = stemsInc[i];

      if (Math.round(stem.height) === stems[i].maxHeight) {
        continue;
      } else {
        ctx.fillRect(stem.x, stem.y, stem.width, stem.height);
        stem.height += (stems[i].maxHeight - stem.height) / 10;
      }
    }
  }

  ctx.save();
  ctx.beginPath();

  const petalsInc = new Array(petals.length);

  for (let i = 0; i < petals.length; i++) {
    petalsInc[i] = {};
    petalsInc[i].start = petals[i].start.slice();
    petalsInc[i].point1 = petals[i].start.slice();
    petalsInc[i].point2 = petals[i].start.slice();
    petalsInc[i].point3 = petals[i].start.slice();
  }

  function drawPetals() {
    let petalInc;
    let petal;
    for (let i = 0; i < petalsInc.length; i++) {
      petalInc = petalsInc[i];
      petal = petals[i];

      if (Math.round(petalInc.point1[0]) === petals[i].maxPoint1[0]) {
        continue;
      } else {
        makePetal(petalInc);

        petalInc.point1[0] += (petal.maxPoint1[0] - petal.start[0]) / 250;
        petalInc.point1[1] += (petal.maxPoint1[1] - petal.start[1]) / 250;
        petalInc.point2[0] += (petal.maxPoint2[0] - petal.start[0]) / 250;
        petalInc.point2[1] += (petal.maxPoint2[1] - petal.start[1]) / 250;
        petalInc.point3[0] += (petal.maxPoint3[0] - petal.start[0]) / 250;
        petalInc.point3[1] += (petal.maxPoint3[1] - petal.start[1]) / 250;
      }
    }
  }

  function makePetal(petal) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(petal.start[0], petal.start[1]);
    ctx.quadraticCurveTo(
      petal.point1[0],
      petal.point1[1],
      petal.point2[0],
      petal.point2[1]
    );
    ctx.quadraticCurveTo(
      petal.point3[0],
      petal.point3[1],
      petal.start[0],
      petal.start[1]
    );
    ctx.closePath();
    ctx.fillStyle = randomColor();
    ctx.fill();
    ctx.restore();
  }

  // center

  const centersInc = new Array(centers.length);

  for (let i = 0; i < centers.length; i++) {
    centersInc[i] = centers[i];
    centersInc[i].radius = 0;
  }

  function makeCenter(x, y, radius, color) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  function drawCenters() {
    let center;
    let centerInc;
    for (let i = 0; i < centersInc.length; i++) {
      center = centers[i];
      centerInc = centersInc[i];
      if (Math.round(centerInc.radius) === center.maxRadius) {
        // alert("centers");
        continue;
      } else {
        makeCenter(centerInc.x, centerInc.y, centerInc.radius, centerInc.color);
        centerInc.radius += (center.maxRadius - centerInc.radius) / 100;
      }
    }
  }

  function draw() {
    drawCenters();
    drawStems();
    drawPetals();
    // ctx.clearRect(0, 0, W, H);
    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
});
