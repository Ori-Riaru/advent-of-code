import { readFileSync } from "fs";

function main() {
  let input = parseInput("./day20/input.txt");
  let distances: number[][] = bfs(input.map, input.start!, input.end!);

  // Part 1
  console.log("Part 1: ");
  console.log(countCheats(distances, 2, 100)); // 1332

  // Part 2
  console.log("Part 2: ");
  console.log(countCheats(distances, 20, 100)); // 987695
}

function parseInput(path: string): {
  map: string[][];
  start: Point | undefined;
  end: Point | undefined;
} {
  let input = readFileSync(path, "utf8");
  let map = input.split("\n").map((line) => line.split(""));

  let start: Point | undefined = undefined;
  let end: Point | undefined = undefined;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "S") {
        start = { x, y };
        map[y][x] = ".";
      } else if (map[y][x] === "E") {
        end = { x, y };
        map[y][x] = ".";
      }
    }
  }

  return { map, start, end };
}

type Point = { x: number; y: number };

function bfs(map: string[][], start: Point, end: Point): number[][] {
  let distance: number[][] = [];
  for (let row = 0; row <= map[0].length; row++) {
    distance.push([]);
    for (let _col = 0; _col <= map.length; _col++) {
      distance[row].push(Infinity);
    }
  }

  let queue: Point[] = [start];
  distance[start.y][start.x] = 0;

  let adjacent: Point[] = [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 0, y: -1 },
  ];

  while (queue.length > 0) {
    let current: Point = queue.shift()!;

    if (current.x === end.x && current.y === end.y) {
      break;
    }

    for (let adj of adjacent) {
      let next: Point = { x: current.x + adj.x, y: current.y + adj.y };

      if (distance[next.y][next.x] !== Infinity) {
        continue;
      }

      if (
        next.x < 0 ||
        next.x >= map[0].length ||
        next.y < 0 ||
        next.y >= map.length ||
        map[next.y][next.x] === "#"
      ) {
        continue;
      }

      distance[next.y][next.x] = distance[current.y][current.x] + 1;
      queue.push(next);
    }
  }

  return distance;
}

function countCheats(
  distance: number[][],
  cheatTime: number,
  minSaved: number
): number {
  let cheats: Point[] = [];
  for (let y = -cheatTime; y <= cheatTime; y++) {
    for (let x = -cheatTime; x <= cheatTime; x++) {
      if (Math.abs(y) + Math.abs(x) <= cheatTime && !(y === 0 && x === 0)) {
        cheats.push({ x, y });
      }
    }
  }

  let count: number = 0;

  for (let y = 0; y < distance.length; y++) {
    for (let x = 0; x < distance[y].length; x++) {
      for (let offset of cheats) {
        let next: Point = { x: x + offset.x, y: y + offset.y };

        if (
          next.x < 0 ||
          next.x >= distance[0].length ||
          next.y < 0 ||
          next.y >= distance.length ||
          distance[next.y][next.x] === Infinity
        ) {
          continue;
        }

        let distanceTraveled = Math.abs(offset.x) + Math.abs(offset.y);
        let distanceSaved =
          distance[next.y][next.x] - distance[y][x] - distanceTraveled;
        if (distanceSaved >= minSaved) {
          count++;
        }
      }
    }
  }

  return count;
}

function logMap(map: string[][]) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "#") {
        process.stdout.write("██");
      } else if (map[y][x] === ".") {
        process.stdout.write("  ");
      } else {
        process.stdout.write(map[y][x]);
        process.stdout.write(map[y][x]);
      }
    }
    console.log();
  }
}

main();
