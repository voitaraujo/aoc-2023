import { readTextFile } from "@/lib/utils";

interface Map {
  [key: string]: number[][];
}

interface TransformedData {
  seeds: number[];
  [key: string]: number[][] | number[];
}

const Destinations = [
  "seed-to-soil",
  "soil-to-fertilizer",
  "fertilizer-to-water",
  "water-to-light",
  "light-to-temperature",
  "temperature-to-humidity",
  "humidity-to-location",
] as const;

async function main(inputFilepath: string) {
  const inputText = await readTextFile(inputFilepath);

  const _transformed_input = transformInput(inputText);
  const _mapped_input = groupRanges(_transformed_input);
  const _seeds_locations = _transformed_input.seeds.map((seed) =>
    traverseDestinations(String(seed), Destinations[0], _mapped_input)
  );

  const lowest_location = _seeds_locations
    .sort((a, b) => (Number(a) > Number(b) ? 1 : -1))
    .at(0);

  return Number(lowest_location);
}

function traverseDestinations(
  source: string,
  destination: string,
  map: {
    [K: string]: { [K1: string]: string };
  }
) {
  for (let idx = 0; idx < Destinations.length; idx++) {
    const _next_source = map[destination]![source] || source;

    if (!Destinations[idx + 1]) {
      return _next_source;
    }

    if (destination === Destinations[idx]) {
      return traverseDestinations(_next_source, Destinations[idx + 1]!, map);
    }
  }
}

function transformInput(input: string[]): TransformedData {
  const data: TransformedData = {
    ["seeds"]: [],
  };

  let currentKey: string | null = null;
  let currentMap: number[][] | null = null;

  for (const line of input) {
    if (Number.isNaN(Number(line.at(0)))) {
      const key = line.split(" ").at(0);

      if (key === "seeds:") {
        data.seeds = line.split(" ").slice(1).map(Number);
      } else {
        if (currentKey && currentMap) {
          data[currentKey] = currentMap;
        }

        currentKey = key!;
        currentMap = [];
      }
    } else if (currentMap) {
      // Populate the current map
      currentMap.push(line.split(" ").map(Number));
    }
  }

  // Save the last map (if any)
  if (currentKey && currentMap) {
    data[currentKey] = currentMap;
  }

  return data;
}

function groupRanges(transformedInput: TransformedData): {
  [K: string]: { [K1: string]: string };
} {
  let _grouped_ranges = {};

  for (const key in transformedInput) {
    if (key !== "seeds") {
      const _typed_key = key as keyof typeof transformedInput;
      const _typed_tuple = transformedInput[_typed_key] as [
        number,
        number,
        number
      ][];

      Object.assign(_grouped_ranges, {
        [_typed_key]: reduceMappedRanges(_typed_tuple),
      });
    }
  }

  return _grouped_ranges;
}

function reduceMappedRanges(ranges: [number, number, number][]) {
  return ranges
    .map((range) => mapRanges(range[0], range[1], range[2]))
    .reduce((acc, act) => {
      return Object.assign(acc, act);
    }, {});
}

function mapRanges(
  destination_range: number,
  source_range_start: number,
  range_length: number
) {
  let _this_range = {};

  [...new Array(range_length).keys()].forEach((_, idx) => {
    const _destination = `${destination_range + idx}`;
    const _source = `${source_range_start + idx}`;

    Object.assign(_this_range, { [_source]: _destination });
  });

  return _this_range;
}

export { main };
