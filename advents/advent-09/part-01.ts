import { readTextFile } from "@/lib/utils";

async function main(inputFilepath: string) {
  const inputText = await readTextFile(inputFilepath);

  const transformedInput = transformInput(inputText);
  const diffs = findNextSequenceNumber(transformedInput);
  const total = diffs
    .map((seq) => seq!.at(-1)!)
    .reduce((acc, act) => acc + act, 0);

  return total;
}

function findNextSequenceNumber(sequence: number[][]) {
  
  return sequence.map((seq) => {
    let _diffs = [seq];

    while (!_diffs.at(-1)!.every((n) => n === 0)) {
      const _diff = findDifference(_diffs.at(-1)!);

      _diffs.push(_diff);
    }

    for (let idx = _diffs.length - 1; idx > 0; idx--) {
      _diffs[idx - 1]!.push(_diffs[idx - 1]!.at(-1)! + _diffs[idx]!.at(-1)!);
    }

    return _diffs.at(0);
  });
}

function findDifference(sequence: number[]) {
  let _difference = [];

  for (let idx = 0; idx < sequence.length - 1; idx++) {
    _difference.push(sequence[idx + 1]! - sequence[idx]!);
  }

  return _difference;
}

function transformInput(inputText: string[]) {
  return inputText.map((line) =>
    [...line.matchAll(/-?\d+/g)].map((n) => Number(n[0]))
  );
}

export { main };
