import Ember from 'ember';
export default Ember.Mixin.create ({

x: null,
y: null,
Level: null,

  moveLoop(){
    if(this.moveCompleted()){
      this.finishMovement();
      this.changeNextDirection();
    } else if(this.get('direction') == 'stationary'){
      this.changeNextDirection();
    } else {
      this.incrementProperty('cycleCount');
    }

    Ember.run.later(this, this.moveLoop, 1000/140);
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
  })
