import Ember from 'ember';
import sharedElements from '../Mixins/sharedElements';

export default Ember.Object.extend(sharedElements, {
  x: 1,
  y: 2,

  direction: 'down',
  nextDirection: 'down',

  drawPacman(){
    let x = this.get('x');
    let y = this.get('y');
    let scale = 1/2;
    this.drawCircle(x, y, scale, this.get('direction'));
  },

  changeNextDirection(){
    let nextDirection = this.get("nextDirection")
    if(this.pathNotFree(nextDirection)){
      this.set('direction', 'stationary');
    } else {
      this.set('direction', nextDirection);
    }
  },

  movePacman(){
    if(this.moveCompleted()){
      this.finishMovement();
      this.changeNextDirection();
    } else if(this.get('direction') == 'stationary'){
      this.changeNextDirection();
    } else {
      this.incrementProperty('cycleCount');
    }

    Ember.run.later(this, this.movePacman, 1000/140);
  },

  moveCompleted(){
    return this.get('cycleCount') == this.get('frameRate');
  },

  finishMovement(){
    this.set('x', this.nextCell('x', this.get('direction')));
    this.set('y', this.nextCell('y', this.get('direction')));
    this.set('cycleCount', 1);
  },

  pathNotFree(direction) {
    let cell = this.getCell(direction);
    return Ember.isEmpty(cell) || cell === 1;
  },

  getCell(direction) {
    let nextX = this.nextCell('x', direction);
    let nextY = this.nextCell('y', direction);
    return this.get(`level.cells.${nextY}.${nextX}`);
  },

  nextCell(coordinate, direction){
    return this.get(coordinate) + this.get(`directions.${direction}.${coordinate}`);
  },

  resetGame(){
    this.set('x', 0);
    this.set('y', 0);
    this.set('cycleCount', 0);
    this.set('direction', 'stationary')
  },
  
})
