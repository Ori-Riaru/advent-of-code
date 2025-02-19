use std::fs;

use std::collections::HashMap;

#[derive(Debug)]
struct Dir {
    size: i32,
    children: Vec<String>,
}

impl Dir {
    fn new() -> Dir {
        Dir {
            size: -1,
            children: Vec::new(),
        }
    }

    fn file(size: i32) -> Dir {
        Dir {
            size,
            children: Vec::new(),
        }
    }

    fn add_child(&mut self, child: String) {
        self.children.push(child);
    }
}

#[derive(Debug)]
struct FileSystem {
    dirs: HashMap<String, Dir>,
}

impl FileSystem {
    fn new() -> FileSystem {
        let mut initial = HashMap::new();

        initial.insert(
            "/".to_string(),
            Dir {
                size: -1,
                children: Vec::new(),
            },
        );

        FileSystem { dirs: initial }
    }

    fn insert_dir(&mut self, id: String) {
        let new_dir = Dir::new();
        self.dirs.insert(id, new_dir);
    }

    fn insert_file(&mut self, id: String, size: i32) {
        let new_dir = Dir::file(size);
        self.dirs.insert(id, new_dir);
    }
}

fn recursive_size(tree: &mut FileSystem, start: &String) -> i32 {
    let current_node = tree.dirs.get(start).expect(start);

    if current_node.size != -1 {
        return current_node.size;
    }

    let mut total_size = 0;
    for child in current_node.children.clone().iter() {
        total_size += recursive_size(tree, child);
    }

    tree.dirs.get_mut(start).unwrap().size = total_size;

    return total_size;
}
pub fn run() {
    let input = fs::read_to_string("./2022/day7/input.txt").unwrap();

    let mut dirs = FileSystem::new();

    let mut path = Vec::new();

    for command in input.lines() {
        let current_path = path.join("/");

        let tokens = command.split(" ").collect::<Vec<&str>>();

        if tokens[1] == "cd" {
            if tokens[2] == ".." {
                path.pop();
            } else {
                path.push(tokens[2].to_string());
            }
        } else if tokens[1] == "ls" {
            continue;
        } else if tokens[0] == "dir" {
            dirs.insert_dir(current_path.clone() + "/" + &tokens[1].to_string());

            dirs.dirs
                .get_mut(&current_path)
                .unwrap()
                .add_child(current_path + "/" + &tokens[1].to_string());
        } else {
            dirs.insert_file(
                current_path.clone() + "/" + &tokens[1].to_string(),
                tokens[0].parse().unwrap(),
            );

            dirs.dirs
                .get_mut(&current_path)
                .unwrap()
                .add_child(path.join("/") + "/" + &tokens[1].to_string());
        }
    }

    recursive_size(&mut dirs, &"/".to_string());

    let mut total_size = 0;
    for value in dirs.dirs.values() {
        if value.children.len() != 0 && value.size <= 100000 {
            total_size += value.size
        }
    }

    let smallest = 30_000_000 - (70_000_000 - dirs.dirs.get("/").unwrap().size);

    println!("{}", total_size);

    let mut smallest_larger = 99999999;
    for value in dirs.dirs.values() {
        if value.children.len() != 0 && value.size >= smallest && value.size < smallest_larger {
            smallest_larger = value.size;
        }
    }

    println!("{}", smallest_larger);
}
