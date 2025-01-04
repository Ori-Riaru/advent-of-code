from typing import List
from typing import Tuple

# Part 1
def in_bounds(board: List[str], point: Tuple[int, int]) -> bool:
    return point[1] >= 0 and point[1] < len(board) and point[0] >= 0 and point[0] < len(board[point[1]])


def match_pattern(board, center: Tuple[int, int], characters: List[str], pattern: List[Tuple[int, int]]) -> int:
    for character, offset in zip(characters, pattern):
        x = center[0] + offset[0]
        y = center[1] + offset[1]

        if not in_bounds(board, (x, y)):
            return 0

        if board[y][x] != character:
            return 0

    return 1

def word_search(board: List[str]) -> int:
    # Possible patterns
    # up-----   down---   left---   right--   diag_ur   diag_ul   diag_bl   diag_dl
    # S . . . | X . . . | S A M X | X M A S | . . . S | S . . . | . . . X | X . . . |
    # A . . . | M . . . | . . . . | . . . . | . . A . | . A . . | . . M . | . M . . |
    # M . . . | A . . . | . . . . | . . . . | . M . . | . . M . | . A . . | . . A . |
    # X . . . | S . . . | . . . . | . . . . | X . . . | . . . X | S . . . | . . . S |

    characters = ["X", "M", "A", "S"]
    patterns = [
        [(0, 0), (0, 1), (0, 2), (0, 3)], # up
        [(0, 0), (0, -1),  (0, -2), (0, -3)], # down
        [(0, 0), (-1, 0), (-2, 0), (-3, 0)], # left
        [(0, 0), (1, 0), (2, 0), (3, 0)], # right
        [(0, 0), (1, 1), (2, 2), (3, 3)], # diag_ur
        [(0, 0), (-1, 1), (-2, 2), (-3, 3)], # diag_ul
        [(0, 0), (1, -1), (2, -2), (3, -3)], # diag_dr
        [(0, 0), (-1, -1), (-2, -2), (-3, -3)] # diag_dl
    ]

    count = 0
    for y in range(len(board)):
        for x in range(len(board[y])):
            count += sum( match_pattern(board, (x, y), characters, pattern) for pattern in patterns)

    return count

# Part 2
def x_search(board: List[str]) -> int:
    # Possible patterns
    # --a--   --b--   --c--   --d--
    # M . M | S . S | S . M | M . S
    # . A . | . A . | . A . | . A .
    # S . S | M . M | S . M | M . S

    characters = ["A", "M", "M", "S", "S"]
    patterns = [
        [(0, 0), (1, 1), (-1, 1), (-1, -1), (1, -1)], # a
        [(0, 0), (-1, -1), (1, -1), (1, 1), (-1, 1)], # b
        [(0, 0), (1, 1), (1, -1), (-1, 1), (-1, -1)], # c
        [(0, 0), (-1, -1), (-1, 1), (1, -1), (1, 1)]  # d 
    ]

    count = 0
    for y in range(len(board)):
        for x in range(len(board[y])):
            count += sum( match_pattern(board, (x, y), characters, pattern) for pattern in patterns)

    return count

def main():
    with open("./2024/day4/input.txt", "r") as input:
        board = [ list(line) for line in input]
    
    print("Part 1: ")
    print(word_search(board)) # 2493

    print("\nPart 2: ")
    print(x_search(board)) # 1890


if __name__ == '__main__':
    main() 