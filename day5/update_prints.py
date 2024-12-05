from typing import List, Tuple

def check_updates(updates: List[int], less_than: List[List[int]]) -> Tuple[int, int]:
    correct_sum = 0
    incorrect_sum = 0
    
    for update in updates:
        if update_follows_rules(update, less_than):
            mid = len(update) // 2
            correct_sum += update[mid]
        else:
            bubble_sort(update, less_than)
            mid = len(update) // 2
            incorrect_sum += update[mid]

    return correct_sum, incorrect_sum

def update_follows_rules(update: List[int], less_than: List[List[int]]) -> bool:
    for (page_index, page) in enumerate(update):
        for before in less_than[page]:
            # If before in after
            if before in update[: page_index]:
                return False

    return True

def bubble_sort(update: List[int], less_than: List[List[int]]) -> None:
    for n in range(len(update) - 1, 0, -1):
        swapped = False  
        for i in range(n):
            # if update i + 1 before update i swap
            if before(update[i + 1], update[i], less_than):              
                update[i], update[i + 1] = update[i + 1], update[i]
                swapped = True
        if not swapped:
            break

def before (page1: int, page2: int, less_than: List[List[int]]) -> bool:
    return page1 in less_than[page2] and page1 != page2

def main():
    with open("input_rules.txt", "r") as input_rules:
        less_than = [[] for _ in range(100)]
        for rule in input_rules:
            before, after  = rule.split("|")
            less_than[int(before)].append(int(after))

    with open("input_updates.txt", "r") as input_updates:
        updates = []
        for update in input_updates:
            updates.append([int(page) for page in update.split(",")])

    correct_sum, incorrect_sum = check_updates(updates, less_than)
    print("Part 1: ")
    print(correct_sum) # 6498

    print("\nPart 2: ")
    print(incorrect_sum) # 5017

if __name__ == '__main__':
    main()