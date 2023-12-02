import { readTextFile } from "@/lib/utils";

async function main(inputFilepath: string) {
  const inputText = await readTextFile(inputFilepath);

  const numbers = inputText.map((text) => findFirstLastNumber(text));

  // reduce array de número p/ total
  const total = numbers.reduce((acc, act) => {
    return `${Number(acc) + Number(act)}`;
  }, "0");

  return total;
}

function findFirstLastNumber(input: string) {
  const onlyNumbersRegExp = new RegExp(/[0-9]/g);
  const numbersFromString = [...input.matchAll(onlyNumbersRegExp)];

  return `${numbersFromString.at(0)}${numbersFromString.at(-1)}`;
}

// main("./input.txt");

export { main };
