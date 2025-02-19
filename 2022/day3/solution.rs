use std::fs;

fn priority(item: char) -> i32 {
    if item >= 'A' && item <= 'Z' {
        return item as i32 - 'A' as i32 + 27;
    }
    item as i32 - 'a' as i32 + 1
}

pub fn run() {
    let sacks = fs::read_to_string("./2022/day3/input.txt").unwrap();

    // Part 1
    let mut priority_sum = 0;
    for sack in sacks.lines() {
        let (compartment_1, compartment_2) = sack.split_at(sack.len() / 2);

        for item in compartment_1.chars() {
            if compartment_2.contains(item) {
                priority_sum += priority(item);
                break;
            };
        }
    }

    println!("{}", priority_sum);

    // Part 2
    let mut priority_sum = 0;

    for group in sacks.lines().collect::<Vec<&str>>().chunks(3) {
        let sack1 = group[0];
        let sack2 = group[1];
        let sack3 = group[2];

        for item in sack1.chars() {
            if sack2.contains(item) && sack3.contains(item) {
                priority_sum += priority(item);
                break;
            }
        }
    }

    println!("{}", priority_sum);
}
