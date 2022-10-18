/*************************************************************
 CREACIÓN DE VARIABLES
**************************************************************/

let boundMap = [
  ['=', '=', '=', '=', '=',   '=', '=', '=', '=', '=',   '=', '=', '=', '=', '=',   '=', '=', '=', '=', '='], 
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', '+', '='], 
  ['=', ' ', '-', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='], 
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='], 
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],

  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  ['=', ' ', ' ', ' ', ' ',   '-', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  ['=', ' ', ' ', ' ', ' ',   '*', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  ['=', '=', '=', '=', '=',   '=', '=', '=', '=', '=',   '=', '=', '=', '=', '=',   '=', '=', '=', '=', '=']
];

var goal = {
  x: 18,
  y: 1,
  showGoal() {
    var goalCell = document.querySelector(`#row${goal.y} #col${goal.x}`);
    goalCell.classList.add("goal");
  }
}

var bomb = {
  x: 0,
  y: 0,
  self: this,
  range: 2,
  timer: 2500,
  showBomb() {
        var bombCell = document.querySelector(`#row${player.y} #col${player.x}`);
        bombCell.classList.add("bomb");
        self.x = player.x;
        self.y = player.y;
    },
  removeBomb() {
      console.log(this.x)
      console.log(this.y)
      setTimeout(function() {
        var bombCell = document.querySelector(`#row${self.y} #col${self.x}`)
        console.log(bombCell);
        bombCell.classList.remove("bomb");
      }, this.timer) 
    },
  explodeBomb() {
    let explodeCells = [];
      for(let i = player.y - this.range; i <= player.y + this.range; i++ ) {
        explodeCells.push({x: player.x, y: i})
      }
      for(let i = player.x - this.range; i <= player.x + this.range; i++ ) {
        explodeCells.push({x: i, y: player.y})
      }

      setTimeout(function() {
        explodeCells.forEach((e) => {
          let explodeCell =  document.querySelector(`#row${e.y} #col${e.x}`)
          let attr = explodeCell.getAttribute('class')
            if(attr === 'enemy' || attr === 'obstacle') {
              explodeCell.classList.remove(attr)
            } else if (attr === 'player') {
              player.health--
            }
        })
      }, this.timer)
  },
}


var player = {
  x: 2,
  y: 17,
  direction: '',
  health: 3,
  showPlayer() {
    var playerCell = document.querySelector(`#row${this.y} #col${this.x}`);
    playerCell.classList.add("player");
  },
  removePlayer() {
    var playerCell = document.querySelector(`#row${this.y} #col${this.x}`);
    playerCell.classList.remove("player");
  },
  receiveDamage() {
    if (this.x === enemy.x && this.y === enemy.y) {
    player.health--;
    console.log(player.health)
    switch(player.direction){
      case 'w' : player.y++
      break
      case 'a' : player.x++;
      break;
      case 's' : player.y--;
      break;
      case 'd' : player.x--;
      break;
    }
    game.gameOver()
    } 
  }
}


var enemy = {
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
  /*())() {  //Check Daños
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
  },*/
  moveEnemy() {
    var timerId = setInterval(function() {
      /*console.log(self.y)
      console.log(self.direction)
     // var nextCell = document.querySelector(`#row${this.y} #col${this.x}`)
      //console.log(nextCell)
//      let attr = nextCell.getAttribute('class') */ 
      if(enemy.y === 1 || enemy.y === 18 || attr === 'rock' || attr === 'obstacle' || attr === 'bomb') {
        enemy.direction *= -1;
      }
      enemy.removeEnemy()
      enemy.y += enemy.direction;
      enemy.showEnemy()
      player.receiveDamage()
    } , this.speed)
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

  },

  collisionCheck(direction) {


    switch(direction) {
  
      case 'w':
        //Podemos usar operadores ternarios
        let cellW = document.querySelector(`#row${player.y - 1} #col${player.x}`);
        if (cellW.getAttribute("class") === "rock" ||
            cellW.getAttribute("class") === "boundary" ||
            cellW.getAttribute("class") === "obstacle" ||
            cellW.getAttribute("class") === "bomb") {
          return true;
        } return false;
      
      case 'a':
        let cellA = document.querySelector(`#row${player.y} #col${player.x - 1}`);
        if (cellA.getAttribute("class") === "rock" ||
            cellA.getAttribute("class") === "boundary" ||
            cellA.getAttribute("class") === "obstacle" ||
            cellA.getAttribute("class") === "bomb") {
        return true;
      } return false;
      
      case 's':
          let cellS = document.querySelector(`#row${player.y + 1} #col${player.x}`);
        if (cellS.getAttribute("class") === "rock" ||
            cellS.getAttribute("class") === "boundary" ||
            cellS.getAttribute("class") === "obstacle" ||
            cellS.getAttribute("class") === "bomb") {
        return true;
      } return false;
  
      case 'd':
        let cellD = document.querySelector(`#row${player.y} #col${player.x + 1}`);
        if (cellD.getAttribute("class") === "rock" ||
            cellD.getAttribute("class") === "boundary" ||
            cellD.getAttribute("class") === "obstacle" ||
            cellD.getAttribute("class") === "bomb") {
        return true;
      } return false;      
    }
  },
  movePlayer() {
    window.addEventListener("keydown", (e) => {

      player.removePlayer()
    
      switch (e.key) {
        case "w":

          if (!this.collisionCheck("w")) {
            player.y --;
            player.direction = 'w'}
          break;
        case "a":
          if (!this.collisionCheck("a")) {
            player.x --;
            player.direction = 'a'}
          break;
        case "s":
          if (!this.collisionCheck("s")) {
            player.y ++;
            player.direction = 's'}
          break;
        case "d":
          if (!this.collisionCheck("d")) {
            player.x ++;
            player.direction = 'd'}
          break;
      }
      player.showPlayer()
      player.receiveDamage()
      game.win()
    });
  },
  gameOver() {
    if(player.health === 0) {
      player.removePlayer();
      alert('GAME OVER >:D');
      player.health = 3 // Hay que hacer el reseteo
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
        bomb.showBomb()
        bomb.explodeBomb()
        bomb.removeBomb()
      }
    })
  }
}

/*************************************************************
 CREACIÓN DEL ENTORNO
**************************************************************/


game.createBoard()

/*************************************************************
 MOVIMIENTO DEL JUGADOR
**************************************************************/

game.movePlayer()
enemy.moveEnemy()

game.generateBomb()
