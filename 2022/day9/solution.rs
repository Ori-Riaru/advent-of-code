use std::fs;

pub fn run() {
    let input = fs::read_to_string("./2022/day9/input.txt").unwrap();

    let mut visited = Vec::new();

    for _ in 0..7000 {
        visited.push(vec![false; 7000])
    }

    let mut knots = vec![(7000 / 2, 7000 / 2); 10];

    for command in input.lines() {
        let command: Vec<&str> = command.split(" ").collect();
        let direction = command[0];
        let amount: i32 = command[1].parse().unwrap();

        for _ in 0..amount {
            if direction == "R" {
                knots[0].0 += 1;
            } else if direction == "L" {
                knots[0].0 -= 1;
            } else if direction == "U" {
                knots[0].1 += 1;
            } else {
                knots[0].1 -= 1;
            }

            for knot in 0..knots.len() - 1 {
                let lead = knots[knot];
                let follower = &mut knots[knot + 1];

                let dx: i32 = lead.0 - follower.0;
                let dy: i32 = lead.1 - follower.1;

                if dx.abs() == 2 && dy == 0 {
                    follower.0 += dx / 2;
                } else if dy.abs() == 2 && dx == 0 {
                    follower.1 += dy / 2;
                } else if dx.abs() == 2 && dy.abs() == 1 {
                    follower.0 += dx / 2;
                    follower.1 += dy;
                } else if dx.abs() == 1 && dy.abs() == 2 {
                    follower.0 += dx;
                    follower.1 += dy / 2;
                } else if dx.abs() == 2 && dx.abs() == 2 {
                    follower.0 += dx / 2;
                    follower.1 += dy / 2;
                }
            }

            visited[knots.last().unwrap().1 as usize][knots.last().unwrap().0 as usize] = true;
        }
    }

    let mut count = 0;
    for row in visited.iter() {
        for square in row {
            if *square {
                count += 1;
            }
        }
    }

    println!("{}", count);
}
