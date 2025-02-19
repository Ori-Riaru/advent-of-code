use std::collections::{HashMap, HashSet};
use std::fs;

struct Room<'a> {
    pressure: usize,
    connected: Vec<&'a str>,
}

pub fn run() {
    let input = fs::read_to_string("./2022/day16/test_input.txt").unwrap();

    let mut map = HashMap::<&str, Room>::new();
    let mut visited = HashSet::<String>::new();

    

    for room in input.lines() {
        let room = room.split(':').collect::<Vec<&str>>();
        let connected = room[2]
                    .split(',')
                    .collect::<Vec<&str>>();
            
        map.insert(
            room[0],
            Room{pressure: room[1].parse().unwrap(), connected}
        );
    }

    let start = "AA";
    let current_room = map.get(start).unwrap();

    let leave = depth_first_search(&map, &mut visited,start ,30, 0);
    let take = depth_first_search(&map, &mut visited,start ,30 - 1, 0 + current_room.pressure );

    if take >= leave {
        println!("{}", take);
    } else {
        println!("{}", leave);
    }

    println!("Hello, world!");
}

fn depth_first_search(map: &HashMap<&str, Room>, visited: &mut HashSet<String>, current_room: &str, time: usize, pressure: usize) -> usize {
    if visited.contains(&current_room.to_string()) && (current_room != "AA" ||current_room != "GG"){
        return pressure;
    }

    visited.insert(current_room.to_string());

    if time == 0 {
        return pressure;
    }

    let current_room = map.get(current_room).unwrap();
    let mut max_pressure = pressure;
    
    for next in current_room.connected.iter() {
        let leave = depth_first_search(map, visited, next, time - 1, pressure);
        
        let take;
        if time >= 2 {
            take = depth_first_search(map, visited, next, time - 2 , pressure + current_room.pressure);
        } else {
            take = pressure;
        }
        
        if take >= leave && take > max_pressure {
            max_pressure = take;
        } else if leave > max_pressure {
            max_pressure = leave;
        }
    }

    return max_pressure;

}
