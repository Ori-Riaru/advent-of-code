use std::env;

#[path="./2022/mod.rs"]
mod y2022;

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() < 2 {
        eprintln!("Usage: cargo run <year> <day>");
        return;
    }

    let year = &args[1];
    let day = &args[2];

    match (year.as_str(), day.as_str()) {
        ("2022", "1") => y2022::day1::run(),
        ("2022", "2") => y2022::day2::run(),
        ("2022", "3") => y2022::day3::run(),
        ("2022", "4") => y2022::day4::run(),
        ("2022", "5") => y2022::day5::run(),
        ("2022", "7") => y2022::day7::run(),
        ("2022", "8") => y2022::day8::run(),
        ("2022", "9") => y2022::day9::run(),
        ("2022", "12") => y2022::day12::run(),
        ("2022", "13") => y2022::day13::run(),
        ("2022", "14") => y2022::day14::run(),
        ("2022", "15") => y2022::day15::run(),
        ("2022", "16") => y2022::day16::run(),
        _ => eprintln!("Solution for {}/{} not found!", year, day),
    }
}
