from collections import Counter
from typing import List

def list_distance(list1: list[int], list2: List[int]) -> int:
    list1.sort()
    list2.sort()
    return sum( abs( num1 - num2 ) for num1, num2 in zip(list1, list2) )

def list_similarity(list1: List[int], list2: List[int]) -> int:
    list2_counts = Counter(list2)
    return sum( num1 * list2_counts.get(num1, 0) for num1 in list1 )

def main():
    with open("input.txt", "r") as input:
        list1 = []
        list2 = []

        for line in input:
            numbers = line.split('   ')
            list1.append(int(numbers[0]))
            list2.append(int(numbers[1]))

    print("Part 1: ")
    print(list_distance(list1, list2))

    print("\nPart 2: ")
    print(list_similarity(list1, list2))

if __name__ == '__main__':
    main()