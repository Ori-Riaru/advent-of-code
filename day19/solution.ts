import { readFileSync } from "fs";

function main() {
  let input: { segments: string[]; patterns: string[] } = parseInput(
    "./day19/input.txt"
  );

  let count: number = 0;
  let sum: number = 0;
  for (let pattern of input.patterns) {
    cache = {};

    let perm: number = buildPattern(pattern, input.segments);
    if (perm != 0) {
      sum += perm;
      count++;
    }
  }

  console.log("Part 1: ");
  console.log(count);
  console.log("Part 2: ");
  console.log(sum);
}

function parseInput(path: string): { segments: string[]; patterns: string[] } {
  let file = readFileSync(path, "utf8");
  let blocks = file.split("\n\n");
  let segments = blocks[0].split(", ");
  let patterns = blocks[1].split("\n");

  return { patterns, segments };
}

let cache: Record<string, number> = {};

function buildPattern(targetPattern: string, segments: string[], currentPattern: string = ""): number {  
  if (cache[currentPattern] !== undefined) {
    return cache[currentPattern];
  }
  
  // Current pattern matches the target pattern
  if (currentPattern.length === targetPattern.length) {
    return 1;
  } 

  let count: number = 0;
  for (let segment of segments) { 
    let nextPattern = currentPattern + segment;

    // Next pattern is a prefix of the target pattern
    if (nextPattern === targetPattern.slice(0, nextPattern.length)) {
      // count segments that can be extended to match the target pattern
      count += buildPattern(targetPattern, segments, nextPattern)
    }
  }

  cache[currentPattern] = count;
  return count;
}

main();
