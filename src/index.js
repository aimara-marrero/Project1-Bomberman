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
  showPlayer() {
    var playerCell = document.querySelector(`#row${this.y} #col${this.x}`);
    playerCell.classList.add("player");
  },
  removePlayer() {
    var playerCell = document.querySelector(`#row${this.y} #col${this.x}`);
    playerCell.classList.remove("player");
  }
};

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
