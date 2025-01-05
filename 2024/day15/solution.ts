import { readFileSync } from "fs";

type Point = { x: number; y: number };

function main(): void {
  let path: string = "./day15/input.txt";

  // Part 1
  console.log("Part 1:");
  let input: { map: string[][]; start: Point; moves: Point[] } =
    parseInput(path);
  simulate(input.map, input.start, input.moves);

  // Part 2
  console.log("Part 2:");
  let wideInput: { map: string[][]; start: Point; moves: Point[] } =
    parseInputWide(path);
  console.log(simulate(wideInput.map, wideInput.start, wideInput.moves));
}

function parseInput(path: string): {
  map: string[][];
  start: Point;
  moves: Point[];
} {
  let input: string[] = readFileSync(path).toString().split("\n\n");

  // parse map
  let map: string[][] = input[0].split("\n").map((line) => line.split(""));

  // Search for starting location
  let start: Point = { x: 0, y: 0 };
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "@") {
        start = { x, y };
      }
    }
  }

  // parse moves
  let directions: Map<string, Point> = new Map([
    ["<", { x: -1, y: 0 }],
    [">", { x: 1, y: 0 }],
    ["^", { x: 0, y: -1 }],
    ["v", { x: 0, y: 1 }],
  ]);
  let moves: Point[] = input[1]
    .split("")
    .filter((c) => c !== "\n")
    .map((c) => directions.get(c)!);

  return { map, start, moves };
}

function parseInputWide(path: string): {
  map: string[][];
  start: Point;
  moves: Point[];
} {
  let input: string[] = readFileSync(path).toString().split("\n\n");

  // parse map
  let map: string[][] = [];
  let lines: string[] = input[0].split("\n");

  for (let line of lines) {
    let row: string[] = [];
    for (let char of line) {
      if (char === "@") {
        row.push("@");
        row.push(".");
      } else if (char === ".") {
        row.push(".");
        row.push(".");
      } else if (char === "#") {
        row.push("#");
        row.push("#");
      } else {
        row.push("[");
        row.push("]");
      }
    }
    map.push(row);
  }

  // Search for starting location
  let start: Point = { x: 0, y: 0 };
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "@") {
        start = { x, y };
      }
    }
  }

  let directions: Map<string, Point> = new Map([
    ["<", { x: -1, y: 0 }],
    [">", { x: 1, y: 0 }],
    ["^", { x: 0, y: -1 }],
    ["v", { x: 0, y: 1 }],
  ]);
  let moves: Point[] = input[1]
    .split("")
    .filter((c) => c !== "\n")
    .map((c) => directions.get(c)!);

  return { map, start, moves };
}

// Part 1
function simulate(map: string[][], bot_start: Point, moves: Point[]): number {
  let bot_position: Point = bot_start;

  for (let direction of moves) {
    moveSquare(map, bot_position, direction);
  }

  return calculateGPSSum(map);
}

function moveSquare(map: string[][], square: Point, direction: Point): void {
  if (validMove(map, square, direction)) {
    executeMove(map, square, direction);
  }
}

function validMove(
  map: string[][],
  square: Point,
  direction: Point,
  visited: Set<string> = new Set()
): boolean {
  // Already visited this space no need to check it again
  let key: string = `${square.x},${square.y}`;
  if (visited.has(key)) {
    return true;
  }
  visited.add(key);

  // Check for obstacles that can't be moved out of the way
  let nextX: number = square.x + direction.x;
  let nextY: number = square.y + direction.y;
  let nextSpace: string = map[nextY][nextX];

  // Unable to move into wall
  if (nextSpace == "#") {
    return false;
  }

  // Unable to move into a small box if it can't be moved out of the way
  if (nextSpace === "O") {
    return validMove(map, { x: nextX, y: nextY }, direction, visited);
  }

  // Unable to move into a large box if it and it's other half can't be moved out of the way
  if (nextSpace === "[") {
    return (
      validMove(map, { x: nextX, y: nextY }, direction, visited) &&
      validMove(map, { x: nextX + 1, y: nextY }, direction, visited)
    );
  }
  if (nextSpace === "]") {
    return (
      validMove(map, { x: nextX, y: nextY }, direction, visited) &&
      validMove(map, { x: nextX - 1, y: nextY }, direction, visited)
    );
  }

  // Nothing blocking the move
  return true;
}

function executeMove(
  map: string[][],
  square: Point,
  direction: Point,
  visited: Set<string> = new Set()
): void {
  // Already moved this space no need to move it again
  let key: string = `${square.x},${square.y}`;
  if (visited.has(key)) {
    return;
  }
  visited.add(key);

  // Moved obstacles out of the way
  let nextX: number = square.x + direction.x;
  let nextY: number = square.y + direction.y;
  let nextSpace: string = map[nextY][nextX];

  // Move small box out of the way
  if (nextSpace === "O") {
    executeMove(map, { x: nextX, y: nextY }, direction, visited);
  }

  // Move both halves of a the large box out of the way
  if (nextSpace === "[") {
    executeMove(map, { x: nextX, y: nextY }, direction, visited);
    executeMove(map, { x: nextX + 1, y: nextY }, direction, visited);
  }
  if (nextSpace === "]") {
    executeMove(map, { x: nextX - 1, y: nextY }, direction, visited);
    executeMove(map, { x: nextX, y: nextY }, direction, visited);
  }

  // Space has been cleared move current box
  let current: string = map[square.y][square.x];
  map[square.y][square.x] = map[nextY][nextX];
  map[nextY][nextX] = current;

  square.x += direction.x;
  square.y += direction.y;
}

function calculateGPSSum(map: string[][]): number {
  let sum: number = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "O" || map[y][x] === "[") {
        sum += 100 * y + x;
      }
    }
  }

  return sum;
}

function logMap(map: string[][]): void {
  for (let line of map) {
    console.log(line.join(""));
  }
}

main();
