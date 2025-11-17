function inBounds([x, y]) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

const deltas = [
  [2, 1], [1, 2], [-1, 2], [-2, 1],
  [-2, -1], [-1, -2], [1, -2], [2, -1]
];

function coordToKey([x, y]) {
  return `${x},${y}`;
}

function keyToCoord(key) {
  return key.split(',').map(n => parseInt(n, 10));
}

function algebraicToCoord(sq) {
  // e.g. 'a1' -> [0,0], 'h8' -> [7,7]
  if (typeof sq !== 'string' || sq.length < 2) return null;
  const file = sq[0].toLowerCase();
  const rank = parseInt(sq.slice(1), 10);
  const x = file.charCodeAt(0) - 'a'.charCodeAt(0);
  const y = rank - 1;
  if (!Number.isInteger(x) || !Number.isInteger(y)) return null;
  return [x, y];
}

function coordToAlgebraic([x, y]) {
  const file = String.fromCharCode('a'.charCodeAt(0) + x);
  const rank = (y + 1).toString();
  return `${file}${rank}`;
}

/**
 * Find shortest knight path between start and end on 8x8 board.
 * start,end: [x,y] coordinates (0..7) or algebraic strings if options.algebraic true
 * options: { algebraic: false }
 * Returns: { moves, path } where path is array of [x,y]
 */
function knightMoves(start, end, options = {}) {
  const useAlgebraic = Boolean(options.algebraic);
  // accept algebraic strings if option set
  if (useAlgebraic) {
    start = algebraicToCoord(start);
    end = algebraicToCoord(end);
  }

  // validate inputs
  if (!Array.isArray(start) || !Array.isArray(end) || start.length !== 2 || end.length !== 2) {
    throw new TypeError('start and end must be arrays like [x,y] or algebraic strings when using algebraic option');
  }
  if (!inBounds(start) || !inBounds(end)) {
    throw new RangeError('Coordinates must be on 0..7 range');
  }

  const startKey = coordToKey(start);
  const endKey = coordToKey(end);
  if (startKey === endKey) return { moves: 0, path: [start.slice()] };

  // efficient queue using head index to avoid shift()
  const queue = [startKey];
  let head = 0;
  const visited = new Set([startKey]);
  const parent = new Map(); // childKey -> parentKey

  while (head < queue.length) {
    const currentKey = queue[head++];
    const [cx, cy] = keyToCoord(currentKey);

    for (let i = 0; i < deltas.length; i++) {
      const dx = deltas[i][0];
      const dy = deltas[i][1];
      const nx = cx + dx;
      const ny = cy + dy;
      if (!inBounds([nx, ny])) continue;
      const nKey = `${nx},${ny}`;
      if (visited.has(nKey)) continue;
      visited.add(nKey);
      parent.set(nKey, currentKey);
      if (nKey === endKey) {
        // reconstruct path from end to start
        const path = [];
        let k = nKey;
        while (k) {
          path.push(keyToCoord(k));
          k = parent.get(k);
        }
        path.reverse();
        return { moves: path.length - 1, path };
      }
      queue.push(nKey);
    }
  }

  // theoretically unreachable on a standard 8x8 board
  return null;
}

module.exports = { knightMoves, coordToAlgebraic, algebraicToCoord };
