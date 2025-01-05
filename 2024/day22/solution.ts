import { readFileSync } from "fs";

function evolveSecret(secret: number): number {
  // Step 1:
  secret = prune(mix(secret, secret * 64));

  // Step 2:
  secret = prune(mix(secret, Math.floor(secret / 32)));

  // Step 3:
  secret = prune(mix(secret, secret * 2048));

  return secret;
}

function mix(secret: number, value: number): number {
  return secret ^ value;
}

function prune(secret: number): number {
  return ((secret % 16777216) + 16777216) % 16777216;
}

function parseInput(path: string): number[] {
  return readFileSync(path, "utf8").split("\n").map(Number);
}

// 2009
function main() {
  let input = parseInput("./2024/day22/input.txt");

  let p: number[][] = [];
  let ca: number[][] = [];

  // Part 1
  let sum = 0;
  for (let secret of input) {
    let prices = new Array(2000);
    let changes = new Array(2000);
    for (let i = 0; i < 2000; i++) {
      prices[i] = secret % 10;
      changes[i] = prices[i] - prices[i - 1];
      secret = evolveSecret(secret);
    }
    sum += secret;

    p.push(prices);
    ca.push(changes);
  }
  console.log(sum);

  let maxProfit = 0;

  for (let a = -9; a <= 9; a++) {
    for (let b = -9; b <= 9; b++) {
      for (let c = -9; c <= 9; c++) {
        for (let d = -9; d <= 9; d++) {
          let totalProfit = 0;
          for (let j = 0; j < p.length; j++) {
            let profit = 0;
            for (let i = 0; i < 2000 - 3; i++) {
              if (
                a === ca[j][i] &&
                b === ca[j][i + 1] &&
                c === ca[j][i + 2] &&
                d === ca[j][i + 3]
              ) {
                profit += p[j][i + 3];
                break;
              }
            }
            totalProfit += profit;
          }

          if (totalProfit > maxProfit) {
            console.log(totalProfit);
            maxProfit = totalProfit;
          }
        }
      }
    }
  }
}

main();
