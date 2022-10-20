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
  }
}



game.createBoard()
game.start()
game.movePlayer()
game.moveEnemy()
game.generateBomb()