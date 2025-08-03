let gameSeq = [];
let userSeq = [];
let btns = ["red", "blue", "yellow", "green"];
let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", () => {
  if (!started) {
    console.log("Game Started");
    started = true;
    levelUp();
  }
});

let levelUp = () => {
  userSeq = [];
  level++;
  h2.innerText = `Level: ${level}`;

  let randomIndex = Math.floor(Math.random() * 4);
  let randomColor = btns[randomIndex];
  let randomBtn = document.querySelector(`.${randomColor}`);
  console.log(randomIndex, randomColor, randomBtn);
  gameSeq.push(randomColor);
  gameFlash(randomBtn);
};

let gameFlash = (btn) => {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 400);
};

let userFlash = (btn) => {
  btn.classList.add("userFlash");
  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 400);
};

function btnPress() {
  let btn = this;
  userFlash(btn);
  let userColor = btn.id;
  userSeq.push(userColor);
  checkAnswer(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".box");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

let checkAnswer = (idx) => {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    if (level > highScore) {
      highScore = level;
    }

    h2.innerHTML = `Game Over. Your Score was <b>${level}</b>. <br>High Score: <b>${highScore}</b> <br>Press any key to restart.`;
    reset();
  }
};

let reset = () => {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
};
