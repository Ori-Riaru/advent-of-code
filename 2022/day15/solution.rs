use std::fs;

#[derive(Debug, Clone)]
struct Point {
    x: i32,
    y: i32,
}

impl Point {
    fn new(x: i32, y: i32) -> Self {
        Point { x, y }
    }
}

impl PartialEq for Point {
    fn eq(&self, other: &Self) -> bool {
        self.x == other.x && self.y == other.y
    }
}

pub fn run() {
    let input = fs::read_to_string("./2022/day15/input.txt").unwrap();

    let mut beacons = Vec::new();
    let mut sensors = Vec::new();

    // Parse input
    let mut lowest_x = 0;
    let mut highest_x = 0;
    for line in input.lines() {
        let cords = line
            .split(",")
            .map(|s| s.parse().unwrap())
            .collect::<Vec<i32>>();

        if cords[0] < lowest_x {
            lowest_x = cords[0];
        }
        if cords[0] > highest_x {
            highest_x = cords[0];
        }
        if cords[2] < lowest_x {
            lowest_x = cords[2];
        }
        if cords[2] > highest_x {
            highest_x = cords[2];
        }

        sensors.push(Point::new(cords[0], cords[1]));
        beacons.push(Point::new(cords[2], cords[3]));
    }
    // part 1 lowest_x -= 0;
    // part 1 highest_x += 1000000;

    // part 1 let mut row = vec![false; (highest_x - lowest_x) as usize];
    // part 1 let y = 2000000;

    // part 1
    // for (beacon, sensor) in beacons.iter_mut().zip(sensors.iter_mut()) {
    //     beacon.x -= lowest_x;
    //     sensor.x -= lowest_x;
    // }

    let mut possible = Vec::new();

    let mut distances = Vec::new();

    for (beacon, sensor) in beacons.iter().zip(sensors.iter()) {
        let max_distance = (beacon.x - sensor.x).abs() + (beacon.y - sensor.y).abs() + 1;
        distances.push(max_distance - 1);

        for offset in 0..=max_distance {
            possible.push(Point::new(
                sensor.x + offset,
                sensor.y + max_distance - offset,
            ));
            possible.push(Point::new(
                sensor.x - offset,
                sensor.y + max_distance - offset,
            ));
            possible.push(Point::new(
                sensor.x + offset,
                sensor.y - max_distance + offset,
            ));
            possible.push(Point::new(
                sensor.x - offset,
                sensor.y - max_distance + offset,
            ));
        }
    }

    // for y in -20..50 {
    //     for x in -20..50 {
    //         if possible.contains(&Point::new(x, y)) {
    //             print!("#");
    //         } else {
    //             print!(" ");
    //         }
    //     }
    //     println!("");
    // }

    // println!("{:?}", possible);
    let max = 4000000;
    let mut position;

    // Mark beacons
    for pos in possible.iter() {
        if !(pos.x <= max && pos.x >= 0 && pos.y <= max && pos.y >= 0) {
            continue;
        }

        position = true;
        for i in 0..sensors.len() {
            if (pos.x - sensors[i].x).abs() + (pos.y - sensors[i].y).abs() <= distances[i] {
                position = false;
                break;
            }
        }
        if position {
            println!("{}, {} = {}", pos.x, pos.y, pos.x as u64  * 4000000 + pos.y as u64 )
        }
    }

    // part 1 println!("{}", row.iter().filter(|&elm| *elm).count());
}
