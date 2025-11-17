# Knights Travails

Implementation of the shortest knight path on an 8x8 chessboard using BFS.

Usage:

```bash
node main.js
```

Example output (cartesian coords):

```
You made it in 1 moves! Here's your path:
[0,0] -> [1,2]
---
You made it in 2 moves! Here's your path:
[0,0] -> [2,1] -> [3,3]
---
```

You can also call the function with algebraic notation (e.g. `a1`, `h8`) by using the option `{ algebraic: true }`. The function now returns an object `{ moves, path }` where `path` is an array of `[x,y]` coordinates.

API:
- `knightMoves(start, end, options)` — returns `{ moves, path }` or `null` if no path (shouldn't happen on 8x8)
	- `start`, `end`: arrays like `[x,y]` (0..7) or algebraic strings when `options.algebraic` is true
	- `options`: `{ algebraic: boolean }

Helpers exported in the module: `coordToAlgebraic`, `algebraicToCoord`.
