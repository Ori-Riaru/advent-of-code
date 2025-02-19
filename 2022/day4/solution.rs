use std::fs;

pub fn run() {
    let assignments = fs::read_to_string("./2022/day4/input.txt").unwrap();

    let mut contained = 0;
    for pair in assignments.lines() {
        let sections: Vec<&str> = pair.split(",").collect();
        let (s1, e1) = sections[0].split_once("-").unwrap();
        let (s2, e2) = sections[1].split_once("-").unwrap();
        let s1 = s1.parse::<i32>().unwrap();
        let e1 = e1.parse::<i32>().unwrap();
        let s2 = s2.parse::<i32>().unwrap();
        let e2 = e2.parse::<i32>().unwrap();

        // part1
        // if s1 >= s2 && e1 <= e2 || s2 >= s1 && e2 <= e1 {
        //     contained += 1;
        // }

        // part2
        if (s2 <= s1 && s1 <= e2) || (s2 <= e1 && e1 <= e2) || (s1 <= s2 && s2 <= e1) || (s1 <= e2 && e2 <= e1) {
            contained += 1;
        }
    }

    println!("{}", contained);
}
