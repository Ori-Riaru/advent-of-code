function main(): void {
  let program: number[] = [
    2, 4, // b = a % 8     b = last 3 bits of a
    1, 1, // b = b ^ 0b1   flip last bit of b
    7, 5, // c = a >> b    c = a without lowest b bits | only the lowest 3 bit of c matter
    4, 4, // b = b ^ c     b = b xor c
    1, 4, // b = b ^ 0b101 flip first and last bit of b
    0, 3, // a = a >> 3    remove lowest 3 bits of a
    5, 5, // out b         output last 3 bits of b
    3, 0, // jmp 0         restart until removed all a 3 bit chunks
  ];

  // Part 1
  console.log("Part 1:");
  console.log(execute(program, [46337277n, 0n, 0n]));

  // Part 2

  // Part 2 example program
  // 0,3  // remove last 3 bits of a
  // 5,4  // output the last 3 bits of a
  // 3,0  // restart until all 3 bit chunks are removed

  console.log("Part 2:");
  console.log(rebuildARegister(program)?.toString());
}

function rebuildARegister(program: number[]): BigInt | undefined {
  let potentialSequences: bigint[] = [0n];
  let possibleNextBits: bigint[] = [
    0b000n,
    0b001n,
    0b010n,
    0b011n,
    0b100n,
    0b101n,
    0b110n,
    0b111n,
  ];

  while (potentialSequences.length > 0) {
    let correctSegment: bigint = potentialSequences.shift()!;

    for (let nextBits of possibleNextBits) {
      let a: bigint = (correctSegment << 3n) + nextBits;

      execute(program, [a, 0n, 0n]);
      if (output[0] === program[program.length - output.length]) {
        if (output.length === program.length) {
          return a;
        }
        potentialSequences.push(a);
      }
    }
  }

  return undefined;
}

let instructions = [adv, bxl, bst, jnz, bxc, out, bdv, cdv];
let instructionPointer: number = 0;
let registers: bigint[] = [0n, 0n, 0n];
let output: number[] = [];

function execute(program: number[], initialRegisterState: bigint[]): string {
  // Reset state
  registers = initialRegisterState;
  instructionPointer = 0;
  output = [];

  // Execute program
  while (instructionPointer < program.length) {
    let instruction = program[instructionPointer];
    let operand = program[instructionPointer + 1];

    instructions[instruction](operand);

    instructionPointer += 2;
  }

  return output.join(",");
}

function combo(operand: number): bigint {
  if (operand >= 0 && operand <= 3) {
    return BigInt(operand);
  } else if (operand >= 4 && operand <= 6) {
    return registers[operand - 4];
  }
  throw new Error("Invalid operand");
}

function adv(operand: number): void {
  registers[0] = registers[0] >> combo(operand);
}

function bxl(operand: number): void {
  registers[1] = registers[1] ^ BigInt(operand);
}

function bst(operand: number): void {
  registers[1] = ((combo(operand) % 8n) + 8n) % 8n;
}

function jnz(operand: number): void {
  if (registers[0] !== 0n) {
    instructionPointer = operand - 2;
  }
}

function bxc(operand: number): void {
  registers[1] = registers[1] ^ registers[2];
}

function out(operand: number): void {
  output.push(Number((combo(operand) % 8n) + 8n) % 8);
}

function bdv(operand: number): void {
  registers[1] = registers[0] >> combo(operand);
}

function cdv(operand: number): void {
  registers[2] = registers[0] >> combo(operand);
}

main();
