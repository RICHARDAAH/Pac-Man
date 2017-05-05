import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';

export default Ember.Component.extend(KeyboardShortcuts, {
  directions: {
    'up': {x: 0, y: -1},
    'down': {x: 0, y: 1},
    'left': {x: -1, y: 0},
    'right': {x: 1, y: 0},
    'stationary': {x: 0, y: 0}
  },
  keyboardShortcuts: {
    up    (){ this.movePacman('up')},
    down    (){ this.movePacman('down')},
    left    (){ this.movePacman('left')},
    right    (){ this.movePacman('right')}
  },
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
  dots: 0,
  score: 0,
  x: 1,
  y: 2,
  cellSize: 40,
  isStationary: true,
  direction: 'stationary',
  numCycles: 1,
  frameRate: 30,
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
  ctx: Ember.computed(function(){
    let canvas = document.getElementById('my-canvas');
    return canvas.getContext('2d');
  }),
},

{
  didInsertElement(){
    this.drawPacman();
    this.drawMaze();
    this.get('cells').forEach(row => {
      row.forEach(cell => {
        if(cell == 0){
          this.set('dots',  this.get('dots') + 1);
        }
      })
    });
  },
  outOfBounds(){
    let x = this.get('x');
    let y = this.get('y');
    let screenWidth = this.get('screenWidth');
    let screenHeight = this.get('screenHeight');
    return (x < 0 || y < 0 || x >= screenWidth || y >= screenHeight);
  },
  touchMaze(){
    let x = this.get('x');
    let y = this.get('y');
    return this.get('cells')[y][x] == 1;
  },
  movePacman(direction){
    let stationary =! this.get('isStationary') ||! this.pathFree(direction);
    if (! stationary) {
      this.set('direction', direction);
      this.set('isStationary', false);
      this.moveLoop();
    }
    // if (this.pathFree(direction)){
    //   console.log('pathFree');
    //   this.set('x', this.nextCell('x', direction));
    //   this.set('y', this.nextCell('y', direction));
    //   let cells = this.get('cells');
    //   if (cells[this.get('y')][this.get('x')] == 0){
    //     cells[this.get('y')][this.get('x')] = -1;
    //     this.incrementProperty('score');
    //     // All the dots are consumed
    //     if (this.get('score') == this.get('dots')){
    //       this.resetGame();
    //     }
    //   }
    // }
  },
  moveLoop(){
    if (this.get('numCycles') == this.get('frameRate')) {
      this.set('x', this.nextCell('x', this.get('direction')));
      this.set('y', this.nextCell('y', this.get('direction')));
      this.set('isStationary', true);
      this.set('numCycles', 1);
      let cells = this.get('cells');
      if (cells[this.get('y')][this.get('x')] == 0){
        cells[this.get('y')][this.get('x')] = -1;
        this.incrementProperty('score');
        // All the dots are consumed
        if (this.get('score') == this.get('dots')){
          this.resetGame();
        }
      }
    } else {this.incrementProperty('numCycles');
    Ember.run.later(this, this.moveLoop, 1000/60);
  }
  this.clearScreen();
  this.drawMaze();
  this.drawPacman();
},
pathFree(direction){
  let cell = this.getCellType(direction);
  return ! (cell == 1 || Ember.isEmpty(cell));
},
nextCell(coordinate, direction){
  return this.get(coordinate) + this.get(`directions.${direction}.${coordinate}`);
},
getCellType(direction) {
  let x = this.nextCell('x', direction);
  let y = this.nextCell('y', direction);
  return this.get(`cells.${y}.${x}`);
},
clearScreen(){
  let ctx = this.get('ctx');
  let canvasWidth  = this.get('canvasWidth');
  let canvasHeight = this.get('canvasHeight');
  ctx.clearRect(0,0,canvasWidth,canvasHeight);
},
drawDots(j, i) {
  let scale    = 1/8;
  this.drawCirlce(j, i, scale, 'stationary');
},
drawCirlce(x, y, scale, direction) {
  let ctx       = this.get('ctx');
  let cellSize  = this.get('cellSize');
  let pixelX    = (x + 1/2 + this.offsetFor('x', direction)) * cellSize;
  let pixelY    = (y + 1/2 + this.offsetFor('y', direction)) * cellSize;
  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.arc(pixelX, pixelY, cellSize * scale, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
},
offsetFor(coordinate, direction) {
  return this.get(`directions.${direction}.${coordinate}`) * this.get('numCycles') / this.get('frameRate');
},
drawPacman() {
  let x      = this.get('x');
  let y      = this.get('y');
  let scale  = 1/2;
  this.drawCirlce(x, y, scale, this.get('direction'));
},
drawMaze(){
  let ctx       = this.get('ctx');
  ctx.fillStyle = 'yellow';
  let cells     = this.get('cells');
  let cellSize  = this.get('cellSize');
  cells.forEach((row, i) => {
    row.forEach((grid, j) => {
      if(grid == 1){
        ctx.fillRect (j * cellSize,i * cellSize, cellSize, cellSize);
      }
      if (grid == 0){
        this.drawDots(j, i);
      }
    });
  });
},
resetGame(){
  this.set('x', 0);
  this.set('y', 0);
  let cells = this.get('cells');
  cells.forEach((row, i) => {
    row.forEach((grid, j) => {
      if (grid == -1){
        cells[i][j] = 0;
      }
    });
  });
  this.set('score', 0)
}
});







// Here we did a function and targeted the html canvas creating the circle (pacman). ctx.arc is a function that drew all the let 'variables'.

// 'let' helps you scope without clashing.......

//ctx stands context.

//'import Ember from 'ember' ' at the top needs code to tranfer for it to work similar to module exports in node.


//TODOS

// Later have time to change two different colours for walls and dots.

// Separate draw functions

// Fix reset game function to be able to increase levels

// Add in ghosts

// Add option of restart game when lose

// add in cherries to eat ghosts.. Add in timer for cherries

// Add in more difficult

// Fix cells
