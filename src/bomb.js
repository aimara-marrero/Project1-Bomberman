let setBomb = new Audio('assets/music/plantarBomba.mp3')
let explodeBomb = new Audio('assets/music/bomba.mp3')

setBomb.volume = 1

function Bomb (player){
    this.player = player
    this.x = player.x
    this.y = player.y
    self = this
    this.range = 1
    this.timer = 3000
    this.timerId = 0
    this.showBomb = function (){
        var bombCell = document.querySelector(`#row${this.y} #col${this.x}`);
        bombCell.classList.add("bomb");
        setBomb.play();
        player.activatedBomb = true;
        
    }
  
    this.removeBomb = function(){
      setTimeout(function() {
        var bombCell = document.querySelector(`#row${self.y} #col${self.x}`)
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
        explodeBomb.play()
        explodeCells.forEach((e) => {
          let explodeCell =  document.querySelector(`#row${e.y} #col${e.x}`)
            if(explodeCell.classList.contains('obstacle')) {
              explodeCell.classList.remove('obstacle');
            } else if (explodeCell.classList.contains('player')) {
              player.health--
              player.updatelives();
            } else if (explodeCell.classList.contains('enemy')) {
              explodeCell.classList.remove('enemy')
              clearInterval(enemy.timerId);
            }
        })
        game.gameOver()
      }, this.timer)
    }
  }