from typing import List
from functools import cache


def part1(stones: List[int], n) -> int:
    for i in range(n):
        print(i)

        next = []

        for stone in stones:
            if stone == 0:
                next.append(1)
            elif len(str(stone)) % 2 == 0:
                mid = len(str(stone)) // 2 
                next.append(int(str(stone)[:mid]))
                next.append(int(str(stone)[mid:]))
            else:
                next.append(stone * 2024)
        stones = next

    return len(stones)

def part2(stones: List[int], n) -> int:
    sum = 0 
    for stone in stones:
        sum += search(stone, n)
    return sum

@cache
def search(stone, n):
    if n == 0:
        return 1
    
    if stone == 0:
        return search(1, n - 1)
    
    elif len(str(stone)) % 2 == 0:
        mid = len(str(stone)) // 2 
        left = search( int(str(stone)[:mid]), n - 1)
        right = search( int(str(stone)[mid:]), n - 1)    
        return left + right

    return search(stone * 2024, n - 1)
    



def main():
    print(part1([125, 17], 25))
    print(part2([5, 62914, 65, 972, 0, 805922, 6521, 1639064], 75))



if __name__ == '__main__':
    main()