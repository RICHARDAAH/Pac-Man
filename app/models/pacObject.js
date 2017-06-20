import Ember from 'ember';
import sharedElements from '../Mixins/sharedElements';
import Movement from '../Mixins/movement';

export default Ember.Object.extend(sharedElements, Movement, {

  direction: 'down',
  nextDirection: 'down',

  changeNextDirection(){
    let nextDirection = this.get("nextDirection")
    if(this.pathNotFree(nextDirection)){
      this.set('direction', 'stationary');
    } else {
      this.set('direction', nextDirection);
    }
  },

  drawPacman(){
    let x = this.get('x');
    let y = this.get('y');
    let scale = 1/2;
    this.drawCircle(x, y, scale, this.get('direction'), 'green');
  },

  resetGame(){
    this.set('x', this.get('level.startPosition.x'));
    this.set('y', this.get('level.startPosition.y'));
    this.set('cycleCount', 0);
    this.set('direction', 'stationary')
  },

})
