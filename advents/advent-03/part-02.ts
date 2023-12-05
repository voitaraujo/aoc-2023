import { readTextFile } from "@/lib/utils";

async function main(inputFilepath: string) {
  const inputText = await readTextFile(inputFilepath);

  const _part_numbers = getAllGearValues(inputText);
  const total = _part_numbers.reduce((acc, act) => acc + act, 0);

  return total;
}

function getAllGearValues(input_text: string[]) {
  let _all_gear_values = [];

  // buscar por * em linha
  // se/quando encontrar buscar por números em volta
  // se/quando encontrar EXATAMENTE dois números

  for (let idx = 0; idx < input_text.length; idx++) {
    const _previous_line = input_text[idx - 1];
    const _current_line = input_text[idx]!;
    const _next_line = input_text[idx + 1];

    const _gear_values_on_current_line = getGearValuesOnLine(
      _previous_line,
      _current_line,
      _next_line
    );

    _all_gear_values.push(..._gear_values_on_current_line);
  }

  return _all_gear_values;
}

function getGearValuesOnLine(
  p_line: string | undefined,
  c_line: string,
  n_line: string | undefined
) {
  const _values_on_this_line = [];

  for (let idx = 0; idx < c_line.length; idx++) {
    const _char = c_line[idx]!;

    if (_char === "*") {
      const _surrounding_numbers = searchSurroundingNumbers(
        p_line,
        c_line,
        n_line,
        idx
      );

      if (_surrounding_numbers.length === 2) {
        _values_on_this_line.push(
          _surrounding_numbers.at(0)! * _surrounding_numbers.at(1)!
        );
      }
    }
  }

  return _values_on_this_line;
}

function searchSurroundingNumbers(
  p_line: string | undefined,
  c_line: string,
  n_line: string | undefined,
  c_line_index: number
) {
  let _surrounding_numbers = [];
  let _found_range: {
    start: number;
    full_number: number;
    end: number;
  }[] = [];

  const _surrounding = {
    top_left: {
      char: p_line?.at(c_line_index - 1),
      line: p_line,
      index: c_line_index - 1,
    },
    top: { char: p_line?.at(c_line_index), line: p_line, index: c_line_index },
    top_right: {
      char: p_line?.at(c_line_index + 1),
      line: p_line,
      index: c_line_index + 1,
    },
    left: {
      char: c_line.at(c_line_index - 1),
      line: c_line,
      index: c_line_index - 1,
    },
    right: {
      char: c_line.at(c_line_index + 1),
      line: c_line,
      index: c_line_index + 1,
    },
    bottom_left: {
      char: n_line?.at(c_line_index - 1),
      line: n_line,
      index: c_line_index - 1,
    },
    bottom: {
      char: n_line?.at(c_line_index),
      line: n_line,
      index: c_line_index,
    },
    bottom_right: {
      char: n_line?.at(c_line_index + 1),
      line: n_line,
      index: c_line_index + 1,
    },
  };

  for (const _sur in _surrounding) {
    const _coord = _surrounding[_sur as keyof typeof _surrounding];

    const _char = Number(_coord.char);

    if (!Number.isNaN(_char)) {
      const _full_number = getFullSurroundedNumber(_coord.line!, _coord.index);

      if (
        !_found_range.find(
          (obj) => JSON.stringify(obj) === JSON.stringify(_full_number)
        )
      ) {
        _surrounding_numbers.push(_full_number.full_number);
        _found_range.push(_full_number);
      }
    }
  }

  return _surrounding_numbers;
}

function getFullSurroundedNumber(c_line: string, c_line_index: number) {
  let _full_number = "";
  let _number_start = c_line_index;
  let _number_end = c_line_index;

  _full_number = c_line[c_line_index]!;

  for (let idx = c_line_index - 1; idx >= 0; idx--) {
    const _previous_char = c_line[idx]!;

    if (!Number.isNaN(Number(_previous_char))) {
      _full_number = _previous_char + _full_number;
      _number_start = idx;
    } else {
      break;
    }
  }

  for (let idx = c_line_index + 1; idx < c_line.length; idx++) {
    const _next_char = c_line[idx]!;

    if (!Number.isNaN(Number(_next_char))) {
      _full_number = _full_number + _next_char;
      _number_end = idx;
    } else {
      break;
    }
  }

  return {
    start: _number_start,
    full_number: Number(_full_number),
    end: _number_end,
  };
}

export { main };
