use std::fs;

pub fn run() {
    // let rounds = fs::read_to_string("input.txt").unwrap();

    // let mut total_score = 0;

    // for round in rounds.lines() {
    //     let moves: Vec<&str> = round.split(" ").collect();
    //     let opponent_move = moves[0];
    //     let your_move = moves[1];

    //     total_score += if your_move == "X" {
    //         1
    //     } else if your_move == "Y" {
    //         2
    //     } else {
    //         3
    //     };

    //     total_score += if opponent_move == "A" && your_move == "X"
    //         || opponent_move == "B" && your_move == "Y"
    //         || opponent_move == "C" && your_move == "Z"
    //     {
    //         // Tie Game
    //         3
    //     } else if opponent_move == "A" && your_move == "Y"
    //         || opponent_move == "B" && your_move == "Z"
    //         || opponent_move == "C" && your_move == "X"
    //     {
    //         // Win round
    //         6
    //     } else {
    //         // Lose Round
    //         0
    //     };

    // }

    //println!("{}", total_score);

    let rounds = fs::read_to_string("./2022/day2/input.txt").unwrap();

    let mut total_score = 0;

    for round in rounds.lines() {
        let moves: Vec<&str> = round.split(" ").collect();
        let opponent_move = moves[0];
        let your_move;

        if moves[1] == "X" {
            your_move = if opponent_move == "A" {
                "Z"
            } else if opponent_move == "B" {
                "X"
            } else {
                "Y"
            }
        } else if moves[1] == "Y" {
            your_move = if opponent_move == "A" {
                "X"
            } else if opponent_move == "B" {
                "Y"
            } else {
                "Z"
            }
        } else {
            your_move = if opponent_move == "A" {
                "Y"
            } else if opponent_move == "B" {
                "Z"
            } else {
                "X"
            }
        }

        total_score += if your_move == "X" {
            1
        } else if your_move == "Y" {
            2
        } else {
            3
        };

        total_score += if opponent_move == "A" && your_move == "X"
            || opponent_move == "B" && your_move == "Y"
            || opponent_move == "C" && your_move == "Z"
        {
            // Tie Game
            3
        } else if opponent_move == "A" && your_move == "Y"
            || opponent_move == "B" && your_move == "Z"
            || opponent_move == "C" && your_move == "X"
        {
            // Win round
            6
        } else {
            // Lose Round
            0
        };
    }
    println!("{}", total_score);
}

// 14618 < x < 16765
