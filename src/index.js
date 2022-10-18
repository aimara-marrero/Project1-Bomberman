/*************************************************************
 CREACIÓN DE VARIABLES
**************************************************************/

let boundMap = [
  ['=', '=', '=', '=', '=',   '=', '=', '=', '=', '=',   '=', '=', '=', '=', '=',   '=', '=', '=', '=', '='], 
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='], 
  ['=', ' ', '*', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='], 
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='], 
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],

  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  ['=', ' ', ' ', ' ', '-',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  ['=', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '='],
  ['=', '=', '=', '=', '=',   '=', '=', '=', '=', '=',   '=', '=', '=', '=', '=',   '=', '=', '=', '=', '=']
];

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
  }
};


var enemy = {
  x: 5,
  y: 10,
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
      console.log(player.health)
      player.showPlayer()
      game.gameOver()
    }
  },
  moveEnemy() {
    var timerId = setInterval(function() {
      if(enemy.y === 1 || enemy.y === 18) {
        enemy.direction *= -1;
      }
      enemy.removeEnemy()
      enemy.y += enemy.direction;
      enemy.showEnemy()
      enemy.attack()
    } , 500)
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
  
 
  },

  collisionCheck(direction, ame, type) {

  },

  collisionCheck(direction) {


    switch(direction) {
  
      case 'w':
        //Podemos usar operadores ternarios
        let cellW = document.querySelector(`#row${player.y - 1} #col${player.x}`);
        if (cellW.getAttribute("class") === "rock" ||
            cellW.getAttribute("class") === "boundary" ||
            cellW.getAttribute("class") === "obstacle") {
          return true;
        } return false;
      
      case 'a':
        let cellA = document.querySelector(`#row${player.y} #col${player.x - 1}`);
        if (cellA.getAttribute("class") === "rock" ||
            cellA.getAttribute("class") === "boundary" ||
            cellA.getAttribute("class") === "obstacle") {
        return true;
      } return false;
      
      case 's':
          let cellS = document.querySelector(`#row${player.y + 1} #col${player.x}`);
        if (cellS.getAttribute("class") === "rock" ||
            cellS.getAttribute("class") === "boundary" ||
            cellS.getAttribute("class") === "obstacle") {
        return true;
      } return false;
  
      case 'd':
        let cellD = document.querySelector(`#row${player.y} #col${player.x + 1}`);
        if (cellD.getAttribute("class") === "rock" ||
            cellD.getAttribute("class") === "boundary" ||
            cellD.getAttribute("class") === "obstacle") {
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
      /*   switch(player.direction){
        case 'w' : player.y++
        break
        case 'a' : player.x++;
        break;
        case 's' : player.y--;
        break;
        case 'd' : player.x--;
        break;
      } */
      player.showPlayer()
      enemy.attack()
    });
  },
  gameOver() {
    if(player.health === 0) {
      player.removePlayer();
      alert('GAME OVER >:D');
    }

          if (!this.collisionCheck("w")) {player.y --;}
          break;
        case "a":
          if (!this.collisionCheck("a")) {player.x --;}
          break;
        case "s":
          if (!this.collisionCheck("s")) {player.y ++;}
          break;
        case "d":
          if (!this.collisionCheck("d")) {player.x ++;}
          break;
      }
      player.showPlayer()
    });

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

game.createBoard()


/*************************************************************
 MOVIMIENTO DEL JUGADOR
**************************************************************/

game.movePlayer()
