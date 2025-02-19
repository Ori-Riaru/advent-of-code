def compare(left, right):
    if type(left) == type(0) and type(right) == type(0):
        if left > right:
            return False
        
        if left < right:
            return True
        
        return None

    elif type(left) == type([]) and type(right) == type([]):
        for i in range(0, len(left)):
            if i >= len(right):
                return False

            result = compare(left[i], right[i])
            if result != None:
                return result

        if len(left) == len(right):      
            return None

        return True

    elif type(left) == type(0) and type(right) == type([]):
        return compare([left], right)
        
    return compare(left, [right])

def flatten(array):
    result = []
    for value in array:
        if type(value) == type([]):
            if len(value) == 0:
                result.append(0)
            else:
                result.extend(flatten(value))
        
        elif type(value) == type(0):
            result.append(value)

    return result

            


input = open("input.txt", "r").read()
signals = input.split("\n\n")

pairs = []

sum = 0
for (n, signal) in enumerate(signals):
    pair = signal.split("\n")

    left = eval(pair[0])
    right = eval(pair[1])

    pairs.append(flatten(left))
    pairs.append(flatten(right))

    result = compare(left, right)

    if result == None or result == True:
        sum += n + 1

pairs.append([2])
pairs.append([6])
pairs.sort()
print((pairs.index([2]) + 1) * (pairs.index([6])+1))




