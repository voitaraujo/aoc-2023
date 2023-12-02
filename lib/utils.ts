/**
 * [std] use this function to read the formated input text file provided by Advent of Code.
 *
 * @param filepath input file path.
 * @returns returns a string array where each entry is a new line from the text file.
 */
async function readTextFile(filepath: string) {
  const file = Bun.file(filepath);
  const inputText = await file.text();

  return inputText.split(/\r?\n|\r|\n/g);
}

/**
 * [advent-02] converts a specific format of string to JSON (eg. "Game 1: 2 red, 2 green; 6 red, 3 green; 2 red, 1 green, 2 blue; 1 red")
 *
 * @param game_string string formated as game record
 * @returns game as JSON
 */
function formatGameStringToJSON(game_string: string) {
  const { 0: _game_string, 1: _sets_string } = game_string.split(":");
  const _splited_sets = _sets_string.split(";");

  return {
    game_id: Number(_game_string.match(/\d+/g)?.[0]),
    cube_sets: _splited_sets.map((string_set, idx) => {
      let obj_set = {
        set_id: idx + 1,
        set: { red: 0, blue: 0, green: 0 },
      };

      const _match_blue = string_set.match(/\d+\sblue/g);
      const _match_green = string_set.match(/\d+\sgreen/g);
      const _match_red = string_set.match(/\d+\sred/g);

      obj_set.set.blue = Number(_match_blue?.[0].split(" ").at(0) || 0);
      obj_set.set.green = Number(_match_green?.[0].split(" ").at(0) || 0);
      obj_set.set.red = Number(_match_red?.[0].split(" ").at(0) || 0);

      return obj_set;
    }),
  };
}

export { formatGameStringToJSON, readTextFile };
