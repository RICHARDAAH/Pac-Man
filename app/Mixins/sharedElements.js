import Ember from 'ember';
export default Ember.Mixin.create({

  directions: {
    'up': {x: 0, y: -1},
    'down': {x: 0, y: 1},
    'left': {x: -1, y: 0},
    'right': {x: 1, y: 0},
    'stationary': {x: 0, y: 0}
  },

  cycleCount: 1,
  frameRate: 30,
  ctx: Ember.computed(function(){
    return document.getElementById("canvas").getContext("2d");
  }),

  drawCircle(x, y, scale, direction, colour = '#555') {
    let ctx = this.get('ctx')
    let cellSize = this.get('level.cellSize');
    let pixelX = (x + 1/2 + this.offsetFor('x', direction)) * cellSize;
    let pixelY = (y + 1/2 + this.offsetFor('y', direction)) * cellSize;
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.arc(pixelX, pixelY, cellSize * scale, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  },
  offsetFor(coordinate, direction){
    return this.get(`directions.${direction}.${coordinate}`) * this.get('cycleCount') / this.get('frameRate');
  },


});
