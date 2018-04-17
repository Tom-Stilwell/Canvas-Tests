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

  let chars = [];
  const counts = {};
  // let char = randomChar();
  // let pos = [0, 0];
  // let velocity = 2;
  ctx.fillStyle = "lime";
  ctx.textBaseline = "top";
  ctx.font = `${charSize}px Orbitron`;

  for (let i = 0; i < W; i += charSize) {
    makeChar(i, 0, randomVel(), Math.random() * (H - 200) + 400);
    counts[i] = 1;
  }

  function makeChar(posX, posY, vel, max) {
    counts[posX]++;
    let fill = Math.floor(255 * (1 - ((counts[posX] - 1) % 20) / 20));
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
      if (char === null) {
        continue;
      }
      // if (char.pos[1] > char.max) {
      //   chars = chars.slice(0, i).concat(chars.slice(i + 1, chars.length));
      //   makeChar(char.pos[0], 0, char.vel, char.max);
      // }
      ctx.save();
      if (char.pos[1] + 5 * char.vel > char.max) {
        ctx.fillStyle = "white";
      } else {
        ctx.fillStyle = `rgb(0, ${char.fill}, 0)`;
      }
      ctx.fillText(char.value, ...char.pos);
      ctx.restore();
      char.pos[1] += char.vel;

      if (char.pos[1] === 20 && counts[char.pos[0]] < 20) {
        makeChar(char.pos[0], 0, char.vel, char.max);
      }

      if (char.pos[1] > char.max) {
        makeChar(char.pos[0], 0, char.vel, char.max);
        chars[i] = null;
      }
      // if (char.pos[1] === 20) {
      //   if (counts[char.pos[0]] < 10) {
      //     counts[char.pos[0]]++;
      //     makeChar(char.pos[0], 0, char.vel, char.max);
      //   }
      // }

      // if (char.pos[1] == 20) {
      //   if (counts[char.pos[0]]++ % 40 < 20) {
      //     makeChar(char.pos[0], 0, char.vel, char.max);
      //   } else {
      //     makeChar(char.pos[0], -100, char.vel, char.max);
      //   }
      // }
    }

    // for (var key in counts) {
    //   if (counts[key] >= 10) {
    //     counts[key]++;
    //     if (counts[key] >= 21) {
    //       makeChar(key, 0, randomVel(), Math.random() * H);
    //       counts[key] = 0;
    //     }
    //   }
    // }
  }

  function animate() {
    draw();
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});
