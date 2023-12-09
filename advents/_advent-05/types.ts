export interface Map {
  [key: string]: number[][];
}

export interface TransformedData {
  seeds: number[];
  [key: string]: number[][] | number[];
}