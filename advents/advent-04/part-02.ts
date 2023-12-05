import { readTextFile } from "@/lib/utils";

async function main(inputFilepath: string) {
  const inputText = await readTextFile(inputFilepath);

  const total = getAllCardsQtt(inputText);

  return total;
}

function getAllCardsQtt(inputs: string[]) {
  let _cards = inputs.map((card, idx) => {
    const { 0: _winning_numbers, 1: _own_numbers } = card
      .split(": ")
      .at(-1)
      ?.split(" | ")
      .map((set) => set.split(" ").filter((value) => value !== ""))!;

    return {
      id: idx + 1,
      winning_numbers: _winning_numbers!,
      own_numbers: _own_numbers!,
      copies: 1,
    };
  });

  for (const card of _cards) {
    const _card_winning_numbers = getCardWinningNumbers(
      card.winning_numbers,
      card.own_numbers
    );

    const _current_card_index = _cards.findIndex((c) => c.id === card.id);

    for (
      let i = _current_card_index + 1;
      i <= _current_card_index + _card_winning_numbers.length;
      i++
    ) {
      if (_cards[i]) {
        _cards[i]!.copies = _cards[i]!.copies + 1 * card.copies;
      }
    }
  }

  return _cards.reduce((acc, act) => acc + act.copies, 0);
}

function getCardWinningNumbers(wn: string[], on: string[]) {
  const _numbers_matching = findHowMuchWinningNumbers(wn, on);

  return _numbers_matching;
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
