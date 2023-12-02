import { CubeSet, Game } from "@/advents/advent-02/types";
import { formatGameStringToJSON, readTextFile } from "@/lib/utils";

async function main(inputFilepath: string) {
  const inputText = await readTextFile(inputFilepath);
  const gamesAsJSON: Game[] = inputText.map((input) =>
    formatGameStringToJSON(input)
  );

  const max_cubes_per_set: CubeSet["set"] = {
    red: 12,
    blue: 14,
    green: 13,
  };

  const valid_games_ids = gamesAsJSON.map((game) =>
    getValidGamesIds(game, max_cubes_per_set)
  );

  const total = valid_games_ids.reduce((acc, act) => acc + act, 0);

  return total;
}

function getValidGamesIds(game: Game, max: CubeSet["set"]) {
  for (const _cube_set of game.cube_sets) {
    for (const _color in _cube_set.set) {
      const _typed_color = _color as keyof typeof _cube_set.set;

      if (_cube_set.set[_typed_color] > max[_typed_color]) {
        return 0;
      }
    }
  }

  return game.game_id;
}

export { main };
