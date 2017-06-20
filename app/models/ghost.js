import Ember from 'ember';
import sharedElements from '../Mixins/sharedElements';

export default Ember.Object.extend(sharedElements, {
  drawGhost(){
    console.log(this.get('x'));
    this.drawCircle(this.get('x'), this.get('y'), 1/2, this.get('direction'), 'blue')
  }
})
