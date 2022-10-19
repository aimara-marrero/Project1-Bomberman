var goal = {
  x: 4,
  y: 17,
  showGoal() {
    var goalCell = document.querySelector(`#row${goal.y} #col${goal.x}`);
    goalCell.classList.add("goal");
  }
}

function Bomb (player){
  this.player = player
  this.x = player.x
  this.y = player.y
  self = this
  this.range = 1
  this.timer = 2500
  this.timerId = 0
  this.showBomb = function (){
      var bombCell = document.querySelector(`#row${this.y} #col${this.x}`);
      bombCell.classList.add("bomb");
      player.activatedBomb = true;
  }

  this.removeBomb = function(){
    setTimeout(function() {
      var bombCell = document.querySelector(`#row${self.y} #col${self.x}`)
      console.log(bombCell);
      bombCell.classList.remove("bomb");
      player.activatedBomb = false;
    }, this.timer)
  }

  this.explodeBomb = function(){
    let explodeCells = [];
      for(let i = this.y - this.range; i <= this.y + this.range; i++ ) {
        explodeCells.push({x: this.x, y: i})
      }
      for(let i = this.x - this.range; i <= this.x + this.range; i++ ) {
        explodeCells.push({x: i, y: this.y})
      }

    this.setimerId = setTimeout(function() {
      explodeCells.forEach((e) => {
        let explodeCell =  document.querySelector(`#row${e.y} #col${e.x}`)
          if(explodeCell.classList.contains('obstacle')) {
            console.log('ENTRA')
            explodeCell.classList.remove('obstacle');
          } else if (explodeCell.classList.contains('player')) {
            player.health--
          } else if (explodeCell.classList.contains('enemy')) {
            explodeCell.classList.remove('enemy')
            clearInterval(enemy.timerId);
          }
      })
      console.log(player.health);
      game.gameOver()
    }, this.timer)
  }
}

var player = {

  x: 2,
  y: 17,
  direction: '',
  health: 3,
  activatedBomb: false,
  showPlayer() {
    var playerCell = document.querySelector(`#row${this.y} #col${this.x}`);
    playerCell.classList.add("player");
  },
  removePlayer() {
    var playerCell = document.querySelector(`#row${this.y} #col${this.x}`);
    playerCell.classList.remove("player");
  }
}


var enemy = {
  timerId: 0,
  x: 5,
  y: 15,
  self: this,
  speed: 500,
  direction: 1,
  showEnemy() {
    var enemyCell = document.querySelector(`#row${this.y} #col${this.x}`);
    enemyCell.classList.add("enemy");
  },
  removeEnemy() {
    var enemyCell = document.querySelector(`#row${this.y} #col${this.x}`);
    enemyCell.classList.remove("enemy");
  },
  attack() {
    if (player.x === this.x && player.y === this.y) {
      player.health--
      game.gameOver()
      if(this.direction === 1) {
        this.removeEnemy()
        this.y--
        this.showEnemy()
      } else if (this.direction === -1) {
        this.removeEnemy()
        this.y++
        this.showEnemy()
      }
    }
  }
}

var game = {
  createBoard() {
    // Selecciona la tabla vacía del html y la construye en el js a semejanza del mapa dibujado (boundMap)
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
        if (col === "-") {
          td.classList.add("rock");
        }
        if (col === "*") {
          td.classList.add("obstacle");
        }
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });
  player.showPlayer()
  enemy.showEnemy()
  goal.showGoal()
  },

  

  collisionCheck(direction) {


    switch(direction) {
  
      case 'w':
        //Podemos usar operadores ternarios
        let cellW = document.querySelector(`#row${player.y - 1} #col${player.x}`);
        if (cellW.getAttribute("class") === "rock" ||
            cellW.getAttribute("class") === "boundary" ||
            cellW.getAttribute("class") === "obstacle" ||
            cellW.getAttribute("class") === "bomb" ||
            cellW.getAttribute("class") === "enemy") {
          return true;
        } return false;
      
      case 'a':
        let cellA = document.querySelector(`#row${player.y} #col${player.x - 1}`);
        if (cellA.getAttribute("class") === "rock" ||
            cellA.getAttribute("class") === "boundary" ||
            cellA.getAttribute("class") === "obstacle" ||
            cellA.getAttribute("class") === "bomb" ||
            cellA.getAttribute("class") === "enemy") {
        return true;
      } return false;
      
      case 's':
          let cellS = document.querySelector(`#row${player.y + 1} #col${player.x}`);
        if (cellS.getAttribute("class") === "rock" ||
            cellS.getAttribute("class") === "boundary" ||
            cellS.getAttribute("class") === "obstacle" ||
            cellS.getAttribute("class") === "bomb" ||
            cellS.getAttribute("class") === "enemy") {
        return true;
      } return false;
  
      case 'd':
        let cellD = document.querySelector(`#row${player.y} #col${player.x + 1}`);
        if (cellD.getAttribute("class") === "rock" ||
            cellD.getAttribute("class") === "boundary" ||
            cellD.getAttribute("class") === "obstacle" ||
            cellD.getAttribute("class") === "bomb" ||
            cellD.getAttribute("class") === "enemy") {
        return true;
      } return false;      
    }
  },
  movePlayer() {
    window.addEventListener("keydown", (e) => {
      let cellW = document.querySelector(`#row${player.y -1} #col${player.x}`);
      let attrW = cellW.getAttribute("class")
      let cellA = document.querySelector(`#row${player.y} #col${player.x - 1}`);
      let attrA = cellA.getAttribute("class")
      let cellS = document.querySelector(`#row${player.y +1} #col${player.x}`);
      let attrS = cellS.getAttribute("class")
      let cellD = document.querySelector(`#row${player.y} #col${player.x + 1}`);
      let attrD = cellD.getAttribute("class")
      player.removePlayer()
    
      switch (e.key) {
        case "w":
          if (!this.collisionCheck("w")) {
            player.y --;
            player.direction = 'w'}
          else if (this.collisionCheck("w") && attrW === 'enemy') {
            player.health--;
            game.gameOver()
          }
          break;
        case "a":
          if (!this.collisionCheck("a")) {
            player.x --;
            player.direction = 'a'}
          else if (this.collisionCheck("a") && attrA === 'enemy') {
            player.health--;
            game.gameOver()
          }
          break;
        case "s":
          if (!this.collisionCheck("s")) {
            player.y ++;
            player.direction = 's'
            
          }
          else if (this.collisionCheck("s") && attrS === 'enemy') {
            player.health--;
            game.gameOver()
          }
          break;
        case "d":
          if (!this.collisionCheck("d")) {
            player.x ++;
            player.direction = 'd'}
          else if (this.collisionCheck("d") && attrD === 'enemy') {
            player.health--;
            game.gameOver()
          }
          break;
      }
      player.showPlayer()
      game.win()
    });
  },
  moveEnemy() {
    var timerId = setInterval(function() {
      var nextCell = document.querySelector(`#row${enemy.y + enemy.direction} #col${enemy.x}`)
      let attr = nextCell.getAttribute('class');
      if(enemy.y === 1 || enemy.y === 18 || attr === 'rock' || attr === 'obstacle' || attr === 'bomb') {
        enemy.direction *= -1;
      }
      enemy.removeEnemy()
      enemy.y += enemy.direction;
      enemy.showEnemy()
      enemy.attack()
    } , 500)
    enemy.timerId = timerId;
  },
  gameOver() {
    if(player.health === 0) {
      document.querySelector('#game-over').style.display = 'block';
      player.removePlayer();
      player.health = 3 
    }
  },
  tryAgain() {
      let tryAgainButton = document.querySelector('#game-over button');
      console.log(tryAgainButton)
      tryAgainButton.onclick = function() {
      document.querySelector('#game-over').style.display = 'none';
    }
  },
  win() {
    if(player.x === goal.x && player.y === goal.y) {
      alert('YOU WIN!!');
    }
  },
  generateBomb() {
    window.addEventListener("keydown", (e) => {
      if (e.code === 'Space') {
          if(player.activatedBomb === false) {
            let bomb = new Bomb(player);
            bomb.showBomb();
            bomb.explodeBomb();
            bomb.removeBomb();
          }
      }
    })
  },
  start() {
    let startButton = document.querySelector('#start button');
    startButton.onclick = function() {
      document.querySelector('#start').style.display = 'none';
    }
    console.log(startButton);
  }
}



game.createBoard()
game.start()
game.movePlayer()
game.moveEnemy()
game.generateBomb()
