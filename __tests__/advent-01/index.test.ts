import { describe, expect, test } from "bun:test";

import { main as part01 } from "@/advents/advent-01/part-01";
import { main as part02 } from "@/advents/advent-01/part-02";

describe("advent-01 - example", () => {
  test("part-01", async () => {
    const result = await part01("./__tests__/advent-01/test-input-01.txt");

    expect(result).toBe("142");
  });

  test("part-02", async () => {
    const result = await part02("./__tests__/advent-01/test-input-02.txt");
    expect(result).toBe("281");
  });
});

describe("advent-01 - real", () => {
  test("part-01", async () => {
    const result = await part01("./advents/advent-01/input.txt");

    expect(result).toBe("55447");
  });

  test("part-02", async () => {
    const result = await part02("./advents/advent-01/input.txt");
    expect(result).toBe("54706");
  });
});

