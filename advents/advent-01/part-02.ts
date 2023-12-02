import { readTextFile } from "@/lib/utils";

async function main(inputFilepath: string) {
  const inputText = await readTextFile(inputFilepath);

  const numbers = inputText.map((text) => findFirstLastNumber(text));

  const total = numbers.reduce((acc, act) => {
    return `${Number(acc) + Number(act)}`;
  }, "0");

  return total;
}

function findFirstLastNumber(input: string) {
  const numbersFromString = SpelledNumbersToDigit(input);

  return `${numbersFromString.at(0)}${numbersFromString.at(-1)}`;
}

function SpelledNumbersToDigit(input: string) {
  let _processed_input = "";
  const splited_input = input.split("");
  const _replace_list = [
    { s: "one", d: "1" },
    { s: "two", d: "2" },
    { s: "three", d: "3" },
    { s: "four", d: "4" },
    { s: "five", d: "5" },
    { s: "six", d: "6" },
    { s: "seven", d: "7" },
    { s: "eight", d: "8" },
    { s: "nine", d: "9" },
  ];

  for (let idx = 0; idx < splited_input.length; idx++) {
    const _char = splited_input[idx];
    const _input_rest = input.slice(idx);
    const _charIsValidNumber = !Number.isNaN(Number(_char));

    if (_charIsValidNumber) {
      _processed_input = _processed_input + _char;
    } else {
      for (const _replaceable of _replace_list) {
        if (testCharsSequence(_replaceable.s, _input_rest)) {
          _processed_input = _processed_input + _replaceable.d;
          break;
        }
      }
    }
  }

  return _processed_input;
}

function testCharsSequence(testing: string, tested: string) {
  const testingSplited = testing.split("");
  const testedSplited = tested.split("");

  for (let i = 0; i < testingSplited.length; i++) {
    if (testingSplited[i] !== testedSplited[i]) {
      return false;
    }
  }

  return true;
}

// main("./input.txt");

export { main };
