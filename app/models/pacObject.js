import Ember from 'ember';
import sharedElements from '../Mixins/sharedElements';

export default Ember.Object.extend(sharedElements, {
  x: 1,
  y: 2,
  direction: 'stationary',
  nextDirection: 'down',

  drawPacman() {
    let x      = this.get('x');
    let y      = this.get('y');
    let scale  = 1/2;
    this.drawCirlce(x, y, scale, this.get('direction'));
  },
  changeNextDirection(){
    let nextDirection = this.get('nextDirection');
    if (this.pathNotFree(nextDirection)) {
      this.set('direction','stationary');
    } else {
      this.set('direction', nextDirection)
    }
  },
  movePacman(){
    if (this.moveCompleted()){
      this.finishMovement();
      this.changeNextDirection();
      console.log(this.get('numCycles'));
    } else if (this.get('direction') == 'stationary'){
      this.changeNextDirection();
      console.log(this.get('numCycles'));
    } else {
      this.incrementProperty('numCycles');
      console.log(this.get('numCycles'));
    }
  },
  moveCompleted(){
    return this.get('numCycles') == this.get('frameRate');
  },
  finishMovement() {
    this.set('x', this.nextCell('x', this.get('direction')));
     this.set('y', this.nextCell('y', this.get('direction')));
     this.set('numCycles', 1);
  },
  pathNotFree(direction){
    let cell = this.getCellType(direction);
    return (cell == 1 || Ember.isEmpty(cell));
  },
  getCellType(direction) {
    let x = this.nextCell('x', direction);
    let y = this.nextCell('y', direction);
    return this.get(`cells.${y}.${x}`);
  },
  nextCell(coordinate, direction){
    return this.get(coordinate) + this.get(`directions.${direction}.${coordinate}`);
  },
})
