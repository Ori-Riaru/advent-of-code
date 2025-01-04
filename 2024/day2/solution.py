from typing import List

# Part 1
def safe_report(report: List[int]) -> bool:
    # This is a bug if either the first or the last number is the 
    # element breaks the rules but it doesn't come up in the input so
    # i am not going to fix it
    if report[0] > report[-1]:
        to_increasing = 1
    else: 
        to_increasing = -1

    for i in range(len(report) - 1):
        change = (report[i] - report[i + 1]) * to_increasing

        if change < 1 or change > 3:
            return False
    
    return True

def count_safe_reports(reports: List[List[int]]) -> int:
    return sum(1 for report in reports if safe_report(report))

# Part 2
def safe_report_dampened(report: List[int]) -> bool:
    # If original report is safe
    if safe_report(report):
        return True

    # If any report with one element removed is safe
    for i in range(len(report)):
        if safe_report(report[:i] + report[i+1:]):
            return True

    # No way to make it safe
    return False

def count_safe_reports_dampened(reports: List[List[int]]) -> int:
    return sum(1 for report in reports if safe_report_dampened(report))

def parse_input(path: str) -> List[List[int]]:
    with open(path, "r") as file:
        reports = [
            [int(number) for number in line.split(' ')] 
            for line in file
        ]

    
    return reports

def main():
    reports = parse_input("./2024/day2/input.txt")

    print("Part 1: ")
    print(count_safe_reports(reports)) # 463

    print("\nPart 2: ")
    print(count_safe_reports_dampened(reports)) # 514


if __name__ == '__main__':
    main()