from pprint import pprint

def part1(map):
    count = 0

    # For each start
    for y in range(len(map)):
        for x in range(len(map[y])):

            # get the trailhead score
            if map[y][x] == 0:
                visited = set()
                count += dfs_part1(map, x, y, visited)
                
    return count

def part2(map):
    count = 0
    for y in range(len(map)):
        for x in range(len(map[y])):
            if map[y][x] == 0:
                visited = set()
                count += dfs_part2(map, x, y)
    return count

def dfs_part1(map, x, y, visited):
    # Out of bounds
    if (x < 0 or x >= len(map[0]) or
        y < 0 or y >= len(map)):
        return 0

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
    for adj in adjacent:  
        slope = map[adj[1]][adj[0]] - map[y][x]
        if slope != 1: 
            continue
        
        count += dfs_part1(map, adj[0], adj[1], visited)

    return count

def dfs_part2(map, x, y):
    # Out of bounds
    if (x < 0 or x >= len(map[0]) or
        y < 0 or y >= len(map)):
        return 0

    # Arrived
    if map[y][x] == 9:
        return 1

    # Search adjacent
    count = 0
    adjacent = [(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)]
    for adj in adjacent:  
        slope = map[adj[1]][adj[0]] - map[y][x]
        if slope != 1: 
            continue
        
        count += dfs_part2(map, adj[0], adj[1], visited)

    return count


def main():
    with open('input.txt') as file:
        map = []
        for i, line in enumerate(file):
            map.append([])
            for char in line.strip():
                map[i].append(int(char))

    print("Part 1:")
    print(part1(map))

    print("Part 2:")
    print(part2(map))


if __name__ == '__main__':
    main()