import re
import pprint

# Part 1
def scan(memory: str) -> int:
    # Find all multiplications
    multiplications = re.findall(r"mul\(\d{1,3},\d{1,3}\)", memory)

    # Execute all multiplications and return the sum of results
    return sum( parse_mul(mul) for mul in multiplications )

def parse_mul(statement: str) -> int:
    left, right = statement.split(",")
    a = int(left.strip("mul("))
    b = int(right.strip(")"))
    return a * b

# Part 2
def scan_with_conditionals(memory: str) -> int:
    # Split memory into section that begin enabled and once disabled can't be re-enabled
    sections = memory.split("do()")

    sum = 0
    for section in sections:
        # Strip disabled sub_section from end if it exists
        enabled_subsection = re.sub(r"don't\(\)(.*)", '', section, flags=re.DOTALL) 

        # scan remaining enabled section
        sum += scan(enabled_subsection)
    return sum


def main():
    with open("input.txt", "r") as input:
        memory = input.read()

    print("Part 1: ")
    print(scan(memory)) # 174960292

    print("\nPart 2: ")
    print(scan_with_conditionals(memory)) # 56275602

if __name__ == '__main__':
    main() 