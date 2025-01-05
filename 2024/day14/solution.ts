import { readFileSync } from "fs";

function main(): void {
  let path = "./day14/input.txt";

  let robots: Robot[] = parseInput(path);
  part1(robots);

  robots = parseInput(path);
  part2(robots);
}

type Robot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

function parseInput(path: string): Robot[] {
  let input = readFileSync(path, "utf8");
  let lines = input.split("\n");
  let robots: Robot[] = [];

  for (let line of lines) {
    let nums: number[] = line.match(/-*\d+/g)!.map(Number);
    let robot: Robot = {
      x: nums[0],
      y: nums[1],
      vx: nums[2],
      vy: nums[3],
    };

    robots.push(robot);
  }

  return robots;
}

function part1(robots: Robot[]): void {
  console.log("Part 1: ");

  for (let _second = 1; _second <= 100; _second++) {
    for (let robot of robots) {
      updateRobot(robot);
    }
  }

  console.log(calculateSafetyFactory(robots));
}

function part2(robots: Robot[]): void {
  let minSafetyFactor: number = Infinity;
  let minSafetyFactorIndex: number = -1;

  console.log("Part 2: ");

  for (let _second = 1; _second <= 10000; _second++) {
    for (let robot of robots) {
      updateRobot(robot);
    }

    let safetyFactor = calculateSafetyFactory(robots);

    if (safetyFactor < minSafetyFactor) {
      minSafetyFactor = safetyFactor;
      minSafetyFactorIndex = _second;
    }
  }

  console.log(minSafetyFactorIndex);
}

function updateRobot(robot: Robot): void {
  robot.x = (((robot.x + robot.vx) % 101) + 101) % 101;
  robot.y = (((robot.y + robot.vy) % 103) + 103) % 103;
}

function calculateSafetyFactory(Robots: Robot[]): number {
  let qCounts = [0, 0, 0, 0];

  for (let robot of Robots) {
    if (robot.x < 50 && robot.y < 51) {
      qCounts[0]++;
    } else if (robot.x > 50 && robot.y < 51) {
      qCounts[1]++;
    } else if (robot.x < 50 && robot.y > 51) {
      qCounts[2]++;
    } else if (robot.x > 50 && robot.y > 51) {
      qCounts[3]++;
    }
  }

  return qCounts[0] * qCounts[1] * qCounts[2] * qCounts[3];
}

function logRobots(robots: Robot[]): void {
  for (let y = 0; y < 103; y++) {
    for (let x = 0; x < 101; x++) {
      // Count robots on square
      let count = 0;
      for (let robot of robots) {
        if (robot.x === x && robot.y === y) {
          count++;
        }
      }

      // Print square
      if (count === 0) {
        process.stdout.write("  ");
      } else {
        process.stdout.write(count + " ");
      }
    }
    console.log();
  }
}

main();
