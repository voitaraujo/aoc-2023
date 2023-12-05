import { readTextFile } from "@/lib/utils";

async function main(inputFilepath: string) {
  const inputText = await readTextFile(inputFilepath);

  const _all_cards_values = getAllCardsValues(inputText);
  const total = _all_cards_values.reduce((acc, act) => acc + act, 0);

  return total;
}

function getAllCardsValues(inputs: string[]) {
  const _cards_values = [];

  for (const card of inputs) {
    const { 0: _winning_numbers, 1: _own_numbers } = card
      .split(": ")
      .at(-1)
      ?.split(" | ")
      .map((set) => set.split(" ").filter((value) => value !== ""))!;

    const _card_value = getCardValue(_winning_numbers!, _own_numbers!);

    _cards_values.push(_card_value);
  }

  return _cards_values;
}

function getCardValue(wn: string[], on: string[]) {
  const _numbers_matching = findHowMuchWinningNumbers(wn, on);

  return _numbers_matching.reduce((acc, _, idx) => {
    if (idx === 0) {
      return 1;
    }

    return acc * 2;
  }, 0);
}

function findHowMuchWinningNumbers(wn: string[], on: string[]) {
  const _matching: string[] = [];

  on.forEach((ownNumber) => {
    if (wn.includes(ownNumber)) {
      _matching.push(ownNumber);
    }
  });

  return _matching;
}

export { main };
