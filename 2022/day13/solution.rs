use std::collections::VecDeque;
use std::fs;

pub fn run() {
    let input = fs::read_to_string("./2022/day13/input.txt").unwrap();

    let mut pairs = input
        .split("\n\r\n\r")
        .map(|pair| {
            let sides = pair.split_once("\n\r").unwrap();
            let left = VecDeque::from(sides.0.chars().collect::<Vec<char>>());
            let right = VecDeque::from(sides.1.chars().collect::<Vec<char>>());
            (left, right)
        })
        .collect::<Vec<(VecDeque<char>, VecDeque<char>)>>();

    for (left, right) in pairs.iter_mut() {
        let mut _index = 0;
        let _correct = loop {
            _index += 1;

            let current_left = left.pop_front();
            let current_right = right.pop_front();

            if current_left == current_right {
                continue;
            }

            if current_left == Some('[') && current_right == Some(',') {
                left.push_front(current_left.unwrap());
                
            }
            else if current_right == Some(',') && current_right == Some('[') {
                right.push_front(current_left.unwrap());
            } else if current_left == Some('[') && current_right == Some(']') {
                break false;
            }
        };
    }
}
