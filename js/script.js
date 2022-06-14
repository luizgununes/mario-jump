const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const clouds = document.querySelector(".clouds");

const gameOver = document.querySelector(".game-over");
const restart = document.querySelector(".restart");

const score = document.querySelector(".score-value");

const marioJump = new Audio("./sounds/mario-jump.mp3");
const marioDead = new Audio("./sounds/mario-dead.mp3");

var running = true;

const jump = () => {
  mario.classList.add("jump");

  score.innerHTML = +score.innerHTML + 10;

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    mario.src = "./images/game-over.png";
    mario.style.width = "75px";
    mario.style.marginLeft = "50px";

    clouds.style.animationPlayState = "paused";

    gameOver.style.display = "table";
    restart.style.display = "table";

    marioDead.play();

    running = false;

    clearInterval(loop);
  }
}, 10);

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    if (running) {
      jump();
      marioJump.play();
    } else {
      window.location.reload();
    }
  }
});
