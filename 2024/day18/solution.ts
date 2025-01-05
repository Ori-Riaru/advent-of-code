import { readFileSync } from "fs";

function main() {
  let input: { map: string[][]; bytes: Point[] } =
    parseInput("./day18/input.txt");
  let map = input.map;
  let bytes = input.bytes;
  let start = { x: 70, y: 70 };
  let end = { x: 0, y: 0 };

  // Part 1
  for (let i = 0; i < 1024; i++) {
    let byte: Point = bytes.shift()!;
    map[byte.y][byte.x] = "█";
  }

  console.log("Part 1: ");
  console.log(bfs(map, start, end));

  // Part 2
  console.log("Part 2: ");
  while (true) {
    let byte: Point = bytes.shift()!;
    if (!byte) {
      break;
    }
    map[byte.y][byte.x] = "█";

    let result = bfs(map, start, end);

    if (result === undefined) {
      console.log(byte.x + "," + byte.y);
      break;
    }
  }
}

type Point = { x: number; y: number };

function parseInput(path: string): { map: string[][]; bytes: Point[] } {
  let file: string = readFileSync(path, "utf8");
  let lines: string[] = file.split("\n");

  let bytes: Point[] = [];
  for (let line of lines) {
    let parts: string[] = line.split(",");
    let x: number = parseInt(parts[0]);
    let y: number = parseInt(parts[1]);
    bytes.push({ x, y });
  }

  let map: string[][] = [];
  for (let i = 0; i <= 70; i++) {
    map.push([]);
    for (let j = 0; j <= 70; j++) {
      map[i].push(" ");
    }
  }

  return { map, bytes };
}

function bfs(map: string[][], start: Point, end: Point) {
  let distance: Record<string, number> = {};
  distance[start.x + "," + start.y] = 0;
  let queue: Point[] = [start];
  let adjacent: Point[] = [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 0, y: -1 },
  ];

  while (true) {
    let current: Point = queue.shift()!;
    if (!current) {
      break;
    }

    let currentKey: string = `${current.x},${current.y}`;

    if (current.x === end.x && current.y === end.y) {
      break;
    }

    for (let adj of adjacent) {
      let next: Point = { x: current.x + adj.x, y: current.y + adj.y };
      let nextKey: string = `${next.x},${next.y}`;

      if (
        next.x >= 0 &&
        next.x <= 70 &&
        next.y >= 0 &&
        next.y <= 70 &&
        distance[nextKey] === undefined &&
        map[next.y][next.x] === " "
      ) {
        distance[nextKey] = distance[currentKey] + 1;
        queue.push(next);
      }
    }
  }

  return distance[end.x + "," + end.y];
}

function logMap(map: string[][], distance: Record<string, number>) {
  for (let i = 0; i < map[0].length; i++) {
    process.stdout.write(i.toString().padEnd(2, " "));
  }
  console.log();

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      let key = `${j},${i}`;
      if (distance[key] === undefined) {
        process.stdout.write(map[i][j]);
        process.stdout.write(map[i][j]);
      } else {
        process.stdout.write(
          distance[key].toString().padStart(3, " ").slice(1, 3)
        );
      }
    }
    console.log(i);
  }
}

main();
