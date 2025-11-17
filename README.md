# Knights Travails

Implementation of the shortest knight path on an 8x8 chessboard using BFS.

Usage:

```bash
node main.js
```

Example output:

```
You made it in 1 moves! Here's your path:
[0,0] -> [1,2]
---
You made it in 2 moves! Here's your path:
[0,0] -> [1,2] -> [3,3]
---
...
```

The `knightMoves(start, end)` function returns an array of positions in the form `[x,y]` representing the shortest path from `start` to `end`.
