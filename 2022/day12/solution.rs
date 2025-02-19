use std::{collections::VecDeque, fs};

#[derive(Debug, Clone)]
struct Point {
    x: usize,
    y: usize,
}

impl Point {
    fn new(x: usize, y: usize) -> Point {
        Point { x, y }
    }

    fn zero() -> Point {
        Point { x: 0, y: 0 }
    }
}

impl PartialEq for Point {
    fn eq(&self, other: &Self) -> bool {
        self.x == other.x && self.y == other.y
    }
}

fn parse_height_map(raw_height_map: String) -> (Point, Point, Vec<Vec<usize>>) {
    let mut height_map = Vec::new();

    let mut start = Point::zero();
    let mut end = Point::zero();

    for (y, line) in raw_height_map.lines().enumerate() {
        height_map.push(Vec::new());
        for (x, pixel) in line.chars().enumerate() {
            if pixel == 'S' {
                start = Point::new(x, y);
                height_map.last_mut().unwrap().push(0)
            } else if pixel == 'E' {
                end = Point::new(x, y);
                height_map
                    .last_mut()
                    .unwrap()
                    .push('z' as usize - 'a' as usize)
            } else {
                height_map
                    .last_mut()
                    .unwrap()
                    .push(pixel as usize - 'a' as usize)
            }
        }
    }

    (start, end, height_map)
}

fn valid_moves(base: Point, height_map: &Vec<Vec<usize>>) -> Vec<Point> {
    let mut neighbors = Vec::new();
    let max_traversable = height_map[base.y][base.x] + 1;

    // Vertical
    for y_offset in -1..=1 {
        if y_offset == 0 {
            continue;
        }

        let y = base.y as i32 + y_offset;

        // y in Range
        if y < 0 || y >= height_map.len() as i32 {
            continue;
        }

        let y = y as usize;

        // Traversable
        let height = height_map[y][base.x];
        if height > max_traversable {
            continue;
        }

        // Valid Move
        neighbors.push(Point::new(base.x, y));
    }

    // Horizontal
    for x_offset in -1..=1 {
        if x_offset == 0 {
            continue;
        }

        let x = base.x as i32 + x_offset;

        // x in Range
        if x < 0 || x >= height_map[0].len() as i32 {
            continue;
        }

        let x = x as usize;

        let height = height_map[base.y][x];

        if height > max_traversable {
            continue;
        }

        // Valid Move
        neighbors.push(Point::new(x, base.y));
    }

    neighbors
}

fn breadth_first_search(start: Point, end: Point, height_map: &Vec<Vec<usize>>) -> usize {
    let mut visited = vec![vec![false; height_map[0].len()]; height_map.len()];
    let mut queue = VecDeque::new();

    queue.push_back(Vec::from([start]));

    while let Some(path) = queue.pop_front() {
        let node = path.last().unwrap().clone();

        if visited[node.y][node.x] {
            continue;
        }

        visited[node.y][node.x] = true;

        if node == end {
            return path.len() - 1;
        }

        for neighbor in valid_moves(node, &height_map) {
            let mut new_path = path.clone();
            new_path.push(neighbor);
            queue.push_back(new_path);
        }
    }

    return height_map.len() * height_map[0].len() + 2;
}

pub fn run () {
    let raw_height_map = fs::read_to_string("./2022/day12/height_map.txt").unwrap();

    let (_start, end, height_map) = parse_height_map(raw_height_map);

    let mut distances = Vec::new();

    for y in 0..height_map.len() {
        for x in 0..height_map[0].len() {
            if height_map[y][x] == 0 {
                distances.push(breadth_first_search(Point::new(x, y), end.clone(), &height_map));
            }
        }
    }

    println!("{}", distances.iter().min().unwrap());
}
