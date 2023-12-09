import { readTextFile } from "@/lib/utils";

// gcd,lcm,lcmAll take from:
// https://stackoverflow.com/questions/31302054/how-to-find-the-least-common-multiple-of-a-range-of-numbers
const gcd = (a:number, b:number): number => b == 0 ? a : gcd(b, a % b)
const lcm = (a:number, b:number) =>  a / gcd(a, b) * b
const lcmAll = (ns:number[]) => ns.reduce(lcm, 1)

async function main(inputFilepath: string) {
  const inputText = await readTextFile(inputFilepath);

  const _transformed_input = transformInput(inputText);

  const total = traverseNodesConcurrently(
    _transformed_input.instructions_order,
    _transformed_input.node_map
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

function traverseNodesConcurrently(
  traverse_seq: string,
  node_map: {
    [K: string]: {
      L: string;
      R: string;
    };
  }
) {
  let _parallel_nodes = Object.keys(node_map).filter((key) =>
    key.endsWith("A")
  );

  const _this_loop_results = _parallel_nodes.map((n) =>
    traverseNodes(traverse_seq, n, node_map, 0)
  );

  return lcmAll(_this_loop_results);
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
  const _next_loop = loop + 1;

  if (_next_node.endsWith("Z")) {
    return _next_loop;
  } else {
    return traverseNodes(traverse_seq, _next_node, node_map, _next_loop);
  }
}

export { main };
