const { knightMoves, coordToAlgebraic } = require('./knightMoves');

function printPath(start, end, options = {}) {
  const result = knightMoves(start, end, options);
  if (!result) {
    console.log(`No path found from ${start} to ${end}`);
    return;
  }
  const { moves, path } = result;
  console.log(`You made it in ${moves} moves! Here's your path:`);
  if (options.algebraic) {
    console.log(path.map(coordToAlgebraic).join(' -> '));
  } else {
    console.log(path.map(p => `[${p[0]},${p[1]}]`).join(' -> '));
  }
}

// Demo cases (cartesian coords)
printPath([0,0], [1,2]);
console.log('---');
printPath([0,0], [3,3]);
console.log('---');
printPath([3,3], [0,0]);
console.log('---');
printPath([0,0], [7,7]);
console.log('---');
printPath([4,4], [5,5]);
console.log('\nAlgebraic notation examples:');
printPath('a1', 'b3', { algebraic: true });
console.log('---');
printPath('a1', 'h8', { algebraic: true });
