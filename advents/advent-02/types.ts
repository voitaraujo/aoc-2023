export interface Game {
  game_id: number;
  cube_sets: CubeSet[];
}

export interface CubeSet {
  set_id: number;
  set: {
    red: number;
    blue: number;
    green: number;
  };
}