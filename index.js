document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("test-canvas");
  const ctx = canvasEl.getContext("2d");
  let W = window.innerWidth;
  let H = window.innerHeight;
  canvasEl.width = W;
  canvasEl.height = H;

  const charSize = 20;
  const color = [0, 255, 0];

  const characters = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";

  function randomChar() {
    return characters[Math.floor(Math.random() * characters.length)];
  }

  function randomVel() {
    let factors = [];

    for (let i = 1; i <= 10; i++) {
      if (charSize % i === 0) {
        factors.push(i);
      }
    }
    return factors[Math.floor(Math.random() * factors.length)] * 0.25;
  }

  const chars = [];
  const counts = {};
  // let char = randomChar();
  // let pos = [0, 0];
  // let velocity = 2;
  ctx.fillStyle = "lime";
  ctx.textBaseline = "top";
  ctx.font = `${charSize}px Orbitron`;

  for (let i = 0; i < W; i += charSize) {
    makeChar(i, 0, randomVel(), Math.random() * H, color);
    counts[i] = 1;
  }

  function makeChar(posX, posY, vel, max, fill) {
    chars.push({
      value: randomChar(),
      pos: [posX, posY],
      vel,
      max,
      fill
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    let char;
    for (let i = 0; i < chars.length; i++) {
      char = chars[i];
      if (char.pos[1] > char.max) {
        char.value = "";
      }
      if (char.pos[1] + 2 * char.vel > char.max) {
        ctx.fillStyle = "white";
      } else {
        ctx.fillStyle = "lime";
      }
      ctx.fillText(char.value, ...char.pos);
      char.pos[1] += char.vel;
      if (char.pos[1] == 20) {
        makeChar(char.pos[0], 0, char.vel, char.max);
      }
      // if (char.pos[1] == 20) {
      //   if (counts[char.pos[0]]++ % 40 < 20) {
      //     makeChar(char.pos[0], 0, char.vel, char.max);
      //   } else {
      //     makeChar(char.pos[0], -100, char.vel, char.max);
      //   }
      // }
    }
  }

  function animate() {
    draw();
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});
