document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("test-canvas");
  const ctx = canvasEl.getContext("2d");
  let W = window.innerWidth;
  let H = window.innerHeight;
  canvasEl.width = W;
  canvasEl.height = H;

  const video = document.getElementById("video");

  const snippets = {};
  const originalPositions = {};
  let numSnippets = 144;
  let movementSpeed = 100;

  function makeSnippets(num) {
    let source;
    let pos;
    let rows = Math.sqrt(num);
    let cols = Math.sqrt(num);
    let index = 1;
    for (let i = 1; i <= rows; i++) {
      for (let j = 1; j <= cols; j++) {
        source = [
          video.width * (1 - j / cols),
          video.height * (1 - i / rows),
          video.width / rows,
          video.height / cols
        ];

        pos = [source[0], source[1]];

        snippets[index] = { source, pos };
        originalPositions[index] = [pos[0], pos[1]];
        index++;
      }
    }
  }
  makeSnippets(numSnippets);

  function randomPos() {
    let x = Math.floor(Math.random() * (canvasEl.width - 100));
    let y = Math.floor(Math.random() * (canvasEl.height - 100));
    return [x, y];
  }

  const positions = Object.values(snippets).map(snip => snip.pos);

  const widthHeight = [
    video.width / Math.sqrt(numSnippets),
    video.height / Math.sqrt(numSnippets)
  ];

  function drawVideo() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 1; i <= numSnippets; i++) {
      if (
        snippets[i].incX &&
        ((snippets[i].pos[0] <= snippets[i].maxX && snippets[i].incX > 0) ||
          (snippets[i].pos[0] >= snippets[i].maxX && snippets[i].incX < 0)) &&
        ((snippets[i].pos[1] <= snippets[i].maxY && snippets[i].incY > 0) ||
          (snippets[i].pos[1] >= snippets[i].maxY && snippets[i].incY < 0))
      ) {
        snippets[i].pos[0] += snippets[i].incX;
        snippets[i].pos[1] += snippets[i].incY;
      }
      ctx.drawImage(
        video,
        ...snippets[i].source,
        ...snippets[i].pos,
        ...widthHeight
      );
    }
  }

  let startClick;
  let beingDragged;
  let offsetX;
  let offsetY;
  let startPos;
  let currentSnip;

  function withinBounds(x, y) {
    let pos;
    for (let i = 0; i < positions.length; i++) {
      pos = positions[i];
      if (
        x > pos[0] &&
        x < pos[0] + widthHeight[0] &&
        y > pos[1] &&
        y < pos[1] + widthHeight[1]
      ) {
        return i + 1;
      }
    }
    return null;
  }

  function onMouseMove(event) {
    event.preventDefault();
    if (event.clientX < 0 || event.clientY < 0 || beingDragged === null) {
      return;
    }
    offsetX = event.clientX - startClick[0];
    offsetY = event.clientY - startClick[1];
    currentSnip = snippets[beingDragged];
    currentSnip.pos[0] = startPos[0] + offsetX;
    currentSnip.pos[1] = startPos[1] + offsetY;
  }

  function reformVideo() {
    for (var key in snippets) {
      if (!snippets.hasOwnProperty(key)) continue;
      snippets[key].maxX = originalPositions[key][0];
      snippets[key].maxY = originalPositions[key][1];
      snippets[key].incX =
        (snippets[key].maxX - snippets[key].pos[0]) / movementSpeed;
      snippets[key].incY =
        (snippets[key].maxY - snippets[key].pos[1]) / movementSpeed;
    }
  }

  document.addEventListener("mousedown", e => {
    e.preventDefault();
    startClick = [e.clientX, e.clientY];
    console.log("down!");
    beingDragged = withinBounds(...startClick);
    if (beingDragged === null) {
      return;
    }
    startPos = snippets[beingDragged].pos.slice(0);
    document.addEventListener("mousemove", onMouseMove);
  });

  document.addEventListener("mouseup", e => {
    e.preventDefault();
    document.removeEventListener("mousemove", onMouseMove);
    beingDragged = null;
  });

  const scramble = document.getElementById("scramble");

  scramble.addEventListener("click", () => {
    let randomPosition;
    for (var key in snippets) {
      if (!snippets.hasOwnProperty(key)) continue;
      randomPosition = randomPos();
      snippets[key].maxX = randomPosition[0];
      snippets[key].maxY = randomPosition[1];
      snippets[key].incX =
        (snippets[key].maxX - snippets[key].pos[0]) / movementSpeed;
      snippets[key].incY =
        (snippets[key].maxY - snippets[key].pos[1]) / movementSpeed;
    }
  });

  const reform = document.getElementById("reform");

  reform.addEventListener("click", e => {
    e.stopPropagation();
    reformVideo();
    setTimeout(reformVideo, 5000);
  });

  const number = document.getElementById("number");

  // number.addEventListener("change", e => {
  //   numSnippets = number.value;
  //   makeSnippets(numSnippets);
  // });

  function playVideo() {
    drawVideo();
    requestAnimationFrame(playVideo);
  }

  requestAnimationFrame(playVideo);
});
