import { readTextFile } from "@/lib/utils";

async function main(inputFilepath: string) {
  const inputText = await readTextFile(inputFilepath);

  const _transformed_input = transformInput(inputText);

  const total = traverseNodes(
    _transformed_input.instructions_order,
    "AAA",
    _transformed_input.node_map,
    0
  );

  return total;
}

function transformInput(input_text: string[]) {
  const node_map: { [K: string]: { L: string; R: string } } = {};
  const instructions_order = input_text.at(0)!.trim();

  input_text
    .filter((l, idx) => idx !== 0 && l.trim() !== "")
    .forEach((node_line) => {
      const node_name = node_line.split(" =").at(0)!;
      const { 0: node_left, 1: node_right } = [
        ...node_line.split("= ").at(-1)!.matchAll(/\w+/g),
      ];

      Object.assign(node_map, {
        [node_name]: {
          L: node_left!.at(0),
          R: node_right!.at(0),
        },
      });
    });

  return { instructions_order, node_map };
}

function traverseNodes(
  traverse_seq: string,
  current_node: string,
  node_map: {
    [K: string]: {
      L: string;
      R: string;
    };
  },
  loop: number
) {
  const _current_direction = traverse_seq.at(loop % traverse_seq.length) as
    | "L"
    | "R";
  const _next_node = node_map[current_node]![_current_direction];

  if (_next_node === "ZZZ") {
    return loop + 1;
  } else {
    return traverseNodes(traverse_seq, _next_node, node_map, loop + 1);
  }
}

export { main };
