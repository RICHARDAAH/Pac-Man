import Ember from 'ember';

export default Ember.Object.extend({
  // 1 = wall, 0 = dot, -1 = empty

  cells: [
    [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1.1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  cellSize: 40,
  screenWidth: Ember.computed(function(){
    return this.get('cells')[0].length;
  }),
  screenHeight: Ember.computed(function(){
    return this.get('cells').length;
  }),
  canvasWidth: Ember.computed(function(){
    return this.get('screenWidth') * this.get('cellSize');
  }),
  canvasHeight: Ember.computed(function(){
    let height = this.get('screenHeight') * this.get('cellSize');
    return height;
  }),
  levelComplete() {
    let cells = this.get('cells');
    cells.forEach((row) => {
      row.forEach((grid) => {
        if (grid == 0){
          return false;
        }
      });
    });
    return true;
  },
  reset() {
    let cells = this.get('cells');
    cells.forEach((row, i) => {
      row.forEach((grid, j) => {
        if (grid == -1){
          cells[i][j] = 0;
        }
      });
    });
  }
})
