from pprint import pprint
from typing import List, Set


def dfs_part1(map, x, y, visited):
    # Visited check
    if (x, y) in visited:
        return 0

    visited.add((x, y))

    # Arrived
    if map[y][x] == 9:
        return 1

    # Search adjacent
    count = 0
    adjacent = [(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)]
    for next_x, next_y in adjacent:  
        if (next_x < 0 or next_x >= len(map[0]) or
            next_y < 0 or next_y >= len(map)) or
            (next_x, next_y) in visited:
            return 0

        slope = map[next_y][next_x] - map[y][x]
        if slope != 1: 
            continue
        
        count += dfs_part1(map, next_x, next_y, visited)

    return count

def part1(map):
    count = 0

    # For each start
    for y in range(len(map)):
        for x in range(len(map[y])):

            # get the trail head score
            if map[y][x] == 0:
                visited = set()
                count += dfs_part1(map, x, y, visited)
                
    return count


def dfs_part2(map, x, y, visited):
    # Arrived
    if map[y][x] == 9:
        return 1

    # Search adjacent
    count = 0
    adjacent = [(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)]
    for next_x, next_y in adjacent:  
        if (next_x < 0 or next_x >= len(map[0]) or
            next_y < 0 or next_y >= len(map)):
            return 0

        slope = map[next_y][next_x] - map[y][x]
        if slope != 1: 
            continue
        
        count += dfs_part2(map, next_x, next_y, visited)

    return count

def part2(map):
    count = 0
    for y in range(len(map)):
        for x in range(len(map[y])):
            if map[y][x] == 0:
                visited = set()
                count += dfs_part2(map, x, y, visited)
                
    return count


def parse_input(path: str) -> List[List[int]]:
    with open(path) as file:
        map = [ [int(char) for char in line.strip() ] for line in file]
    return map


def main():
    map = parse_input("./2024/day10/input.txt")

    print("Part 1:")
    print(part1(map))

    print("Part 2:")
    print(part2(map))

if __name__ == '__main__':
    main()