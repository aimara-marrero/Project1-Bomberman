let damage = new Audio('assets/music/heartlost.mp3')

function Player() {
  this.x = 2;
  this.y = 17;
  this.direction = "";
  this.health = 3;
  this.activatedBomb = false;
  this.showPlayer = function () {
    var playerCell = document.querySelector(`#row${this.y} #col${this.x}`);
    playerCell.classList.add("player");
  },
  this.removePlayer = function () {
    var playerCell = document.querySelector(`#row${this.y} #col${this.x}`);
    playerCell.classList.remove("player");
  };
  this.updatelives = function () {
    
    if (this.health === 1 || this.health === 2) {
      let heart = document.querySelector(`#heart${this.health + 1}`)
      damage.play()
      heart.style.visibility = 'hidden'
      console.log(heart)
    if (this.health === 0) {
      for (let i=1; i <= 3; i++) {
      let heart = document.querySelector(`#heart${i}`)
      heart.style.visibility = 'visible'
      }
    }
//      heart.style.display = 'none'
    };
  }
}
