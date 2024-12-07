def check_1(result, nums, i, sum):
    # Out of numbers to check
    if i == len(nums):
        return sum == result
         
    return (
        # Check mutliplication
        check_1(result, nums, i + 1, sum * nums[i]) or
        # Check addition
        check_1(result, nums, i + 1, sum + nums[i])
    )

def check_2(result, nums, i, sum):
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

def main():
    results = []
    number_groups = []
    with open("./input.txt") as file:
        for line in file:
            result, numbers = line.split(": ")

            results.append(int(result))
            number_groups.append([int(num) for num in numbers.strip().split(" ")])

    # Part 1
    print("Part 1:")

    sum = 0
    for result, numbers in zip(results, number_groups):
        if check_1(result, numbers, 0, 0):
            sum += result

    print(sum)

    # Part 2
    print("Part 2:") # 3245122495150
    
    sum = 0
    for result, numbers in zip(results, number_groups):
        if check_2(result, numbers, 0, 0):
            sum += result
            
    print(sum) # 105517128211543

if __name__ == "__main__":
    main()
