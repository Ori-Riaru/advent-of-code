import { readFileSync } from "fs";

function main(): void {
  let input = parseInput("./day17/input.txt");
}

function parseInput(path: string): string[] {
  let input = readFileSync(path, "utf8");

  return input.split("\n");
}

main();