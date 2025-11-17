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

function knightMoves(start, end) {
  // start and end are arrays [x,y]
  if (!Array.isArray(start) || !Array.isArray(end) || start.length !== 2 || end.length !== 2) {
    throw new TypeError('start and end must be arrays like [x,y]');
  }
  if (!inBounds(start) || !inBounds(end)) {
    throw new RangeError('Coordinates must be on 0..7 range');
  }

  const startKey = coordToKey(start);
  const endKey = coordToKey(end);
  if (startKey === endKey) return [start.slice()];

  const queue = [startKey];
  const visited = new Set([startKey]);
  const parent = new Map(); // childKey -> parentKey

  while (queue.length > 0) {
    const currentKey = queue.shift();
    const [cx, cy] = keyToCoord(currentKey);

    for (const [dx, dy] of deltas) {
      const nx = cx + dx;
      const ny = cy + dy;
      const nKey = `${nx},${ny}`;
      if (!inBounds([nx, ny])) continue;
      if (visited.has(nKey)) continue;
      visited.add(nKey);
      parent.set(nKey, currentKey);
      if (nKey === endKey) {
        // reconstruct path
        const path = [];
        let k = nKey;
        while (k) {
          path.push(keyToCoord(k));
          k = parent.get(k);
        }
        // add start if not already
        // path currently from end -> start
        path.reverse();
        return path;
      }
      queue.push(nKey);
    }
  }

  // should never happen on 8x8 board
  return null;
}

module.exports = { knightMoves };
