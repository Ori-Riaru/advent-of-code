from typing import List, Tuple

# Calculates the first antinode after antenna b
def calculate_antinode_part1(a: Tuple[int, int], b: Tuple[int, int], map_size: int, antinode: set) -> None:
    # node can't make antinode with itself
    if a == b:
        return
        
    # Calculate distance to antinode from antenna b
    x_dist = b[0] - a[0]
    y_dist = b[1] - a[1]

    # Calculate antinode after antenna b
    current_antinode = (b[0] + x_dist,
                        b[1] + y_dist)

    # Exclude antinode if it is out of bounds  
    if (current_antinode[0] < 0 or current_antinode[0] >= map_size or
        current_antinode[1] < 0 or current_antinode[1] >= map_size
    ):
        return

    # found antinode
    antinode.add(current_antinode)

# Counts the first antinode for each antenna pair per group
def count_antinode_part1(antenna_groups: dict[List[Tuple[int, int]]], map_size: int) -> int:
    antinode = set()

    # for each pair of antennas calculate their antinode
    for group in antenna_groups.values():
        for a in group:
            for b in group:
                calculate_antinode_part1(a, b, map_size, antinode)
    
    return len(antinode)



# Calculates and adds all antinode to antinode set starting from antenna b until out of bounds
def calculate_antinode_part2(a: Tuple[int, int], b: Tuple[int, int], map_size: int, antinode: set) -> None:
    # node can't make antinode with itself
    if a == b:
        return
    
    #Calculate distance to antinode from antenna b
    x_dist = b[0] - a[0]
    y_dist = b[1] - a[1]

    # Keep calculating antinode until out of bounds
    i = 0
    while True:
        # calculate antinode starting from antenna b
        current_antinode = (b[0] + x_dist * i,
                            b[1] + y_dist * i)

        # exclude antinode if it is out of bounds  
        if (current_antinode[0] < 0 or current_antinode[0] >= map_size or
            current_antinode[1] < 0 or current_antinode[1] >= map_size
        ):
            break

        # found antinode
        antinode.add(current_antinode)
        i += 1

# Counts all antinode for each antenna pair in all antennas groups
def count_antinode_part2( antenna_groups: dict[List[Tuple[int, int]]], map_size: int) -> int:
    antinode = set()

    # for each pair of antennas calculate their antinode
    for group in antenna_groups.values():
        for a in group:
            for b in group:
                calculate_antinode_part2(a, b,map_size, antinode)
    
    return len(antinode)

def parse_input(path: str) -> Tuple[dict[List[Tuple[int, int]]], int]:
    with open("./2024/day8/input.txt", "r") as file:
        antenna_groups = {}
        map_size = 0

        for y, line in enumerate(file):
            map_size += 1
            for x, char in enumerate(line.strip()):
                # Skip empty spaces
                if char == ".":
                    continue

                # Create antenna group if it doesn't exist
                if char not in antenna_groups:
                    antenna_groups[char] = [(x, y)]
                # Add antenna to group
                else: 
                    antenna_groups[char].append((x, y))
    
    return antenna_groups, map_size

def main():
    antenna_groups, map_size = parse_input("./2024/day8/input.txt")

    print("Part 1:")
    print(count_antinode_part1(antenna_groups, map_size)) # 254

    print("\nPart 2:")
    print(count_antinode_part2(antenna_groups, map_size)) # 951 

if __name__ == "__main__":
    main()
