from collections import Counter
from typing import List, Tuple

def list_distance(list1: list[int], list2: List[int]) -> int:
    return sum( abs( num1 - num2 ) for num1, num2 in zip(sorted(list1), sorted(list2)) )

def list_similarity(list1: List[int], list2: List[int]) -> int:
    list2_counts = Counter(list2)
    return sum( num1 * list2_counts.get(num1, 0) for num1 in list1 )

def parse_input(path: str) -> Tuple[List[int], List[int]]:
    list1 = []
    list2 = []
    with open(path, "r") as input:
        for line in input:
            numbers = line.split('   ')
            list1.append(int(numbers[0]))
            list2.append(int(numbers[1]))
    
    return list1, list2

def main():
    list1, list2 =parse_input("./2024/day1/input.txt")

    print("Part 1: ")
    print(list_distance(list1, list2)) # 2769675

    print("\nPart 2: ")
    print(list_similarity(list1, list2)) # 24643097

if __name__ == '__main__':
    main() 