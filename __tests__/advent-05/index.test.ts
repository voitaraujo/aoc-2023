import { describe, expect, test } from "bun:test";

import { main as part01 } from "@/advents/advent-05/part-01";

const advent_seq = "advent-05";

describe(`${advent_seq} - example`, () => {
  test("part-01", async () => {
    const result = await part01(`./__tests__/${advent_seq}/test-input-01.txt`);

    expect(result).toBe(35);
  });

  // test("part-02", async () => {
  //   const result = await part02(`./__tests__/${advent_seq}/test-input-02.txt`);

  //   expect(result).toBe(30);
});

describe(`${advent_seq} - real`, () => {
  // test("part-01", async () => {
  //   const result = await part01(`./advents/${advent_seq}/input.txt`);

  //   expect(result).toBe(23847);
  // });

  // test("part-02", async () => {
  //   const result = await part02(`./advents/${advent_seq}/input.txt`);

  //   expect(result).toBe(8570000);
  // });
});
