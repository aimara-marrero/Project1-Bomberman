/*************************************************************
 CREACIÓN EL MAPA
**************************************************************/

let boundMap = [
  ['-', '-', '-', '-', '-',   '-', '-', '-', '-', '-',   '-', '-', '-', '-', '-',   '-', '-', '-', '-', '-'], 
  ['-', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '-'], 
  ['-', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '-'], 
  ['-', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '-'], 
  ['-', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '-'],
  
  ['-', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '-'],

  ['-', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '-'],
  
  ['-', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', ' ', ' ', '-',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', ' ',   ' ', ' ', ' ', ' ', '-'],
  ['-', '-', '-', '-', '-',   '-', '-', '-', '-', '-',   '-', '-', '-', '-', '-',   '-', '-', '-', '-', '-']
];

var table = document.getElementById("board");
var boundary = [];

boundMap.forEach((row, i) => {
  const tr = document.createElement("tr");
  tr.setAttribute("id", "row" + i);
  row.forEach(function (col, j) {
    const td = document.createElement("td");
    td.setAttribute("id", "col" + j);

    if (col === "-") {
      td.classList.add("boundary");

      boundary.push({
        x: j, //col
        y: i,
      }); //filas
    }
    tr.appendChild(td);
  });
  table.appendChild(tr);
});

var player = {
  x: 10,
  y: 1,
};

var playerCell = document.querySelector(`#row${player.y} #col${player.x}`);
playerCell.classList.add("player");

window.addEventListener("keydown", (e) => {
  var playerCell = document.querySelector(`#row${player.y} #col${player.x}`);
  playerCell.classList.remove("player");

  switch (e.key) {
    case "w":
      if (!collisionCheck("w")) {
        console.log("W");
        player.y -= 1;
      }
      break;
    case "a":
      if (!collisionCheck("a")) {
        console.log("A");
        player.x -= 1;
      }
      break;
    case "s":
      if (!collisionCheck("s")) {
        console.log("S");
        player.y += 1;
      }
      break;
    case "d":
      if (!collisionCheck("d")) {
        console.log("D");
        player.x += 1;
      }
      break;
  }
  var playerCell = document.querySelector(`#row${player.y} #col${player.x}`);
  playerCell.classList.add("player");
});

function collisionCheck(direction) {
  if (direction === "w") {
    let boundCellW = document.querySelector(
      `#row${player.y - 1} #col${player.x}`
    );
    if (boundCellW.getAttribute("class") === "boundary") {
      return true;
    }
    return false;
  }
  if (direction === "a") {
    let boundCellA = document.querySelector(
      `#row${player.y} #col${player.x - 1}`
    );
    if (boundCellA.getAttribute("class") === "boundary") {
      return true;
    }
    return false;
  }
  if (direction === "s") {
    let boundCellS = document.querySelector(
      `#row${player.y + 1} #col${player.x}`
    );
    if (boundCellS.getAttribute("class") === "boundary") {
      return true;
    } return false;
  }
  if (direction === "d") {
    let boundCellD = document.querySelector(
      `#row${player.y} #col${player.x + 1}`
    );
    if (boundCellD.getAttribute("class") === "boundary") {
      return true;
    }
    return false;
  }
}


