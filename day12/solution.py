def part1(garden: List[List[chr]]) -> int:
    visited = [[False * garden[0]] * len(garden)]

    for y in range(len(garden)):
        for x in range(len(garden[0])):
            if visited[y][x]:
                continue

# Calculates the area and perimeter of the region
def get_region_cost(garden: List[List[chr]], x: int, y: int, visited: List[List[bool]]) -> int:
    adjacent = [garden[y][x]]




def main():
    with open('test_input.txt') as file:
        garden = []
        for line in file:
            for char in line:
                garden.append(char)
        
    print(part1(garden))

if __name__ == '__main__':
    main()