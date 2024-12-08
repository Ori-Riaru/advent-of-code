from typing import List, Tuple

# Counts the first antinode for each antenna pair per group
def count_antinodes_part1(antenna_groups: dict[List[Tuple[int, int]]], map_size: int) -> int:
    antinodes = set()

    # for each pair of antennas calculate their antinodes
    for group in antenna_groups.values():
        for a in group:
            for b in group:
                calculate_antinodes_part1(a, b, map_size, antinodes)
    
    return len(antinodes)

# Calculates the first antinode after anntena b
def calculate_antinodes_part1(a, b, map_size, antinodes) -> None:
     # node can't make antinodes with itself
    if a == b:
        return
        
    # Calculate distance to antinode from antenna b
    x_dist = b[0] - a[0]
    y_dist = b[1] - a[1]

    # Calculate antinode after antenna b
    antinode = (b[0] + x_dist,
                b[1] + y_dist)

    # exclude antinode if it is out of bounds  
    if (antinode[0] < 0 or antinode[0] >= map_size or
        antinode[1] < 0 or antinode[1] >= map_size
    ):
        return

    # found antinode
    antinodes.add(antinode)

# Counts all antinodes for each antenna pair in all antennas groups
def count_antinodes_part2( antenna_groups: dict[List[Tuple[int, int]]], map_size: int) -> int:
    antinodes = set()

    # for each pair of antennas calculate their antinodes
    for group in antenna_groups.values():
        for a in group:
            for b in group:
                calculate_antinodes_part2(a, b,map_size, antinodes)
    
    return len(antinodes)

# Calculates and adds all antinodes to antinodes set starting from antenna b untill out of bounds
def calculate_antinodes_part2(a, b, map_size, antinodes):
    # node can't make antinodes with itself
    if a == b:
        return
    
    #Calculate distance to antinode from antenna b
    x_dist = b[0] - a[0]
    y_dist = b[1] - a[1]

    # Keep calculating antinodes untill out of bounds
    i = 0
    while True:
        # calculate antinode starting from antenna b
        antinode = (b[0] + x_dist * i,
                    b[1] + y_dist * i)

        # exclude antinode if it is out of bounds  
        if (antinode[0] < 0 or antinode[0] >= map_size or
            antinode[1] < 0 or antinode[1] >= map_size
        ):
            break

        # found antinode
        antinodes.add(antinode)
        i += 1

def main():
    with open("./input.txt", "r") as file:
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

    print("Part 1:")
    print(count_antinodes_part1(antenna_groups, map_size)) # 254

    print("Part 2:")
    print(count_antinodes_part2(antenna_groups, map_size)) # 951 

if __name__ == "__main__":
    main()
