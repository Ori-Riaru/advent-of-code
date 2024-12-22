from typing import List

def main():
    with open("input.txt", "r") as input:
        reports = []

        for report in input:
            reports.append([int(n) for n in report.split(" ")])

    print("Part 1: ")
    print(count_safe_reports(reports))

    print("\nPart 2: ")
    print(count_safe_reports_dampened(reports))


# Part 1
def count_safe_reports(reports: List[List[int]]) -> int:
    return sum(1 for report in reports if safe_report(report))

def safe_report(report: List[int]) -> bool:
    if report[0] > report[-1]:
        to_increasing = 1
    else: 
        to_increasing = -1

    for i in range(len(report) - 1):
        change = (report[i] - report[i + 1]) * to_increasing

        if change < 1 or change > 3:
            return False
    
    return True

# Part 2
def count_safe_reports_dampened(reports: List[List[int]]) -> int:
    return sum(1 for report in reports if safe_report_dampened(report))

def safe_report_dampened(report: List[int]) -> bool:
    # Check if original report is safe
    if safe_report(report):
        return True

    # Check if any report with one element removed is safe
    for i in range(len(report)):
        if safe_report(report[:i] + report[i+1:]):
            return True

    return False

if __name__ == '__main__':
    main()