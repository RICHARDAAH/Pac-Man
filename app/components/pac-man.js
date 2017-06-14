import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';
import SharedElements from '../Mixins/sharedElements';
import PacObject from '../models/pacObject';
import Level from '../models/level';
import Level2 from '../models/level2';

export default Ember.Component.extend(KeyboardShortcuts, SharedElements, {
    keyboardShortcuts: {
    up() { this.set('pac.nextDirection', 'up');},
    down()  { this.set('pac.nextDirection', 'down');},
    left() { this.set('pac.nextDirection', 'left');},
    right() { this.set('pac.nextDirection', 'right');},
  },

  score: 0,
  levelNumber: 1,

    didInsertElement() {
    // let level = Level.create();
    let level = Level2.create();
    this.set('level', level);
    let pac = PacObject.create({level: level, x: level.get('startPosition.x'), y: level.get('startPosition.y')});
    this.set('pac', pac);
    this.loop();
    pac.movePacman();
  },

    loop(){
    this.consumeDots();
    this.clearScreen();
    this.drawMaze();
    this.get('pac').drawPacman();
    Ember.run.later(this, this.loop, 1000/60);
  },

    consumeDots(){
    let cells = this.get('level.cells');

    if(cells[this.get('pac.y')][this.get('pac.x')] == 0){
      cells[this.get('pac.y')][this.get('pac.x')] = -1;
      this.incrementProperty('score');

      // All the dots are consumed
      if(this.get('level').levelComplete()){
        this.incrementProperty('levelNumber')
        this.resetGame()
      }
    }
  },

  clearScreen(){
    let ctx = this.get('ctx');
    let width = this.get('level.pixelWidth');
    let height = this.get('level.pixelHeight')
    ctx.clearRect(0, 0, width, height);
  },

  drawDots(x, y){
    let scale = 1/8;
    this.drawCircle(x, y, scale, 'stationary');
  },

  drawMaze(){
    let ctx = this.get('ctx');
    let cells = this.get('level.cells');
    let cellSize = this.get('level.cellSize');
    cells.forEach((row, i)=>{
      row.forEach((grid, j)=>{
        if(grid == 1){
          ctx.fillRect(j * cellSize,
                 i * cellSize,
                 cellSize,
                 cellSize)
        }
        if(grid == 0){
          this.drawDots(j, i);
        }
      })
    })
  },

  resetGame(){
    this.get('pac').resetGame();
    this.get('level').resetGame();
  },


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

// Test removing everything from didInsertElement apart from setPacObject and loop

// finish levels fixing screenWidth and screenHeight.
