// Incomplete solution

import { read, readFileSync } from 'fs';

function fill() {

}

function parseInput(path: string) {
    let computers: Record<string, string[]> = {};

    let input = readFileSync(path, 'utf8');

    for (let line of input.split('\n')) {
        let [computer1, computer2] = line.split('-');
        if (!computers[computer1]) computers[computer1] = [];
        if (!computers[computer2]) computers[computer2] = [];

        computers[computer1].push(computer2);
        computers[computer2].push(computer1);
    }

    return computers;
}

function main() {
    let computers = parseInput('./2024/day23/test_input.txt');

    // let groups: Set<string> = set();
    for (let computer1 of Object.entries(computers)) { 
        for (let a = 0; a < 4; a++) {
            for (let b = 0; b < 4; b++) {
                for (let c = 0; c < 4; c++) {
                    // groups.add(computer1[1][a] + ',' + computer1[1][b] + ',' + computer1[1][c]);
                }
            }
        }
    }

}

main();