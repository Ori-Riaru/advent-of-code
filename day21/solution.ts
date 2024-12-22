import { readFileSync } from "fs";

type Point = { x: number; y: number };

type Node = {
  x: number;
  y: number;
  code: string;
};

type Direction = {
  x: number;
  y: number;
  symbol: string;
};

const ADJACENT: Direction[] = [
  { x: 0, y: -1, symbol: "^" },
  { x: 1, y: 0, symbol: ">" },
  { x: 0, y: 1, symbol: "v" },
  { x: -1, y: 0, symbol: "<" },
];
let bfsCache: Record<string, string[]> = {};

// Generates all possible shortest paths from start to end
function bfs(map: string[][], start: Point, end: Point): string[] {
  let currentKey = `${start.x},${start.y},${end.x},${end.y}`;
  if (bfsCache[currentKey]) {
    return bfsCache[currentKey];
  }

  let minDistance: number = Infinity;
  let bestCodes: string[] = [];
  let queue: Node[] = [{ x: start.x, y: start.y, code: "" }];

  while (queue.length > 0) {
    let current: Node = queue.shift()!;

    if (current.x === end.x && current.y === end.y) {
      if (current.code.length > minDistance) {
        break;
      }
      bestCodes.push(current.code + "A");
      minDistance = current.code.length;
    }

    for (let offset of ADJACENT) {
      let next: Node = {
        x: current.x + offset.x,
        y: current.y + offset.y,
        code: current.code + offset.symbol,
      };

      // Adjacent node is out of bounds
      if (
        next.x < 0 ||
        next.x >= map[0].length ||
        next.y < 0 ||
        next.y >= map.length ||
        map[next.y][next.x] === "#"
      ) {
        continue;
      }

      queue.push(next);
    }
  }

  bfsCache[currentKey] = bestCodes;
  return bestCodes;
}


function shortestCodes(
  code: string,
  pad: string[][],
  padIndex: Record<string, Point>
): string[] {
  let previous = "A"; // Start at A button
  let codes = [""]; // Start with no moves

  for (let button of code) {
    // Find shortest path from previous button to current button
    let codeSegments = bfs(pad, padIndex[previous], padIndex[button]);

    // Generate all combinations of the previous codes and the best next segment
    let currentCodes: string[] = [];
    for (let code of codes) {
      for (let segment of codeSegments) {
        currentCodes.push(code + segment);
      }
    }

    previous = button;
    codes = currentCodes;
  }

  // Remove codes that are longer than the shortest code
  codes = codes.sort((a, b) => a.length - b.length);
  let shortestCode = codes[0].length;
  codes = codes.filter((path) => path.length === shortestCode);

  return codes;
}

let minLengthCache: Record<string, number> = {};

function lengthAfterDepth(x, y, depth): (
  code: string,
  pad: string[][],
  padIndex: Record<string, Point>,
  maxDepth: number = 0
): number {
  if (maxDepth === 0) { 
    return code.length;
  }

  if (minLengthCache[code]) {
    return minLengthCache[code];
  }

  let nextCodes: string[] = shortestCodes(, pad, padIndex);

  let min = Infinity;
  for (let path of nextCodes) {
    let length = minLengthAtDepth(path, pad, padIndex, maxDepth - 1);
    if (length < min) {
      min = length;
    }
  }

  minLengthCache[code] = min;

  return min;
}

function parseInput(path: string): string[] {
  return readFileSync(path, "utf8").split("\n");
}

function indexPad(pad: string[][]): Record<string, Point> {
  let index: Record<string, Point> = {};

  for (let y = 0; y < pad.length; y++) {
    for (let x = 0; x < pad[y].length; x++) {
      index[pad[y][x]] = { x, y };
    }
  }

  return index;
}


function main() {
  const numPad = [
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    ["#", "0", "A"],
  ];
  const dPad = [
    ["#", "^", "A"],
    ["<", "v", ">"],
  ];
  const numPadIndex: Record<string, Point> = indexPad(numPad);
  const dPadIndex: Record<string, Point> = indexPad(dPad);

  let input = parseInput("./day21/test_input.txt");

  let sum = 0;
  for (let code of input) {
    let dPadCodes = shortestCodes(code, numPad, numPadIndex);

    let min = Infinity
    for (let dPadCode of dPadCodes) {
      let minLength = minLengthAtDepth(dPadCode, dPad, dPadIndex, 3);
      if (minLength < min) {
        min = minLength;
      }
    }

    sum += min * parseInt(code);
  }

  console.log("Part 1:");
  console.log(sum);
}

main();
