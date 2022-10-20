let intro = new Audio('assets/music/Opening.mp3')
let sound = new Audio('assets/music/GreenGarden.mp3')
let winSound = new Audio('assets/music/victory.mp3')
let gameOverSound = new Audio('assets/music/lose.mp3')

sound.volume = 0.1;

let goal = new Goal();
let player = new Player();
let enemy = new Enemy(5, 6);

var game = {
  createBoard() {
    // Selecciona la tabla vacía del html y la construye en el js a semejanza del mapa dibujado (boundMap)
    var obstacles = [];
    var table = document.getElementById("board");
    boundMap.forEach((row, i) => {
      const tr = document.createElement("tr");
      tr.setAttribute("id", "row" + i);
      row.forEach(function (col, j) {
        const td = document.createElement("td");
        td.setAttribute("id", "col" + j);
        if (col === "=") {
          td.classList.add("boundary");
        }
        if (col === "+") {
          td.classList.add("corner");
        }
        if (col === "-") {
          td.classList.add("rock");
        }
        if (col === "*") {
          td.classList.add("obstacle");
          obstacles.push({ x: j, y: i });
        }
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });
    player.showPlayer();
    let rand = Math.floor(Math.random() * obstacles.length);
    goal.x = obstacles[rand].x;
    goal.y = obstacles[rand].y;
    enemy.showEnemy();
    goal.showGoal();
    
  },
  checkBoundaries(cell) {
    const boundaries = [
      "rock",
      "boundary",
      "obstacle",
      "bomb",
      "enemy",
      "player",
      "obstacle goal",
    ];
    return boundaries.includes(cell.getAttribute("class"));
  },
  collisionCheck(direction) {
    let x, y;
    switch (direction) {
      case "w":
        //Podemos usar operadores ternarios?
        y = player.y - 1;
        x = player.x;
        return this.checkBoundaries(
          document.querySelector(`#row${y} #col${x}`)
        );
      case "a":
        y = player.y;
        x = player.x - 1;
        return this.checkBoundaries(
          document.querySelector(`#row${y} #col${x}`)
        );
      case "s":
        y = player.y + 1;
        x = player.x;
        return this.checkBoundaries(
          document.querySelector(`#row${y} #col${x}`)
        );
      case "d":
        y = player.y;
        x = player.x + 1;
        return this.checkBoundaries(
          document.querySelector(`#row${y} #col${x}`)
        );
    }
  },
  movePlayer() {
    window.addEventListener("keydown", (e) => {
      let cellW = document.querySelector(`#row${player.y - 1} #col${player.x}`);
      let attrW = cellW.getAttribute("class");
      let cellA = document.querySelector(`#row${player.y} #col${player.x - 1}`);
      let attrA = cellA.getAttribute("class");
      let cellS = document.querySelector(`#row${player.y + 1} #col${player.x}`);
      let attrS = cellS.getAttribute("class");
      let cellD = document.querySelector(`#row${player.y} #col${player.x + 1}`);
      let attrD = cellD.getAttribute("class");
      player.removePlayer();

      switch (e.key) {
        case "w":
          if (!this.collisionCheck("w")) {
            player.y--;
            player.direction = "w";
          } else if (this.collisionCheck("w") && attrW === "enemy") {
            player.health--;
            player.updatelives();
            game.gameOver();
          }
          break;
        case "a":
          if (!this.collisionCheck("a")) {
            player.x--;
            player.direction = "a";
          } else if (this.collisionCheck("a") && attrA === "enemy") {
            player.health--;
            player.updatelives();
            game.gameOver();
          }
          break;
        case "s":
          if (!this.collisionCheck("s")) {
            player.y++;
            player.direction = "s";
          } else if (this.collisionCheck("s") && attrS === "enemy") {
            player.health--;
            player.updatelives();
            game.gameOver();
          }
          break;
        case "d":
          if (!this.collisionCheck("d")) {
            player.x++;
            player.direction = "d";
          } else if (this.collisionCheck("d") && attrD === "enemy") {
            player.health--;
            player.updatelives();
            game.gameOver();
          }
          break;
      }
      player.showPlayer();
      game.win();
    });
  },
  moveEnemy() {
    var timerId = setInterval(function () {
      var nextCell = document.querySelector(
        `#row${enemy.y + enemy.direction} #col${enemy.x}`
      );
      let attr = nextCell.getAttribute("class");
      if (
        enemy.y === 1 ||
        enemy.y === 19 ||
        attr === "rock" ||
        attr === "obstacle" ||
        attr === "bomb"
      ) {
        enemy.direction *= -1;
      }
      enemy.removeEnemy();
      enemy.y += enemy.direction;
      enemy.showEnemy();
      enemy.attack();
    }, 500);
    enemy.timerId = timerId;
  },
  gameOver() {
    if (player.health === 0) {
      this.tryAgain();
      player = new Player();
      let table = document.querySelector("#board");
      let rows = document.querySelectorAll("tr");
      rows.forEach((e) => {
        table.deleteRow(0);
      });
      this.createBoard();
      document.querySelector("#game-over").style.display = "block";
      sound.pause()
      gameOverSound.play()
    }
  },
  tryAgain() {
    let tryAgainButton = document.querySelector("#game-over button");
    tryAgainButton.onclick = function () {
      gameOverSound.pause()
      sound.play()
      document.querySelector("#game-over").style.display = "none";
    };
  },
  win() {
    if (player.x === goal.x && player.y === goal.y) {
      this.playAgain();
      player = new Player();
      let table = document.querySelector("#board");
      let rows = document.querySelectorAll("tr");
      rows.forEach((e) => {
        table.deleteRow(0);
      });
      this.createBoard();
      document.querySelector("#win").style.display = "block";
      sound.pause()
      winSound.play()
    }
  },
  playAgain() {
    let playAgainButton = document.querySelector("#win button");
    playAgainButton.onclick = function () {
      winSound.pause()
      sound.play()
      document.querySelector("#win").style.display = "none";
    };
  },
  generateBomb() {
    window.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        if (player.activatedBomb === false) {
          let bomb = new Bomb(player);
          bomb.showBomb();
          bomb.explodeBomb();
          bomb.removeBomb();
        }
      }
    });
  },
  start() {
    let startButton = document.querySelector("#start button");
      startButton.onclick = function () {
      intro.pause()
      sound.play()
      document.querySelector("#start").style.display = "none";
    };
  },
};

//intro.play();
game.createBoard();
game.start();
game.movePlayer();
game.moveEnemy();
game.generateBomb();
