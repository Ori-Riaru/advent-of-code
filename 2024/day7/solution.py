from typing import List, Tuple

# Checks if any combination of * and + can make the numbers equals result
def check_1(result: int, nums: List[int], i: int, sum: int) -> bool:
    # Out of numbers to check
    if i == len(nums):
        return sum == result
         
    return (
        # Check mutliplication
        check_1(result, nums, i + 1, sum * nums[i]) or
        # Check addition
        check_1(result, nums, i + 1, sum + nums[i])
    )

# Checks if any combination of *, + and concat can make the numbers equals result
def check_2(result: int, nums: List[int], i: int, sum: int) -> bool:
    # Out of numbers to check
    if i == len(nums):
        return sum == result
     
    return (
        # Check mutliplication
        check_2(result, nums, i + 1, sum * nums[i]) or
        # Check addition
        check_2(result, nums, i + 1, sum + nums[i]) or
        # Check concatenation
        check_2(result, nums, i + 1, int(str(sum) + str(nums[i])))
    )

def parse_input(path: str) -> Tuple[List[int], List[List[int]]]:
    results = []
    number_groups = []
    with open(path) as file:
        for line in file:
            result, numbers = line.split(": ")

            results.append(int(result))
            number_groups.append([int(num) for num in numbers.strip().split(" ")])

    return results, number_groups

def main():
    results, number_groups = parse_input("./2024/day7/input.txt")
 
    # Part 1
    print("Part 1:")

    sum = 0
    for result, numbers in zip(results, number_groups):
        if check_1(result, numbers, 0, 0):
            sum += result

    print(sum)

    # Part 2
    print("\nPart 2:") # 3245122495150
    print("Running...")
    
    sum = 0
    for result, numbers in zip(results, number_groups):
        if check_2(result, numbers, 0, 0):
            sum += result
            
    print(sum) # 105517128211543


if __name__ == "__main__":
    main()
