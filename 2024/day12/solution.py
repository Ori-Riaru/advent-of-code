from typing import List, Tuple, Set

def main():
    garden = parse_input("./day12/input.txt")

    sum_1 = 0
    sum_2 = 0
    visited = set()
    for y in range(len(garden)):
        for x in range(len(garden[0])):
            if (x, y) not in visited:
                area, perimeter, corners = fill((x, y), garden, visited)

                sum_1 += area * perimeter
                sum_2 += area * corners

    print("Part 1:")
    print(sum_1)

    print("Part 2:")
    print(sum_2)

def parse_input(path: str) -> List[List[chr]]:
    with open(path, 'r') as file:
        garden = [list(line.strip()) for line in file]

    return garden

def fill(current: Tuple[int, int], garden: List[List[chr]], visited: Set[Tuple[int, int]]) -> Tuple[int, int, int]:    
    visited.add(current)

    x, y = current
    type = garden[y][x]
    perimeter = 0
    corners = 0
    area = 1
    
    ## Count corners
    # C = Current F = Different T = Same . = any
    #     Exterior          Interior
    # TopRight TopLeft BtmRight BtmLeft
    #  ... FFF FFF ...  CCC TTT TTT CCC   
    #  ... FFF FFF ...  CCC TTT TTT CCC
    #     +---+---+        +--- ---+
    #  FFF|CCC CCC|FFF  TTT|FFF FFF|TTT
    #  FFF|CCC CCC|FFF  TTT|FFF FFF|TTT
    #     +       +        +       +
    #  FFF|CCC CCC|FFF  TTT|FFF FFF|TTT
    #  FFF|CCC CCC|FFF  TTT|FFF FFF|TTT
    #     +---+---+        +--- ---+ 
    #  ... FFF FFF ...  CCC TTT TTT CCC
    #  ... FFF FFF ...  CCC TTT TTT CCC
    # BtmRight BtmLeft topRight TopLeft

    patterns = [
        # Exterior corners
        [(0, -1, False), (1, 0, False)],  # Top right
        [(0, -1, False), (-1, 0, False)], # Top left
        [(0, 1, False), (1, 0, False)],   # Bottom right
        [(0, 1, False), (-1, 0, False)],  # Bottom left
        # Internal corners
        [(0, -1, True), (1, 0, True), (1, -1, False)],    # Interior top-right
        [(0, -1, True), (-1, 0, True), (-1, -1, False)],  # Interior top-left
        [(0, 1, True), (1, 0, True), (1, 1, False)],      # Interior bottom-right
        [(0, 1, True), (-1, 0, True), (-1, 1, False)]     # Interior bottom-left
    ]

    for i, pattern in enumerate(patterns): 
        all_offsets = True
        for offset_x, offset_y, bounds_target in pattern:

            next_x = x + offset_x
            next_y = y + offset_y
                
            # If next square in bounds of current region
            next_bounds = (next_x >= 0 and next_x < len(garden[0]) and
                           next_y >= 0 and next_y < len(garden) and
                           garden[next_y][next_x] == type)

            #  If next square bounds state doesn't match bounds target 
            if (next_bounds != bounds_target):
                all_offsets = False
                break
        

        if all_offsets:
            corners += 1

    adjacent = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    for dx, dy in adjacent:
        next_x = x + dx
        next_y = y + dy
        
        # if next cell is out of bounds of the current region place a face between the current cell and the next cell
        if (next_x < 0 or next_x >= len(garden[0]) or 
            next_y < 0 or next_y >= len(garden) or 
            garden[next_y][next_x] != type
        ):
            perimeter += 1
            continue
    
        # Explore adjacent cells of the same region if not already counted
        elif (next_x, next_y) not in visited:
            # Recursively fill adjacent cells of the same type
            other_area, other_perimeter, other_corners = fill((next_x, next_y), garden, visited)
            
            area += other_area
            perimeter += other_perimeter
            corners += other_corners
            
    return area, perimeter, corners

def print_garden(garden: List[List[chr]], visited: Set[Tuple[int, int]]):
    for y in range(len(garden)):
        for x in range(len(garden[0])):
            if (x, y) in visited:
                print(" ", end="")
            else:
                print(garden[y][x], end="")
        print()

if __name__ == '__main__':
    main()