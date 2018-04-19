/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("test-canvas");
  const ctx = canvasEl.getContext("2d");
  let W = window.innerWidth;
  let H = window.innerHeight;
  canvasEl.width = W;
  canvasEl.height = H;

  const charSize = Math.round(W / 70);
  const strandLength = Math.round(H / 40);
  console.log(strandLength);
  const color = [0, 255, 0];

  const characters = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";
  // const characters = "TOM";

  function randomChar() {
    return characters[Math.floor(Math.random() * characters.length)];
  }

  function randomVel() {
    let factors = [];

    for (let i = 1; i <= 4; i += 0.01) {
      i = Math.round(100 * i) / 100;
      if (charSize % i === 0) {
        factors.push(i);
      }
    }
    return factors[Math.floor(Math.random() * factors.length)] * 0.5;
  }

  // function randomVel() {
  //   return (Math.floor(Math.random() * 90) + 10) * 0.5;
  // }

  let chars = {};
  const counts = {};
  let id = 0;

  ctx.fillStyle = "lime";
  ctx.textBaseline = "top";
  ctx.font = `${charSize}px Orbitron`;

  for (let i = 0; i < W; i += charSize) {
    makeChar(i, 0, randomVel(), Math.random() * (H - charSize * strandLength) + charSize * strandLength);
    counts[i] = 1;
  }

  function makeChar(posX, posY, vel, max) {
    counts[posX]++;
    id++;
    let fill = Math.floor(255 * (1 - (counts[posX] - 1) % strandLength / strandLength));
    chars[id] = {
      id,
      value: randomChar(),
      pos: [posX, posY],
      vel,
      max,
      fill
    };
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    let switcher = chars[Math.floor(Math.random() * 400 + id - 400)];

    if (switcher !== undefined) {
      switcher.value = randomChar();
    }

    let char;
    for (var key in chars) {
      if (!chars.hasOwnProperty(key)) continue;

      char = chars[key];
      ctx.save();

      if (char.pos[1] + 5 * char.vel > char.max) {
        ctx.fillStyle = "white";
      } else {
        ctx.fillStyle = `rgb(0, ${char.fill}, 0)`;
      }

      ctx.fillText(char.value, ...char.pos);
      ctx.restore();
      char.pos[1] += char.vel;

      if (char.pos[1] === charSize && counts[char.pos[0]] < strandLength) {
        makeChar(char.pos[0], 0, char.vel, char.max);
      }

      if (char.pos[1] > char.max) {
        makeChar(char.pos[0], 0, char.vel, char.max);
        delete chars[char.id];
      }
    }
  }

  function animate() {
    draw();
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map