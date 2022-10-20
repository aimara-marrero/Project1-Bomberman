function Enemy(x, y) {
  this.timerId = 0;
  this.x = x;
  this.y = y;
  this.self = this;
  this.speed = 5000;
  this.direction = 1;
  this.showEnemy = function () {
    var enemyCell = document.querySelector(`#row${this.y} #col${this.x}`);
    enemyCell.classList.add("enemy");
  };
  this.removeEnemy = function () {
    var enemyCell = document.querySelector(`#row${this.y} #col${this.x}`);
    enemyCell.classList.remove("enemy");
  };
  this.attack = function () {
    if (player.x === this.x && player.y === this.y) {
      player.health--;
      player.updatelives()
      game.gameOver();
      if (this.direction === 1) {
        this.removeEnemy();
        this.y--;
        this.showEnemy();
      } else if (this.direction === -1) {
        this.removeEnemy();
        this.y++;
        this.showEnemy();
      }
    }
  };
}
