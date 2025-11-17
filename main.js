const { knightMoves } = require('./knightMoves');

function printPath(start, end) {
  const path = knightMoves(start, end);
  if (!path) {
    console.log(`No path found from ${start} to ${end}`);
    return;
  }
  console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
  console.log(path.map(p => `[${p[0]},${p[1]}]`).join(' -> '));
}

// Demo cases
printPath([0,0], [1,2]);
console.log('---');
printPath([0,0], [3,3]);
console.log('---');
printPath([3,3], [0,0]);
console.log('---');
printPath([0,0], [7,7]);
console.log('---');
printPath([4,4], [5,5]);
