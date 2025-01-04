import * as fs from "fs";

function main(): void {
  let machines: Machine[] = parseInput("./day13/input.txt");

  part1(machines);

  part2(machines);
}

type Machine = {
  aOffset: {
    x: number;
    y: number;
  };

  bOffset: {
    x: number;
    y: number;
  };

  prize: {
    x: number;
    y: number;
  };
};

function parseInput(path: string): Machine[] {
  let input: string = fs.readFileSync(path, "utf8");
  let inputBlocks: string[] = input.split("\n\n");
  let machines: Machine[] = [];

  for (let block of inputBlocks) {
    let nums: number[] = block.match(/\d+/g)!.map(Number);

    let machine: Machine = {
      aOffset: { x: nums[0], y: nums[1] },
      bOffset: { x: nums[2], y: nums[3] },
      prize: { x: nums[4], y: nums[5] },
    };

    machines.push(machine);
  };

  return machines;
}

function part1(machines: Machine[]): void {
  console.log("Part 1:");

  let totalCost: number = 0;
  for (let machine of machines){
    let minCost: number = searchForPrize(machine);
    if (minCost !== Infinity) {
      totalCost += minCost;
    }
  };

  console.log(totalCost);
}

function searchForPrize(
  machine: Machine,
  clawX: number = 0,
  clawY: number = 0,
  aClicks: number = 0,
  bClicks: number = 0,
  memo: Map<string, number> = new Map()
): number {
  let key: string = `${aClicks} ${bClicks}`;
  if (memo.has(key)) {
    return memo.get(key)!;
  }

  if (clawX === machine.prize.x && clawY === machine.prize.y) {
    return 0;
  }

  let aCost = Infinity;
  let bCost = Infinity;

  // option 1: Press button A
  if (aClicks <= 100) {
    aCost =
      searchForPrize(
        machine,
        clawX + machine.aOffset.x,
        clawY + machine.aOffset.y,
        aClicks + 1,
        bClicks,
        memo
      ) + 3;
  }

  // option 2: Press button B
  if (bClicks <= 100) {
    bCost =
      searchForPrize(
        machine,
        clawX + machine.bOffset.x,
        clawY + machine.bOffset.y,
        aClicks,
        bClicks + 1,
        memo
      ) + 1;
  }

  let minCost: number = Math.min(aCost, bCost);
  memo.set(key, minCost);
  return minCost;
}

function part2(machines: Machine[]): void {
  console.log("Part 2:");

  for (let machine of machines) {
    machine.prize.x += 10000000000000;
    machine.prize.y += 10000000000000;
  };

  let totalCost: number = 0;
  for (let machine of machines) {
    let minCost: number = calculateCost(machine);
    if (minCost !== Infinity) {
      totalCost += minCost;
    }
  };

  console.log(totalCost);
}

function calculateCost(machine: Machine): number {
  let clicksA: number =
    (machine.prize.x * machine.bOffset.y -
      machine.prize.y * machine.bOffset.x) /
    (machine.aOffset.x * machine.bOffset.y -
      machine.aOffset.y * machine.bOffset.x);

  let clicksB: number =
    (machine.prize.x - machine.aOffset.x * clicksA) / machine.bOffset.x;

  if (clicksA % 1 == 0 && clicksB % 1 == 0) {
    return clicksA * 3 + clicksB * 1;
  } else {
    return Infinity;
  }
}
main();
