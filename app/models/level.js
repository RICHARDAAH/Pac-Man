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
  boardWidth: Ember.computed(function(){
    return this.get('cells')[0].length;
  }),
  boardHeight: Ember.computed(function(){
    return this.get('cells.length');
  }),
  pixelWidth: Ember.computed(function(){
    return this.get('boardWidth') * this.get('cellSize');
  }),
  pixelHeight: Ember.computed(function() {
    return this.get('boardHeight') * this.get('cellSize');
  }),

  levelComplete() {
    let dotsLeft = false;
    let cells = this.get('cells');

    cells.forEach((row)=>{
      row.forEach((cell)=>{
        if(cell == 0){
          dotsLeft = true;
        }
      })
    })
    return !dotsLeft;
  },
  resetGame() {
    let cells = this.get('cells');
    cells.forEach((row, i)=>{
      row.forEach((cell, j)=>{
        if (cell == -1){
          cells[i][j] = 0;
        }
      });
    });
  }
})
