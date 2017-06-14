import Level from './level';
export default Level.extend({
  cellSize: 60,

  // 1 = wall, 0 = dot, -1 = empty
  cells: [
    [0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1],
    [1,1,1,1,1,1,1,1,1.1,1,1,1,0,0,0,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ],
  startPosition: {x: 4, y: 3},

})