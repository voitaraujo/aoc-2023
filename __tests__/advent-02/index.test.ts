import { describe, expect, test } from "bun:test";

import { main as part01 } from "@/advents/advent-02/part-01";
import { main as part02 } from "@/advents/advent-02/part-02";

describe("advent-02 - example", () => {
  test("part-01", async () => {
    const result = await part01("./__tests__/advent-02/test-input-01.txt");

    expect(result).toBe(8);
  });

  test("part-02", async () => {
    const result = await part02("./__tests__/advent-02/test-input-02.txt");

    expect(result).toBe(2286);
  });
});

describe("advent-02 - real", () => {
  test("part-01", async () => {
    const result = await part01("./advents/advent-02/input.txt");

    expect(result).toBe(2169);
  });

  test("part-02", async () => {
    const result = await part02("./advents/advent-02/input.txt");

    expect(result).toBe(60948);
  });
});
