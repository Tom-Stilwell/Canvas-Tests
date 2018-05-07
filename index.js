var anagramica = require("anagramica");
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

  document.getElementById("submit").addEventListener("click", () => {
    if (letterCount >= 7) {
      let searchLetters = letters.map(letter => letter.value).join("");
      let waiting = true;
      getAnagram(searchLetters);
      const shuffle = setInterval(() => {
        letters.forEach(letter => {
          letter.value =
            searchLetters[Math.floor(Math.random() * searchLetters.length)];
        });
        drawLetters();
      }, 100);
    } else {
      alert("must input all letters");
    }
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

  function getAnagram(searchLetters) {
    // $.ajax({
    //   type: "GET",
    //   url: `http://api.datamuse.com/words?sl=${searchLetters}`
    // }).then(value => {
    //   debugger;
    //   console.log("Contents: " + JSON.parse(value));
    // });

    anagramica.best("hodecat", (error, response) => {
      if (error) {
        console.log("error");
      } else {
        console.log(response.best);
      }
    });
  }
});
