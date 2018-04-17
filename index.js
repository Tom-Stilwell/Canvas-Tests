document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("test-canvas");
  const ctx = canvasEl.getContext("2d");
  let W = window.innerWidth;
  let H = window.innerHeight;
  canvasEl.width = W;
  canvasEl.height = H;

  const charSize = 20;

  const characters = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";

  function randomChar() {
    return characters[Math.floor(Math.random() * characters.length)];
  }

  function randomVel() {
    return Math.random() * 3;
  }

  const chars = [];
  // let char = randomChar();
  // let pos = [0, 0];
  // let velocity = 2;
  ctx.fillStyle = "lime";
  ctx.textBaseline = "top";
  ctx.font = `${charSize}px Orbitron`;

  for (let i = 0; i < W; i += charSize) {
    makeChar(i, randomVel());
  }

  function makeChar(posX, vel) {
    chars.push({
      value: randomChar(),
      pos: [posX, 0],
      vel
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    let char;
    for (let i = 0; i < chars.length; i++) {
      char = chars[i];
      ctx.fillText(char.value, ...char.pos);
      char.pos[1] += char.vel;
    }
  }

  function animate() {
    draw();
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});
