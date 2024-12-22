from typing import List, Tuple

def main():
    with open("input.txt", "r") as input:
        map = []
        for line in input:
            map.append(list(line.strip()))
    
    x, y, x_vel, y_vel = find_start(map)

    print("Part 1:")
    visited_count, loop = trace_path(map, (x, y, x_vel, y_vel))
    print(visited_count) # 5145

    print("Part 2:")
    print(part2(map)) # 1523

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

def trace_path(map: List[List[chr]], start: Tuple[int, int, int, int]) -> Tuple[int, bool]:
    x, y = start[0], start[1]
    x_vel, y_vel = start[2], start[3]
    loop = False
    visited_cells = set()
    visited_cells_directional = set()

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
            break

        next_cell = map[y_next][x_next]

        # Attempt to move forward
        if next_cell == "#":
            x_vel, y_vel = -y_vel, x_vel # rotate 90 degrees clockwise
        else:
            x, y = x_next, y_next
      
    return len(visited_cells), loop

def part2(map: List[List[chr]]) -> int:
    start_x, start_y, x_vel, y_vel = find_start(map)

    loop_count = 0
    for y in range(len(map)):
        for x in range(len(map[0])):
            original_cell = map[y][x]
            map[y][x] = '#'

            _, loop = trace_path(map, (start_x, start_y, x_vel, y_vel))

            map[y][x] = original_cell

            if loop:
                loop_count += 1

    return loop_count



if __name__ == "__main__":
    main()