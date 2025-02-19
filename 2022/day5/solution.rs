use std::fs;

pub fn run() {
    let mut stacks = vec![
        vec!['S', 'L', 'W'],
        vec!['J', 'T', 'N', 'Q'],
        vec!['S', 'C', 'H', 'F', 'J'],
        vec!['T', 'R', 'M', 'W', 'N', 'G', 'B'],
        vec!['T', 'R', 'L', 'S', 'D', 'H', 'Q', 'B'],
        vec!['M', 'J', 'B', 'V', 'F', 'H', 'R', 'L'],
        vec!['D', 'W', 'R', 'N', 'J', 'M'],
        vec!['B', 'Z', 'T', 'F', 'H', 'N', 'D', 'J'],
        vec!['H', 'L', 'Q', 'N', 'B', 'F', 'T'],
    ];

    let procedure = fs::read_to_string("./2022/day5/input.txt").unwrap();

    for instruction in procedure.lines() {
        let steps: Vec<&str> = instruction.split(',').collect();
        let amount = steps[0].parse::<usize>().unwrap();
        let from = steps[1].parse::<usize>().unwrap() - 1;
        let to = steps[2].trim().parse::<usize>().unwrap() - 1;

        // part 1
        for _ in 0..amount {
            let moved = stacks[from].pop().unwrap();
            stacks[to].push(moved);
        }

        // Part 2
        // let final_length = stacks[from].len() - amount;
        // for a in stacks[from].split_off(final_length).into_iter() {
        //     stacks[to].push(a);
        // }
    }

    let mut result = "".to_string();
    for stack in stacks.iter_mut() {
        result.push(stack.pop().unwrap());
    }

    dbg!(result);
}
