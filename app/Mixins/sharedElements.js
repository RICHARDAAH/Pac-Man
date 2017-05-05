import Ember from 'ember';
export default Ember.Mixin.create({

  directions: {
    'up': {x: 0, y: -1},
    'down': {x: 0, y: 1},
    'left': {x: -1, y: 0},
    'right': {x: 1, y: 0},
    'stationary': {x: 0, y: 0}
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

  cellSize: 40,
  numCycles: 1,
  frameRate: 30,
  ctx: Ember.computed(function(){
    let canvas = document.getElementById('my-canvas');
    return canvas.getContext('2d');
  }),
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
})
