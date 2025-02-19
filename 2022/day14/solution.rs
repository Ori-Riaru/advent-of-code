use std::fs;

#[derive(Debug, Clone)]
struct Point {
    x: usize,
    y: usize,
}

impl Point {
    fn new(x: usize, y: usize) -> Point {
        Point { x, y }
    }
}

pub fn run() {
    let rocks = fs::read_to_string("./2022/day14/input.txt").unwrap();

    let mut field = [[false; 165]; 1000];
    let mut largest_y = 0;

    for rock in rocks.lines() {
        let points = rock
            .split(" -> ")
            .map(|point| {
                let (x, y) = point.split_once(",").unwrap();
                Point::new(x.parse().unwrap(), y.parse().unwrap())
            })
            .collect::<Vec<Point>>();

        for line in points.windows(2) {
            let start = &line[0];
            let end = &line[1];

            if start.y > largest_y {
                largest_y = start.y;
            } else if end.y < largest_y {
                largest_y = end.y;
            }

            for x in start.x..=end.x {
                field[x][start.y] = true;
            }

            for x in end.x..=start.x {
                field[x][start.y] = true;
            }

            for y in start.y..=end.y {
                field[start.x][y] = true;
            }

            for y in end.y..=start.y {
                field[start.x][y] = true;
            }
        }
    }

    let start = Point::new(500, 0);

    let mut n = 0;

    for y in 0..165 {
        for x in 400..600 {
            print!("{}", if field[x][y] { "#" } else { " " })
        }
        println!();
    }

    'outer: loop {
        let mut sand = start.clone();

        loop {
            // if sand.y >= 164 {
            //     break 'outer;
            // } else
            if !field[sand.x][sand.y + 1] {
                sand.y += 1;
            } else if !field[sand.x - 1][sand.y + 1] {
                sand.y += 1;
                sand.x -= 1;
            } else if !field[sand.x + 1][sand.y + 1] {
                sand.y += 1;
                sand.x += 1;
            } else {
                field[sand.x][sand.y] = true;
                break;
            }
        }

        n += 1;

        if sand.x == 500 && sand.y == 0 {
            break 'outer;
        }

    }

    for y in 0..165 {
        for x in 400..600 {
            print!("{}", if field[x][y] { "#" } else { " " })
        }
        println!();
    }

    println!("{n}");
}
