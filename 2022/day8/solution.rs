use std::fs;

pub fn run() {
    let input = fs::read_to_string("./2022/day8/input.txt").unwrap();

    let mut forest = Vec::new();

    for line in input.lines() {
        let mut row = Vec::new();
        for tree in line.chars() {
            row.push(tree.to_digit(10).unwrap())
        }
        forest.push(row);
    }

    let mut visible_count = 0;
    let mut best_score = 0;
    for row in 0..forest.len() {
        for col in 0..forest[row].len() {
            let current_tree = forest[row][col];

            let mut blocked_left = false;
            let mut score_1 = col;
            for c in (0..col).rev() {
                if forest[row][c] >= current_tree {
                    score_1 = col - c;
                    blocked_left = true;
                    break;
                }
            }

            let mut blocked_right = false;
            let mut score_2 = forest.len() - (col + 1);
            for c in col + 1..forest.len() {
                if forest[row][c] >= current_tree {
                    score_2 = c - col;
                    blocked_right = true;
                    break;
                }
            }

            let mut blocked_up = false;
            let mut score_3 = row;
            for r in (0..row).rev() {
                if forest[r][col] >= current_tree {
                    score_3 = row - r;
                    blocked_up = true;
                    break;
                }
            }

            let mut blocked_down = false;
            let mut score_4 = forest.len() - (row + 1);
            for r in row + 1..forest.len() {
                if forest[r][col] >= current_tree {
                    score_4 = r - row;
                    blocked_down = true;
                    break;
                }
            }

            let score = score_1 * score_2 * score_3 * score_4;
            if score > best_score {
                best_score = score;
            }

            if !blocked_left || !blocked_right || !blocked_up || !blocked_down {
                visible_count += 1;
            }
        }
    }

    println!("{} {}", visible_count, best_score);
}
