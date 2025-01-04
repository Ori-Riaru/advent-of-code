from typing import List, Tuple

# Traces the path of one of the cleaning robots
def trace_path(map: List[List[chr]], start: Tuple[int, int, int, int]) -> Tuple[int, bool]:
    x, y = start[0], start[1]
    x_vel, y_vel = start[2], start[3]
    visited_cells = set() # Keep track of squares that have been visited regardless of direction
    visited_cells_directional = set()
    loop = False

    while True:
        # Check if state is already visited
        if (x, y, x_vel, y_vel) in visited_cells_directional:
            loop = True
            break
  
        # Record current state
        visited_cells_directional.add((x, y, x_vel, y_vel))
        visited_cells.add((x, y))

        # Calculate next position
        x_next = x + x_vel
        y_next = y + y_vel

        if x_next < 0 or x_next >= len(map[0]) or y_next < 0 or y_next >= len(map):
            # Robot stops when it leaves the map
            break

        next_cell = map[y_next][x_next]

        # Attempt to move forward
        if next_cell == "#":
            x_vel, y_vel = -y_vel, x_vel # rotate 90 degrees clockwise
        else:
            x, y = x_next, y_next
      
    return len(visited_cells), loop

# This is a little bit slow. it could be sped up by 
# only adding walls in cells that the guard passes through
def search_for_loops(map: List[List[chr]], start: Tuple[int, int, int, int]) -> int:
    loop_count = 0
    for y in range(len(map)):
        for x in range(len(map[0])):
            original_cell = map[y][x]
            # Modify a cell
            map[y][x] = '#'
            
            # Check if it causes a loop
            _, loop = trace_path(map, start)

            if loop:
                loop_count += 1
            
            # Revert cell to original state
            map[y][x] = original_cell


    return loop_count

def find_start(map: List[List[chr]]) -> Tuple[int, int, int, int]:
    direction_map = {
        '^': (0, -1),
        '>': (1, 0),
        'v': (0, 1),
        '<': (-1, 0),
    }
    
    for y, row in enumerate(map):
        for x, cell in enumerate(row):
            if cell in direction_map:
                x_vel, y_vel = direction_map[cell]
                return x, y, x_vel, y_vel

    return None

def main():
    with open("./2024/day6/input.txt", "r") as input:
        map = [ list(line.strip()) for line in input ]
    
    print(map)

    start = find_start(map)

    print("Part 1:")
    visited_count, _ = trace_path(map, start)
    print(visited_count) # 5145

    print("Part 2:")
    print("Running...")
    print(search_for_loops(map, start)) # 1523

if __name__ == "__main__":
    main()