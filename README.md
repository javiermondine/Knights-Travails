# Knight Travails

Shortest knight path on an 8x8 chessboard using BFS algorithm.

## API

`knightMoves(start, end, options)` - Returns `{ moves, path }`

- `start`, `end`: Arrays like `[x,y]` (0..7) or algebraic strings with `{ algebraic: true }`
- Returns: `{ moves, path }` where path is array of coordinates

## Helpers

- `coordToAlgebraic(x, y)` - Convert coordinate to algebraic notation
- `algebraicToCoord(square)` - Convert algebraic to coordinate

## Usage

```bash
node main.js
```

Example:
```
You made it in 1 moves! Here's your path:
[0,0] -> [1,2]
```
