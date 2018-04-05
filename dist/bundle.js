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

  const video = document.getElementById("video");

  const snippets = {};
  const numSnippets = 4;

  function makeSnippets(num) {
    let source;
    let pos;
    let rows = Math.sqrt(num);
    let cols = Math.sqrt(num);
    let index = 1;
    for (let i = 1; i <= rows; i++) {
      for (let j = 1; j <= cols; j++) {
        source = [video.width * (1 - 1 / j), video.height * (1 - 1 / i), video.width / rows, video.height / cols];

        pos = [source[0], source[1]];

        snippets[index] = { source, pos };
        index++;
      }
    }
  }
  makeSnippets(numSnippets);

  const q1 = [0, 0, 320, 180];
  const q2 = [320, 0, 320, 180];
  const q3 = [0, 180, 320, 180];
  const q4 = [320, 180, 320, 180];

  const p1 = [0, 0];
  const p2 = [320, 0];
  const p3 = [0, 180];
  const p4 = [320, 180];
  const positions = Object.values(snippets).map(snip => snip.pos);

  const widthHeight = [320, 180];

  function drawVideo() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 1; i <= numSnippets; i++) {
      ctx.drawImage(video, ...snippets[i].source, ...snippets[i].pos, ...widthHeight);
    }
    // ctx.drawImage(video, ...q1, ...p1, ...widthHeight);
    // ctx.drawImage(video, ...q2, ...p2, ...widthHeight);
    // ctx.drawImage(video, ...q3, ...p3, ...widthHeight);
    // ctx.drawImage(video, ...q4, ...p4, ...widthHeight);
    // ctx.drawImage(video, 0, 0, 640, 360, 0, 0, 320, 240);
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
      if (x > pos[0] && x < pos[0] + widthHeight[0] && y > pos[1] && y < pos[1] + widthHeight[1]) {
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

  document.addEventListener("mousedown", e => {
    startClick = [e.clientX, e.clientY];
    console.log("down!");
    beingDragged = withinBounds(...startClick);
    console.log(snippets);
    console.log(beingDragged);
    startPos = snippets[beingDragged].pos.slice(0);
    // switch (beingDragged) {
    //   case 0:
    //     startPos = p1.slice(0);
    //     break;
    //   case 1:
    //     startPos = p2.slice(0);
    //     break;
    //   case 2:
    //     startPos = p3.slice(0);
    //     break;
    //   case 3:
    //     startPos = p4.slice(0);
    //     break;
    //   default:
    //     startPos = null;
    //     break;
    // }
    document.addEventListener("mousemove", onMouseMove);
  });

  document.addEventListener("mouseup", e => {
    e.preventDefault();
    document.removeEventListener("mousemove", onMouseMove);
    beingDragged = null;
  });

  function playVideo() {
    drawVideo();
    requestAnimationFrame(playVideo);
  }

  requestAnimationFrame(playVideo);
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map