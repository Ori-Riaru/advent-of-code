use std::fs;

pub fn run() {
    let mut elves: Vec<i32> = fs::read_to_string("./2022/day1/input.txt")
        .unwrap()
        .split("\r\n\r\n")
        .map(|elf| elf.lines().map(|line| line.parse::<i32>().unwrap()).sum())
        .collect();

    elves.sort();
    elves.reverse();

    println!("Top sum: {}", elves[0]);
    println!("Top 3 sum: {}", elves[0] + elves[1] + elves[2]);
}
