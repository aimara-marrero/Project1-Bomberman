function Goal(x, y) {
  this.x = 1;
  this.y = 1;
  this.showGoal = function () {
    var goalCell = document.querySelector(`#row${this.y} #col${this.x}`);
    goalCell.classList.add("goal");
  };
}
