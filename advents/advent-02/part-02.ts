import { formatGameStringToJSON, readTextFile } from "@/lib/utils";

import { Game } from "@/advents/advent-02/types";

async function main(inputFilepath: string) {
  const inputText = await readTextFile(inputFilepath);
  const gamesAsJSON: Game[] = inputText.map((input) =>
    formatGameStringToJSON(input)
  );

  // cubos min cada set |> mult |> somar
  const min_cube_qtt_per_game = gamesAsJSON.map((game) =>
    getMinCubeQttPerGame(game)
  );
  const min_cube_qtt_per_game_multiplied = min_cube_qtt_per_game.map(
    (min_set) => min_set.red * min_set.green * min_set.blue
  );
  const min_cube_qtt_per_game_multiplied_total =
    min_cube_qtt_per_game_multiplied.reduce((acc, act) => acc + act, 0);

  return min_cube_qtt_per_game_multiplied_total;
}

function getMinCubeQttPerGame(game: Game) {
  let _min_cube_qtt = {
    red: 0,
    blue: 0,
    green: 0,
  };

  for (const _cube_set of game.cube_sets) {
    for (const _color in _cube_set.set) {
      const _typed_color = _color as keyof typeof _cube_set.set;

      if (_cube_set.set[_typed_color] > _min_cube_qtt[_typed_color]) {
        _min_cube_qtt[_typed_color] = _cube_set.set[_typed_color];
      }
    }
  }

  return _min_cube_qtt;
}

export { main };
