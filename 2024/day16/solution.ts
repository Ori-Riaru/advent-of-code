import type { Hash } from "bun";
import { readFileSync } from "fs";

type Point = { x: number; y: number };

function main(): void {
  let input: { map: string[][]; start: Point | null; end: Point | null } =
    parseInput("./day16/input.txt");

  let results: {cheapestCost: number, positions: number} = daikstras(input.map, input.start!, input.end!);

  console.log("Part 1:");
  console.log(results.cheapestCost); // 127520

  console.log("Part 2:");
  console.log(results.positions); // 565
}

function parseInput(path: string): {
  map: string[][];
  start: Point | null;
  end: Point | null;
} {
  let map: string[][] = [];

  let input = readFileSync(path, "utf8");

  for (let line of input.split("\n")) {
    let row: string[] = [];
    for (let char of line) {
      row.push(char);
    }
    map.push(row);
  }

  let start: Point | null = null;
  let end: Point | null = null;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "S") start = { x, y };
      if (map[y][x] === "E") end = { x, y };
    }
  }

  return { map, start, end };
}

type Node = {
  position: Point;
  direction: number;
  cost: number;
};

function daikstras(map: string[][], start: Point, end: Point): {cheapestCost: number, positions: number} {
  let directions: Point[] = [
    { x: 0, y: -1 }, // Up
    { x: 1, y: 0 }, // Right
    { x: 0, y: 1 }, // Down
    { x: -1, y: 0 }, // Left
  ];

  let minCosts: Map<string, number> = new Map();
  let queue: Node[] = [
    { position: start, direction: 1, cost: 0},
  ];
  let backtrack: Map<string, Set<string>> = new Map();
  let globalLowest: number = Infinity;

  while (queue.length > 0) {
    let current: Node = queue.pop()!;
    let currentKey: string = `${current.position.x},${current.position.y},${current.direction}`;

    let currentMinCost = minCosts.get(currentKey);
    if (currentMinCost !== undefined && current.cost > currentMinCost) {
      continue;
    }

    if (current.position.x == end.x && current.position.y == end.y) {
      if (current.cost > globalLowest) {
        break;
      }
      globalLowest = current.cost;
    }

    let adjacent: Node[] = [
      // Forward
      {
        position: {
          x: current.position.x + directions[current.direction].x,
          y: current.position.y + directions[current.direction].y,
        },
        direction: current.direction,
        cost: current.cost + 1,
      },

      // Turn Clockwise
      {
        position: {
          x: current.position.x,
          y: current.position.y,
        },
        direction: (current.direction + 1) % 4,
        cost: current.cost + 1000,
      },

      // Turn Counter Clockwise
      {
        position: {
          x: current.position.x,
          y: current.position.y,
        },
        direction: (current.direction - 1 + 4) % 4,
        cost: current.cost + 1000,
      },
    ];

    for (let newNode of adjacent) {
      // Illegal  position
      if (map[newNode.position.y][newNode.position.x] === "#") {
        continue;
      }

      let newKey: string = `${newNode.position.x},${newNode.position.y},${newNode.direction}`;
      
      let newMinCost = minCosts.get(newKey)!;
      if (newMinCost === undefined) {
        newMinCost = Infinity;
      }

      // More expensive than alternative path
      if (newNode.cost > newMinCost) {
        continue;
      }

      // New best path
      if (newNode.cost < newMinCost) {
        backtrack.set(newKey, new Set());
        minCosts.set(newKey, newNode.cost);
      }

      backtrack.get(newKey)!.add(currentKey);
      queue.push(newNode);
    }

    queue.sort((a, b) => b.cost - a.cost);
  }

  console.log(backtrack);
  console.log("rebuild");

  let visited: Set<string> = new Set();
  let previousQueue: string[] = [`${end.x},${end.y},1`];
  while (previousQueue.length > 0) {
    let currentKey = previousQueue.shift()!;
    if (currentKey === null) continue;
    
    visited.add(currentKey);

    let previous: Set<string> = backtrack.get(currentKey)!;

    if (!previous) {
      continue;
    }

    for (let previousKey of previous) {
      if (visited.has(previousKey)) continue;
      previousQueue.push(previousKey);
    }
    
  }

  // Filter out nodes with the same position but different directions
  let filtered: Set<string> = new Set();
  for (let nodeKey of visited) {
    filtered.add(nodeKey.slice(0, nodeKey.lastIndexOf(',')));
  }

  return { cheapestCost: globalLowest, positions: filtered.size };
}

function logMap(
  map: string[][],
  shortest: Set<string> = new Set()
): void {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      ;
      let key: string = `${x},${y}`;
      if (shortest.has(key)) {
        process.stdout.write("+ ");
      } else if (map[y][x] === ".") {
        process.stdout.write("  ");
      } else if (map[y][x] === "#") {
        process.stdout.write("██");
      } else {
        process.stdout.write(map[y][x] + " ");
      }
    }
    console.log("");
  }
}

main();
