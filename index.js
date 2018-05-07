import { dictionary } from "./dictionary.js";
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("test-canvas");
  const ctx = canvas.getContext("2d");
  const W = window.innerWidth;
  const H = window.innerHeight;

  canvas.width = W;
  canvas.height = H;

  // const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  // function randomChar() {
  //   return chars[Math.floor(Math.random() * chars.length)];
  // }

  ctx.font = "30px Arial";
  ctx.textBaseline = "top";
  ctx.fillText("Type your anagram:", 10, 50);
  const letters = new Array(7);
  let letterCount = 0;
  for (let i = 0; i < letters.length; i++) {
    letters[i] = {
      value: "",
      posX: 10 + i * 30,
      posY: 100
    };
  }

  drawLetters();
  let bestWord;

  document.addEventListener("keypress", event => {
    if (letterCount >= 7) {
      return;
    }
    letters[letterCount].value = event.key;
    drawLetters();
    letterCount++;
  });

  document.getElementById("reset").addEventListener("click", () => {
    resetLetters();
    drawLetters();
  });

  let shuffle;

  document.getElementById("submit").addEventListener("click", () => {
    let searchLetters = letters.map(letter => letter.value).join("");
    let found = false;
    let anagram = setTimeout(() => {
      getAnagram(searchLetters);
      found = true;
    }, 2000);
    debugger;
    shuffle = setInterval(() => {
      letters.forEach(letter => {
        letter.value =
          searchLetters[Math.floor(Math.random() * searchLetters.length)];
      });
      drawLetters();

      if (found) {
        clearInterval(shuffle);
      }
    }, 100);

    debugger;


  });

  function drawLetters() {
    ctx.clearRect(0, 95, canvas.width, canvas.height - 100);

    letters.forEach(letter => {
      if (letter.value === "") {
        ctx.beginPath();
        ctx.strokeStyle = "grey";
        ctx.rect(letter.posX, letter.posY, 24, 30);
        ctx.stroke();
        ctx.closePath();
      } else {
        ctx.fillText(letter.value, letter.posX, letter.posY);
      }
    });
  }

  function resetLetters() {
    letterCount = 0;
    letters.forEach(letter => {
      letter.value = "";
    });
  }

  const permutator = (inputArr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
 };

  function getAnagram(searchLetters) {
    let permutations = permutator(searchLetters.split(""));
    let anagram;
    debugger
    permutations.forEach((perm) => {
      if (dictionary.includes(perm.join(""))) {
        anagram = perm.join("");
      }
    });
    debugger
    return anagram;
  }
});
