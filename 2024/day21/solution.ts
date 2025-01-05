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

// Generates all possible shortest paths from start to end
let bfsCache: Record<string, string[]> = {};
function bfs(map: string[][], start: Point, end: Point): string[] {
  let currentKey = `${start.x},${start.y},${end.x},${end.y}`;
  if (bfsCache[currentKey]) {
    return bfsCache[currentKey];
  }

  let shortestCodes: string[] = [];
  let minLength: number = Infinity; // Length of the shortest code
  let queue: Node[] = [{ x: start.x, y: start.y, code: "" }];

  while (queue.length > 0) {
    let current: Node = queue.shift()!;

    if (current.x === end.x && current.y === end.y) {
      // Exhausted all shortest paths
      if (current.code.length > minLength) {
        break;
      }

      // Found a shortest path
      shortestCodes.push(current.code + "A");
      minLength = current.code.length;
    }

    // Search valid adjacent nodes
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

      // add adjacent node to search queue
      queue.push(next);
    }
  }

  bfsCache[currentKey] = shortestCodes;
  return shortestCodes;
}

let minLengthCache: Record<string, number> = {};
function buttonLengthAfterDepth(
  button: string,
  pad: string[][],
  padIndex: Record<string, Point>,
  depth: number = 0
): number {
  if (depth === 0) {
    return 1;
  }

  let currentKey = `${button},${depth}`;
  if (minLengthCache[currentKey]) {
    return minLengthCache[currentKey];
  }

  let buttonCodes: string[] = bfs(pad, padIndex["A"], padIndex[button]);
  let shortestCode = Infinity;
  for (let code of buttonCodes) {
    let codeLength = 0;
    for (let b of code) {
      codeLength += buttonLengthAfterDepth(b, pad, padIndex, depth - 1);
    }

    if (codeLength < shortestCode) {
      shortestCode = codeLength;
    }
  }

  minLengthCache[currentKey] = shortestCode;
  return shortestCode;
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

function parseInput(path: string): string[] {
  return readFileSync(path, "utf8").split("\n");
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

  let input = parseInput("./2024/day21/test_input.txt");

  let sum = 0;
  for (let code of input) {
    let dPadCodes: string[] = [""];
    let previous = "A";

    for (let button of code) {
      let codeSegments = bfs(
        numPad,
        numPadIndex[previous],
        numPadIndex[button]
      );

      let currentCodes: string[] = [];
      for (let code of dPadCodes) {
        for (let segment of codeSegments) {
          currentCodes.push(code + segment);
        }
      }

      dPadCodes = currentCodes;
      previous = button;
    }

    let min = Infinity;
    for (let dPadCode of dPadCodes) {
      let codeLength = 0;
      for (let button of dPadCode) {
        let length = buttonLengthAfterDepth(button, dPad, dPadIndex, 2);
        codeLength += length;
      }

      console.log("Code:", code);

      if (codeLength < min) {
        min = codeLength;
      }
    }
    console.log(min);
    console.log(parseInt(code));
    sum += min * parseInt(code);
  }

  console.log(minLengthCache);
  console.log(sum);
}

main();
