class Player {
  constructor() {
    this.positionX = 1;
    this.positionY = 50;
    this.width = 2;
    this.height = 10;
  }
  moveUp() {
    this.positionY++;
    const playerElm = document.getElementById("player");
    playerElm.style.bottom = `${this.positionY}vh`;
  }

  moveDown() {
    this.positionY--;
    const playerElm = document.getElementById("player");
    playerElm.style.bottom = `${this.positionY}vh`;
  }
}

class Opponent {
  constructor() {
    this.positionX = 97;
    this.positionY = 50;
    this.width = 2;
    this.height = 40;
    this.speed = 2;
    this.direction = "up";
  }
  moveUp() {
    this.positionY += this.speed;
    const oppoElm = document.getElementById("opponent");
    oppoElm.style.bottom = `${this.positionY}vh`;
  }

  moveDown() {
    this.positionY -= this.speed;
    const oppoElm = document.getElementById("opponent");
    oppoElm.style.bottom = `${this.positionY}vh`;
  }
  autoMove() {
    setInterval(() => {
      if (this.direction === "up") {
        this.moveUp();
        if (this.positionY >= 100 - this.height) {
          this.direction = "down";
        }
      } else {
        this.moveDown();
        if (this.positionY <= 0) {
          this.direction = "up";
        }
      }
    }, 10); // Adjust timing for desired speed
  }
}

class Ball {
  constructor() {
    this.positionX = 50;
    this.positionY = 50;
    this.width = 1;
    this.height = 2;
    this.speedX = Math.random() > 0.5 ? 1 : -1;
    this.speedY = Math.random() > 0.5 ? 1 : -1;
  }
  move() {
    this.countPointsPlayer();
    this.countPointsOpponent();
    // calculate the new position
    this.positionX = this.positionX + this.speedX;
    this.positionY += this.speedY;

    // update the ui to reflect the new position
    const ballElm = document.getElementById("ball");
    ballElm.style.left = `${this.positionX}vw`;
    ballElm.style.bottom = `${this.positionY}vh`;

    if (
      this.positionX <= player.positionX + player.width &&
      this.positionX + this.width >= player.positionX && // Check if ball's right side reaches player's left side
      this.positionY < player.positionY + player.height &&
      this.positionY + this.height > player.positionY
    ) {
      // Ensure entire vertical overlap with paddle

      this.positionX = player.positionX + player.width; // Adjust ball position outside paddle
      this.speedX *= -1;
    }

    if (
      this.positionX + this.width >= opponent.positionX &&
      this.positionX <= opponent.positionX + opponent.width &&
      this.positionY < opponent.positionY + opponent.height &&
      this.positionY + this.height > opponent.positionY
    ) {
      this.positionX = opponent.positionX - this.width;
      this.speedX *= -1;
    }

    //Top and bottom border collision
    if (this.positionY >= 100 - this.height) {
      this.positionY = 100 - this.height;
      this.speedY *= -1;
    }
    if (this.positionY <= 1) {
      this.positionY = 1;
      this.speedY *= -1;
    }

    /*if (this.positionX < 0 || this.positionX > 100) {
      console.log("game over...");
      location.href = "gameover.html";
    }
      */
  }
  countPointsPlayer() {
    const pointElm = document.getElementById("points-player");
    // Make sure 'counter' persists across calls
    if (!this.counter) this.counter = 0;

    if (this.positionX > 100) {
      this.counter++;
      pointElm.innerText = this.counter;
      
      this.positionX = 50; 
      this.positionY = 50; 
      this.speedX = Math.random() > 0.5 ? 1 : -1; 
      this.speedY = Math.random() > 0.5 ? 1 : -1;
    }
  }


  countPointsOpponent() {
    const pointElm = document.getElementById("points-opponent");
    // Make sure 'counter' persists across calls
    if (!this.counteropp) this.counteropp = 0;

    if (this.positionX < 0) {
      this.counteropp++;
      pointElm.innerText = this.counteropp;
      
      this.positionX = 50; 
      this.positionY = 50;
      this.speedX = Math.random() > 0.5 ? 1 : -1; 
      this.speedY = Math.random() > 0.5 ? 1 : -1;
    }
  }


}

const ball = new Ball();

ball.countPointsPlayer()

const gameInterval = setInterval(() => {
  ball.move();
}, 50);

const player = new Player();

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp") {
    player.moveUp();
  } else if (e.code === "ArrowDown") {
    player.moveDown();
  }
});

const opponent = new Opponent();
opponent.autoMove();
