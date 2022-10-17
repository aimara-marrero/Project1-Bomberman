/*************************************************************
 CREACIÓN EL MAPA
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
    let cellW = document.querySelector(
      `#row${player.y - 1} #col${player.x}`
    );
    if (cellW.getAttribute("class") === "rock" ||
        cellW.getAttribute("class") === "boundary" ||
        cellW.getAttribute("class") === "obstacle") {
      return true;
    } return false;
  }
  if (direction === "a") {
    let cellA = document.querySelector(
      `#row${player.y} #col${player.x - 1}`
    );
    if (cellA.getAttribute("class") === "rock" ||
        cellA.getAttribute("class") === "boundary" ||
        cellA.getAttribute("class") === "obstacle") {
      return true;
    } return false;
  }
  if (direction === "s") {
    let cellS = document.querySelector(
      `#row${player.y + 1} #col${player.x}`
    );
    if (cellS.getAttribute("class") === "rock" ||
        cellS.getAttribute("class") === "boundary" ||
        cellS.getAttribute("class") === "obstacle") {
      return true;
    } return false;
  }
  if (direction === "d") {
    let cellD = document.querySelector(
      `#row${player.y} #col${player.x + 1}`
    );
    if (cellD.getAttribute("class") === "rock" ||
        cellD.getAttribute("class") === "boundary" ||
        cellD.getAttribute("class") === "obstacle") {
      return true;
    } return false;
  }
}




