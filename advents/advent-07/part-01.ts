import { readTextFile } from "@/lib/utils";

const card_value_order = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];
const possible_hands = [
  "Five of a kind",
  "Four of a kind",
  "Full house",
  "Three of a kind",
  "Two pair",
  "One pair",
  "High card",
] as const;

async function main(inputFilepath: string) {
  const inputText = await readTextFile(inputFilepath);

  const _transformed_input = transformInput(inputText);
  const _hands_with_values = _transformed_input.map((i) => ({
    ...findBetterHand(i.hand),
    bid: i.bid,
  }));
  const _ordered_hands_with_priority = orderhands(_hands_with_values).map(
    (h, i) => ({ ...h, value: i + 1 })
  );

  const total = _ordered_hands_with_priority.reduce(
    (acc, act) => acc + act.value * Number(act.bid),
    0
  );

  return total;
}

function transformInput(input_text: string[]) {
  return input_text.map((input) => {
    const _splitted = input.split(" ");

    return {
      hand: _splitted.at(0)!,
      bid: _splitted.at(1)!,
    };
  });
}

function orderhands(
  hands: {
    bid: string;
    type: (typeof possible_hands)[number];
    hand: string;
  }[]
) {
  return hands.toSorted((a, b) => {
    const _a_priority = possible_hands.indexOf(a.type);
    const _b_priority = possible_hands.indexOf(b.type);

    if (_a_priority === _b_priority) {
      // teste chars priorities
      for (let _char_idx = 0; _char_idx < a.hand.length; _char_idx++) {
        const _a_char_priority = card_value_order.indexOf(
          a.hand.at(_char_idx)!
        );
        const _b_char_priority = card_value_order.indexOf(
          b.hand.at(_char_idx)!
        );

        if (_a_char_priority > _b_char_priority) {
          return -1;
        }

        if (_a_char_priority < _b_char_priority) {
          return 1;
        }
      }
    }

    if (_a_priority > _b_priority) {
      return -1;
    }

    return 1;
  });
}

function findBetterHand(hand: string): {
  type: (typeof possible_hands)[number];
  hand: string;
} {
  switch (true) {
    case !!testFiveOfAKind(hand):
      return { type: "Five of a kind", hand: testFiveOfAKind(hand) as string };
    case !!testFourOfAKind(hand):
      return { type: "Four of a kind", hand: testFourOfAKind(hand) as string };
    case !!testFullHouse(hand):
      return { type: "Full house", hand: testFullHouse(hand) as string };
    case !!testThreeOfAKind(hand):
      return {
        type: "Three of a kind",
        hand: testThreeOfAKind(hand) as string,
      };
    case !!testTwoPair(hand):
      return { type: "Two pair", hand: testTwoPair(hand) as string };
    case !!testOnePair(hand):
      return { type: "One pair", hand: testOnePair(hand) as string };
    default:
      return { type: "High card", hand: testHighCard(hand) as string };
  }
}

function testFiveOfAKind(hand: string) {
  const _times_char_was_repeated = hand
    .split("")
    .filter((c) => c === hand.at(0)).length;

  if (_times_char_was_repeated === 5) {
    return hand;
  }

  return false;
}

function testFourOfAKind(hand: string) {
  for (const _char of hand) {
    const _times_char_was_repeated = hand
      .split("")
      .filter((c) => c === _char).length;

    if (_times_char_was_repeated === 4) {
      return hand;
    }
  }

  return false;
}

function testFullHouse(hand: string) {
  for (const _char of hand) {
    const _times_char_was_repeated = hand
      .split("")
      .filter((c) => c === _char).length;
    const _string_without_char = hand.split("").filter((c) => c !== _char);
    const _string_without_char_size = _string_without_char.length;

    if (
      _times_char_was_repeated === 3 &&
      _string_without_char_size === 2 &&
      _string_without_char.at(0) === _string_without_char.at(1)
    ) {
      return hand;
    }
  }

  return false;
}

function testThreeOfAKind(hand: string) {
  for (const _char of hand) {
    const _times_char_was_repeated = hand
      .split("")
      .filter((c) => c === _char).length;
    const _string_without_char = hand.split("").filter((c) => c !== _char);
    const _string_without_char_size = _string_without_char.length;

    if (
      _times_char_was_repeated === 3 &&
      _string_without_char_size === 2 &&
      _string_without_char.at(0) !== _string_without_char.at(1)
    ) {
      return hand;
    }
  }

  return false;
}

function testTwoPair(hand: string) {
  for (const _char of hand) {
    const _times_char_was_repeated = hand
      .split("")
      .filter((c) => c === _char).length;
    const _hand_without_char = hand
      .split("")
      .filter((c) => c !== _char)
      .toString()
      .replaceAll(",", "");

    if (_times_char_was_repeated === 2 && !!testOnePair(_hand_without_char)) {
      return hand;
    }
  }

  return false;
}

function testOnePair(hand: string) {
  for (const _char of hand) {
    const _times_char_was_repeated = hand
      .split("")
      .filter((c) => c === _char).length;

    if (_times_char_was_repeated === 2) {
      return hand;
    }
  }

  return false;
}

function testHighCard(hand: string) {
  for (const _char of hand) {
    const _times_char_was_repeated = hand
      .split("")
      .filter((c) => c === _char).length;

    if (_times_char_was_repeated > 1) {
      return false;
    }
  }

  return hand;
}

export { main };
