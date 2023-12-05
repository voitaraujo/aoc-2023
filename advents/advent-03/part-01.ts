import { readTextFile } from "@/lib/utils";

async function main(inputFilepath: string) {
  const inputText = await readTextFile(inputFilepath);

  const _part_numbers = getAllPartNumbers(inputText);
  const total = _part_numbers.reduce((acc, act) => acc + act, 0);

  return total;
}

function getAllPartNumbers(input_text: string[]) {
  let _all_numbers = [];

  for (let idx = 0; idx < input_text.length; idx++) {
    const _previous_line = input_text[idx - 1];
    const _current_line = input_text[idx]!;
    const _next_line = input_text[idx + 1];

    const _part_numbers_on_current_line = getPartNumbersOnLine(
      _previous_line,
      _current_line,
      _next_line
    );

    _all_numbers.push(..._part_numbers_on_current_line);
  }

  return _all_numbers;
}

function getPartNumbersOnLine(
  p_line: string | undefined,
  c_line: string,
  n_line: string | undefined
) {
  const numbers_on_this_line = [];

  for (let idx = 0; idx < c_line.length; idx++) {
    const _char = c_line[idx]!;

    if (!Number.isNaN(Number(_char))) {
      const _have_symbols_around = searchSurroundingSymbols(
        p_line,
        c_line,
        n_line,
        idx
      );

      if (_have_symbols_around) {
        const _complete_number = getFullSurroundedNumber(c_line, idx);

        numbers_on_this_line.push(_complete_number.full_number);

        idx = _complete_number.end;
      }
    }
  }

  return numbers_on_this_line;
}

function searchSurroundingSymbols(
  p_line: string | undefined,
  c_line: string,
  n_line: string | undefined,
  c_line_index: number
) {
  const _c_line_left_index = c_line[c_line_index - 1];
  const _c_line_right_index = c_line[c_line_index + 1];

  // test surrounding chars at current line
  if (
    _c_line_left_index &&
    _c_line_left_index !== "." &&
    Number.isNaN(Number(_c_line_left_index))
  ) {
    return true;
  }

  if (
    _c_line_right_index &&
    _c_line_right_index !== "." &&
    Number.isNaN(Number(_c_line_right_index))
  ) {
    return true;
  }

  // test surrounding chars at previous line
  if (p_line) {
    const _p_line_left_index = p_line[c_line_index - 1];
    const _p_line_middle_index = p_line[c_line_index];
    const _p_line_right_index = p_line[c_line_index + 1];

    switch (true) {
      case _p_line_left_index &&
        _p_line_left_index !== "." &&
        Number.isNaN(Number(_p_line_left_index)):
        return true;
      case _p_line_middle_index &&
        _p_line_middle_index !== "." &&
        Number.isNaN(Number(_p_line_middle_index)):
        return true;
      case _p_line_right_index &&
        _p_line_right_index !== "." &&
        Number.isNaN(Number(_p_line_right_index)):
        return true;
      default:
        break;
    }
  }

  // test surrounding chars at next line
  if (n_line) {
    const _n_line_left_index = n_line[c_line_index - 1];
    const _n_line_middle_index = n_line[c_line_index];
    const _n_line_right_index = n_line[c_line_index + 1];

    switch (true) {
      case _n_line_left_index &&
        _n_line_left_index !== "." &&
        Number.isNaN(Number(_n_line_left_index)):
        return true;
      case _n_line_middle_index &&
        _n_line_middle_index !== "." &&
        Number.isNaN(Number(_n_line_middle_index)):
        return true;
      case _n_line_right_index &&
        _n_line_right_index !== "." &&
        Number.isNaN(Number(_n_line_right_index)):
        return true;
      default:
        break;
    }
  }

  return false;
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
