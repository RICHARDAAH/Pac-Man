import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';
import SharedElements from '../Mixins/sharedElements';
import PacObject from '../models/pacObject';
import Level from '../models/level';

export default Ember.Component.extend(KeyboardShortcuts, SharedElements, {
  keyboardShortcuts: {
    up      (){ this.set('pacObject.nextDirection', 'up')},
    down    (){ this.set('pacObject.nextDirection', 'down')},
    left    (){ this.set('pacObject.nextDirection', 'left')},
    right   (){ this.set('pacObject.nextDirection', 'right')}
  },
  dots: 0,
  score: 0,
  levelNumber: 1,
  // isStationary: true,
},

{
  didInsertElement(){
    let level = Level.create();
    this.set('level', level);
    let pacObject = PacObject.create({
      level: level
    });
    this.set('pacObject', pacObject);
    // this.drawMaze();
    // this.get('level.cells').forEach(row => {
    //   row.forEach(cell => {
    //     if(cell == 0){
    //       this.set('dots', this.get('dots') + 1);
    //     }
    //   })
    // });
    // this.get('pacObject').drawPacman();
    this.loop();
    pacObject.movePacman();
  },
  direction: 'right',
  outOfBounds(){
    let x = this.get('x');
    let y = this.get('y');
    let screenWidth = this.get('screenWidth');
    let screenHeight = this.get('screenHeight');
    return (x < 0 || y < 0 || x >= screenWidth || y >= screenHeight);
  },
  // touchMaze(){
  //   let x = this.get('x');
  //   let y = this.get('y');
  //   return this.get('level.cells')[y][x] == 1;
  // },
  loop() {
    // this.get('pacObject').movePacman();
    this.consumeDots();
    this.clearScreen();
    this.drawMaze();
    this.get('pacObject').drawPacman();
    Ember.run.later(this, this.loop, 1000/80);
},
  consumeDots() {
    let cells = this.get('level.cells');
    if (cells[this.get('pacObject.y')][this.get('pacObject.x')] == 0) {
      cells[this.get('pacObject.y')][this.get('pacObject.x')] = -1;
      this.incrementProperty('score');
      // All the dots are consumed
      if (this.get('level').levelComplete()) {
        this.incrementProperty('levelNumber');
        this.resetGame();
      }
    }
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
drawMaze(){
  let ctx       = this.get('ctx');
  ctx.fillStyle = 'yellow';
  let cells     = this.get('level.cells');
  let cellSize  = this.get('level.cellSize');
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
  this.get('pacObject').reset();
  this.get('level').reset();
  // this.set('score', 0)
}
});







// Here we did a function and targeted the html canvas creating the circle (pacman). ctx.arc is a function that drew all the let 'variables'.

// 'let' helps you scope without clashing.......

//ctx stands context.

//'import Ember from 'ember' ' at the top needs code to tranfer for it to work similar to module exports in node.


//TODOS

// Later have time to change two different colours for walls and dots.

// Fix reset game function to be able to increase levels

// Add in ghosts

// Add option of restart game when lose

// add in cherries to eat ghosts.. Add in timer for cherries

// Add in more difficult

// Fix cells

// Test removing everything from didInsertElement apart from setPac and loop

// finish levels fixing screenWidth and screenHeight.
