import Ember from 'ember';
import sharedElements from '../Mixins/sharedElements';

export default Ember.Component.extend(KeyboardShortcuts, {
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
  movePacman(){
    let nextDirection = this.get('nextDirection');
    if (this.pathNotFree(nextDirection)) {
      this.set('direction','stationary');
    } else {
      this.set('direction', nextDirection)
    }
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
