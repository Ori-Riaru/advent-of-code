from typing import List

def calc_checksum(disk):
    sum = 0
    for i, elm in enumerate(disk):
        if elm == -1:
            continue

        sum += i * elm
    
    return sum

def part1(disk):
    free = 0
    last = len(disk) - 1
    while free <= last - 1:
        # Update pointer positions
        while disk[free] != -1:
            free += 1

        while disk[last] == -1:
            last -= 1

        if free < last:
            disk[free], disk[last] = disk[last], disk[free]

    return calc_checksum(disk)


def part2(disk, file_lengths, free_lengths):
    # For each file
    for i, file in enumerate(file_lengths):

        file_id = len(file_lengths) - 1 - i

        # Find the start of the file
        file_start = 0
        for i in range(len(disk)):
            if disk[i] == file_id:
                file_start = i
                break
        
        file_length = file_lengths[file_id]

        # Find first free space large enough
        found = False
        free_space_end = 0
        length = 0
        for i, block in enumerate(disk):
            if i >= file_start:
                break
                
            if block == -1:
                length += 1
            else:
                length = 0
            
            if length >= file_length:
                free_space_end = i 
                found = True
                break
        
        if found:
            # Copy file
            for i in range(file_length):
                disk[free_space_end - i] = file_id

            # Remove file
            for i in range(file_length):
                disk[file_start + i] = -1
        else:
            continue
    return calc_checksum(disk)

def print_disk(disk):
    for elm in disk:
        if elm == -1:
            print(".", end="")
        else:
            print(elm, end="")

def parse_input(path: str) -> List[int]:
    disk = []
    with open(path, "r") as file:
        disk_map = file.read()
        file_lengths = []
        free_lengths = []

        blocks = True
        for i, char in enumerate(disk_map):
            if blocks:
                id = i // 2
                num_blocks = int(char)
                file_lengths.append(num_blocks)
                for _ in range(num_blocks):
                    disk.append(id)
            else:
                free_space = int(char)
                free_lengths.append(free_space)
                for _ in range(free_space):
                    disk.append(-1)

            blocks = not blocks
    
    return disk, file_lengths, free_lengths

def main():            
    disk, _, _ = parse_input("./2024/day9/input.txt")

    print("Part 1:")
    print(part1(disk)) # 6225730762521

    disk, file_lengths, free_lengths = parse_input("./2024/day9/input.txt")

    print("\nPart 2:")
    print("Running...")
    print(part2(disk, file_lengths, free_lengths)) # 6250605700557

if __name__ == '__main__':
    main()  